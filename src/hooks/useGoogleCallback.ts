import { useStateLogin } from '@lib/auth';
import { User } from '@lib/types';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

function useGoogleCallback() {
  const [search] = useSearchParams();
  const token = search.get('token');
  const user = search.get('user');
  const login = useStateLogin();
  const go = useNavigate();

  useEffect(() => {
    if (token && token.startsWith('ey') && user) {
      const data: User = JSON.parse(user);
      console.log('Login to user', data);
      login({
        access_token: token,
        user: data,
      });
      toast.success(`Chào mừng ${data.name}`);
      go('/');
    }
  }, [go, login, token, user]);
}

export default useGoogleCallback;
