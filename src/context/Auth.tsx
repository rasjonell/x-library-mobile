import React, {
  useState,
  useContext,
  createContext,
  PropsWithChildren,
  useEffect,
} from 'react';
import * as Keychain from 'react-native-keychain';

export interface IUser {
  id: string;
  name: string;
  email: string;

  // Associations
  reviews?: Array<any>;
  booksRead?: Array<any>;
}
interface IAuthState {
  user: IUser | null;
  authenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

interface IAuthContext {
  authState: IAuthState;
  logout: () => void;
  setAuthState: React.Dispatch<React.SetStateAction<IAuthState>>;
  loading: boolean;
}

export const defaultAuthState: IAuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  authenticated: false,
};

export const AuthContext = createContext<IAuthContext>({
  loading: false,
  logout: () => {},
  setAuthState: () => {},
  authState: defaultAuthState,
});

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [authState, setAuthState] = useState<IAuthState>(defaultAuthState);

  useEffect(() => {
    const setExistingCredentials = async () => {
      const credentials = await Keychain.getGenericPassword();

      if (credentials) {
        const currentAuthState = JSON.parse(credentials.password);

        setAuthState(currentAuthState);
      }
    };

    setExistingCredentials();
  }, []);

  const logout = async () => {
    await Keychain.resetGenericPassword();

    setAuthState(defaultAuthState);
  };

  return (
    <AuthContext.Provider
      value={{
        logout,
        authState,
        setAuthState,
        loading: false,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
