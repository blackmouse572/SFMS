import LoginForm from '@components/login-form/LoginForm';
import useGoogleCallback from '@hooks/useGoogleCallback';

function LoginPage() {
  useGoogleCallback();
  return <LoginForm />;
}

export default LoginPage;
