interface IFormState {
  email: string;
  password: string;
  name?: string;
  bio?: string;
}

export interface IFormErrorState {
  email: null | string;
  password: null | string;
  name?: null | string;
  bio?: null | string;
}

export function isEmailValid(email: IFormState['email']): boolean {
  const emailRegexp = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );

  return emailRegexp.test(email);
}

export function isPasswordValid(password: IFormState['password']): boolean {
  return password.length >= 6;
}

export function isNameValid(name: Required<IFormState>['name']): boolean {
  return name.length > 2;
}

export function isBioValid(bio: Required<IFormState>['bio']): boolean {
  const trim = bio.trim();
  return trim.length >= 3 && trim.length <= 150;
}

export default function formValidator({
  bio,
  name,
  email,
  password,
}: IFormState) {
  const withBio = typeof bio === 'string';
  const withName = typeof name === 'string';

  return {
    email: isEmailValid(email) ? null : 'Invalid Email',
    name: withName
      ? isNameValid(name)
        ? null
        : 'Must be at least 2 characters long'
      : undefined,
    bio: withBio
      ? isBioValid(bio)
        ? null
        : 'Your bio must be between 3 and 150 characters long'
      : undefined,
    password: isPasswordValid(password)
      ? null
      : 'Must be at least 6 characters long',
  };
}
