import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext.jsx';
import { useEffect } from 'react';
import warning from '../assets/warning.svg';

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: 'onBlur' });

  const { login, authenticated, errors: loginErrors } = useAuthContext();

  const navigate = useNavigate();
  useEffect(() => {
    if (authenticated) navigate('/hirings');
  }, [authenticated, navigate]);

  const onSubmit = handleSubmit((values) => login(values));

  return (
    <main className="flex items-center justify-center">
      <section className="flex flex-col justify-center items-start gap-4 p-8 mt-8 w-[70vw] sm:w-[60vw] md:w-[50vw] lg:w-[35vw] shadow-xl">
        <p className="text-lg font-bold">
          Don&#39;t have an account?{' '}
          <Link to="/signup" className="text-blue-700 hover:text-blue-0033FF">
            Sign up
          </Link>
        </p>

        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-extrabold text-center text-black">
          Log in to your account
        </h1>

        {(Object.keys(errors).length > 0 || loginErrors?.length > 0) && (
          <section className="flex items-center h-fit w-full p-4 bg-red-200 rounded-sm border-red-300 border-[1.5px]">
            <img src={warning} alt="warning" className="h-7" />
            {loginErrors.map((err, i) => (
              <p className="ml-3 text-red-660000 break-all" key={i}>
                {err}
              </p>
            ))}
            {errors.username && (
              <p className="ml-3 text-red-660000 break-all">
                {errors.username.message}
              </p>
            )}
            {errors.password && (
              <p className="ml-3 text-red-660000 break-all">
                {errors.password.message}
              </p>
            )}
          </section>
        )}

        <form onSubmit={onSubmit} className="flex flex-col w-full gap-2">
          <label htmlFor="username" className="font-semibold text-gray-333333">
            Username
          </label>
          <input
            type="text"
            id="username"
            {...register('username', {
              required: {
                value: true,
                message: 'Username is required.',
              },
              minLength: {
                value: 2,
                message: 'Username must be at least 2 characters long.',
              },
              maxLength: {
                value: 15,
                message: 'Username cannot be more than 15 characters long.',
              },
            })}
            className="w-full p-2 border-2 rounded-sm border-gray-666666"
          />
          <label htmlFor="password" className="font-semibold text-gray-333333">
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register('password', {
              required: {
                value: true,
                message: 'Password is required.',
              },
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters long.',
              },
              maxLength: {
                value: 30,
                message: 'Password cannot be more than 30 characters long.',
              },
            })}
            className="w-full p-2 border-2 rounded-sm border-gray-666666"
          />
          <div className="mt-2">
            <button
              type="submit"
              disabled={!isValid}
              className={`p-2 w-[20vw] sm:p-2 sm:w-[16vw] md:p-3 md:w-[12vw] lg:p-3 lg:w-[8vw] rounded-md font-bold ${
                isValid
                  ? 'bg-gray-333333 hover:bg-gray-666666 text-white'
                  : 'bg-gray-cccccc text-gray-666666 cursor-not-allowed'
              }`}
            >
              Sign in
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;
