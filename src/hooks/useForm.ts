import { useState } from 'react';

import isEmailValid from '../utils/isEmailValid';
import { capitalize, XLibError } from '../utils/errors';

type FieldOptions = {
  type: 'email' | 'text';
  min?: number;
  max?: number;
};

type FormDescription = { [key: string]: FieldOptions };
type FullFormDescription<T extends FormDescription> = {
  [key in keyof T]: Required<FieldOptions>;
};

type FormState<T> = {
  [key in keyof T]: string;
};

type FormErrorState<T> = {
  [key in keyof T]: string | null | undefined;
};

type FormChangeHandler<T> = (name: keyof T) => (value: string) => void;

type FormValue<T extends FormDescription> = {
  state: FormState<T>;
  handleSubmit: () => void;
  errors: FormErrorState<FormState<T>>;
  handleFormChange: FormChangeHandler<FormState<T>>;
};

function validate<T extends FormDescription>(
  formOptions: FullFormDescription<FormDescription>,
  state: FormState<typeof formOptions>,
) {
  let hasError = false;

  const errors = Object.entries(formOptions).reduce(
    (prev, [field, options]) => {
      const isTypeValid =
        options.type === 'email' ? isEmailValid(state[field]) : true;

      const isLengthValid =
        state[field].length > options.min && state[field].length < options.max;

      if (!hasError) {
        hasError = !(isTypeValid && isLengthValid);
      }

      const errorMessage = isTypeValid
        ? isLengthValid
          ? null
          : buildLengthErrorMessage(field, options)
        : `Invalid ${capitalize(field)}`;

      return { ...prev, [field]: errorMessage };
    },
    {},
  );

  return [hasError, errors] as [
    boolean,
    FormErrorState<FormState<FullFormDescription<T>>>,
  ];
}

export default function useForm<T extends FormDescription>(
  formOptions: T,
  action: (state: FormState<T>) => Promise<XLibError | null> | void,
): FormValue<T> {
  const fullFormOptions = buildFullFormOptions(formOptions);

  const defaultState = buildDefaultState(fullFormOptions);
  const defaultErrors = buildDefaultErrors(defaultState);

  const [state, setState] = useState(defaultState);
  const [errors, setErrors] = useState(defaultErrors);

  const handleFormChange = (name: keyof typeof state) => (value: string) =>
    setState({ ...state, [name]: value });

  const handleSubmit = async () => {
    const [hasError, formErrors] = validate<T>(fullFormOptions, state);

    if (hasError) {
      setErrors(formErrors);
    } else {
      const requestError = await action(state);

      if (requestError?.changesetErrors) {
        return setErrors({
          ...defaultErrors,
          ...requestError?.changesetErrors,
        });
      }

      setErrors(defaultErrors);
    }
  };

  return {
    state,
    errors,
    handleSubmit,
    handleFormChange,
  };
}

function buildFullFormOptions<T extends FormDescription>(
  formOptions: T,
): FullFormDescription<T> {
  const fullFormOptions = Object.entries(formOptions).reduce(
    (prev, [field, options]) => ({
      ...prev,
      [field]: {
        ...options,
        min: options.min || 0,
        max: options.max || Infinity,
      },
    }),
    {},
  );

  return fullFormOptions as FullFormDescription<T>;
}

function buildDefaultState<T extends FullFormDescription<FormDescription>>(
  formOptions: T,
): FormState<T> {
  const defaultState = Object.keys(formOptions).reduce(
    (prev, key) => ({ ...prev, [key]: '' }),
    {},
  );

  return defaultState as FormState<T>;
}

function buildDefaultErrors<T>(defaultState: T): FormErrorState<T> {
  const defaultErrors = Object.keys(defaultState).reduce(
    (prev, key) => ({ ...prev, [key]: null }),
    {},
  );

  return defaultErrors as FormErrorState<T>;
}

function buildLengthErrorMessage(
  field: string,
  options: Required<FieldOptions>,
): string {
  if (options.min === 0 && options.max === Infinity) {
    return `${capitalize(field)} is required`;
  }

  if (options.min > 0 && options.max === Infinity) {
    return `${capitalize(field)} must be at least ${
      options.min
    } characters long`;
  }

  return `${capitalize(field)} must be between ${options.min} and ${
    options.max
  } characters long`;
}
