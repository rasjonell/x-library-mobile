interface IFormState {
  email: string;
  password: string;
  name?: string;
}

export interface IFormErrorState {
  email: null | string;
  password: null | string;
  name?: null | string;
}

export function isEmailValid(email: IFormState['email']): boolean {
  const emailRegexp = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );

  return emailRegexp.test(email);
}

export function isPasswordValid(password: IFormState['password']): boolean {
  if (password.length < 6) {
    return false;
  }

  return true;
}

export function isNameValid(name: Required<IFormState>['name']): boolean {
  if (name.length < 2) {
    return false;
  }

  return true;
}

export default function formValidator({ email, password, name }: IFormState) {
  const withName = typeof name === 'string';

  return {
    email: isEmailValid(email) ? null : 'Invalid Email',
    name: withName
      ? isNameValid(name)
        ? null
        : 'Must be at least 2 characters long'
      : undefined,
    password: isPasswordValid(password)
      ? null
      : 'Must be at least 6 characters long',
  };
}
