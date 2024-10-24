import { LoginRes } from '@components/login-form/useLogin';
import { User } from '@lib/types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface IAuthState {
  user?: User;
  token?: string;
  isAuthenticated: boolean;
}

export interface IAuthAction {
  login: (user: LoginRes['data']) => void;
  logout: () => void;
}

export const useAuth = create(
  persist<IAuthState & IAuthAction>(
    (set) => ({
      user: undefined,
      isAuthenticated: false,
      token: undefined,
      login: ({ user, access_token }: LoginRes['data']) => {
        set({ user, isAuthenticated: true, token: access_token });
      },
      logout: () => {
        set({ user: undefined, isAuthenticated: false, token: undefined });
      },
    }),
    {
      name: 'user-s',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const useIsAuthenticated = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated;
};

export const useUser = () => {
  const { user } = useAuth();
  return user;
};

export const useStateLogin = () => {
  const { login } = useAuth();
  return login;
};
