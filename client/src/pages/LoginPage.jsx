'use client';

import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import { useAuthContext } from '../contexts/data/AuthContext.jsx';

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
});

function ProfileForm() {
  const { login, authenticated, errors: formErrors } = useAuthContext();

  const navigate = useNavigate();
  useEffect(() => {
    if (authenticated) navigate('/');
  }, [authenticated, navigate]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = (values) => login(values);

  return (
    <main className="pt-[10vh] flex justify-center items-center w-screen h-screen scrollbar-hide">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 w-[40vw] lg:w-[30vw] scrollbar-hide"
        >
          <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
            Sign in to your account
          </h1>
          <FormDescription className="scroll-m-20 text-xl font-semibold tracking-tight text-gray-800 dark:text-white ">
            Do not have an account?{' '}
            <Link className="font-extrabold text-blue-700 dark:text-blue-300">
              Sign up
            </Link>
          </FormDescription>
          {formErrors.map((error, index) => (
            <Alert
              key={index}
              variant="destructive"
              className="dark:border-red-600 border-2"
            >
              <AlertCircle style={{ color: '#F87171' }} className="h-4 w-4" />
              <AlertTitle className="text-lg font-semibold dark:text-red-400">
                Error
              </AlertTitle>
              <AlertDescription className="dark:text-red-400">
                {error}
              </AlertDescription>
            </Alert>
          ))}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className={`text-lg font-semibold ${
                    form.formState.errors.username ? 'dark:text-red-400' : null
                  }`}
                >
                  Username
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage className="dark:text-red-400" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className={`text-lg font-semibold ${
                    form.formState.errors.password ? 'dark:text-red-400' : null
                  }`}
                >
                  Password
                </FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage className="dark:text-red-400" />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </main>
  );
}

export default ProfileForm;
