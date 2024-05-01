import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext.jsx';
import { useEffect } from 'react';

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login, authenticated, errors: loginErrors } = useAuthContext();

  const navigate = useNavigate();
  useEffect(() => {
    if (authenticated) navigate('/home');
  }, [authenticated, navigate]);

  const onSubmit = handleSubmit((values) => login(values));

  return (
    <main className="flex items-center justify-center">
      <section className="flex flex-col justify-center items-center gap-4 p-8 mt-8 w-[80vw] sm:w-[80vw] md:w-[60vw] lg:w-[50vw] shadow-lg">
        {loginErrors.map((error, i) => (
          <div
            className="bg-zinc-600 text-white p-2 my-3 rounded-md text-justify px-4"
            key={i}
          >
            {error}
          </div>
        ))}

        <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-4xl font-black text-center text-gray-hover">
          Welcome!
        </h1>

        <form onSubmit={onSubmit} className="flex flex-col w-full gap-3">
          <input
            type="text"
            {...register('username', { required: true })}
            className="w-full p-2 border-2 rounded-md border-gray"
            placeholder="Username"
          />
          {errors.username && (
            <p className="text-red-300 my-1">Username is required</p>
          )}
          <input
            type="password"
            {...register('password', { required: true })}
            className="w-full p-2 border-2 rounded-md border-gray"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-300 my-1">Password is required</p>
          )}
          <button
            type="submit"
            className="p-2 sm:p-2 md:p-3 lg:p-3 rounded-md font-bold bg-gray-hover hover:bg-gray text-white"
          >
            Sign in
          </button>
        </form>

        <p className="text-xl font-bold">
          Don&#39;t have an account?{' '}
          <Link
            to="/signup"
            className="font-black text-blue hover:text-blue-hover"
          >
            Sign up
          </Link>
        </p>
      </section>
    </main>
  );
}

export default LoginPage;
