import React, {
  useState,
  useContext,
  createContext,
  PropsWithChildren,
} from 'react';
import * as Keychain from 'react-native-keychain';

interface IAuthState {
  accessToken: string | null;
  refreshToken: string | null;
  authenticated: boolean;
}

interface IAuthContext {
  authState: IAuthState;
  logout: () => void;
  setAuthState: React.Dispatch<React.SetStateAction<IAuthState>>;
}

const defaultAuthState: IAuthState = {
  accessToken: null,
  refreshToken: null,
  authenticated: true,
};

export const AuthContext = createContext<IAuthContext>({
  authState: defaultAuthState,
  logout: () => {},
  setAuthState: () => {},
});

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [authState, setAuthState] = useState<IAuthState>(defaultAuthState);

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
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
