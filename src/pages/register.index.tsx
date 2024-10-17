import RegisterForm from '@components/register-form/RegisterForm';
import { useIsAuthenticated } from '@lib/auth';
import { Navigate } from 'react-router-dom';

function RegisterPage() {
  const isAuthed = useIsAuthenticated();
  if (isAuthed) {
    return <Navigate to="/user" />;
  }
  return (
    <div className="flex relative">
      <img src="./images/school_1.jpg" width={6720} height={4480} className="max-w-5xl h-screen flex-1 object-cover" />
      <section className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:relative md:translate-x-0 md:translate-y-0 md:top-0 md:left-0 flex items-center justify-center w-full">
        <RegisterForm />
      </section>
    </div>
  );
}

export default RegisterPage;
