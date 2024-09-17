/* eslint-disable no-unused-vars */
'use client';

import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';

import { useCompanyContext } from '../contexts/data/CompanyContext.jsx';

const formSchema = z.object({
  rfc: z
    .string({
      message: 'RFC is required.',
    })
    .min(13, {
      message: 'RFC must be at least 13 characters.',
    }),
  name: z
    .string({
      message: 'Company name is required.',
    })
    .min(1, {
      message: 'Company name must be at least 1 character.',
    })
    .max(50, {
      message: 'Company name must be at most 50 characters.',
    }),
  comercialSociety: z
    .string({
      message: 'Comercial society is required.',
    })
    .min(1, {
      message: 'Comercial society must be at least 1 character.',
    })
    .max(24, {
      message: 'Comercial society must be at most 24 characters.',
    }),
  taxRegime: z
    .string({
      message: 'Tax regime is required.',
    })
    .min(1, {
      message: 'Tax regime must be at least 1 character.',
    })
    .max(100, {
      message: 'Tax regime must be at most 100 characters.',
    }),
  street: z
    .string({
      message: 'Street is required.',
    })
    .min(1, {
      message: 'Street must be at least 1 character.',
    })
    .max(50, {
      message: 'Street must be at most 50 characters.',
    }),
  exteriorNumber: z
    .string({
      message: 'Exterior number is required.',
    })
    .min(1, {
      message: 'Exterior number must be at least 1 character.',
    })
    .max(10, {
      message: 'Exterior number must be at most 10 characters.',
    }),
  neighborhood: z
    .string({
      message: 'Neighborhood is required.',
    })
    .min(1, {
      message: 'Neighborhood must be at least 1 character.',
    })
    .max(50, {
      message: 'Neighborhood must be at most 50 characters.',
    }),
  city: z
    .string({
      message: 'City is required.',
    })
    .min(1, {
      message: 'City must be at least 1 character.',
    })
    .max(50, {
      message: 'City must be at most 50 characters.',
    }),
  state: z
    .string({
      message: 'State is required.',
    })
    .min(1, {
      message: 'State must be at least 1 character.',
    })
    .max(50, {
      message: 'State must be at most 50 characters.',
    }),
  country: z
    .string({
      message: 'Country is required.',
    })
    .min(1, {
      message: 'Country must be at least 1 character.',
    })
    .max(50, {
      message: 'Country must be at most 50 characters.',
    }),
  postalCode: z
    .string({
      message: 'Postal code is required.',
    })
    .min(1, {
      message: 'Postal code must be at least 1 character.',
    })
    .max(6, {
      message: 'Postal code must be at most 6 characters.',
    }),
});

function ProfileForm() {
  // eslint-disable-next-line no-unused-vars
  const {
    postCompany,
    getCompany,
    putCompany,
    errors: formErrors,
  } = useCompanyContext();

  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const params = useParams();

  const comercialSocieties = [
    { _id: '507f1f77bcf86cd799439011', title: 'Sociedad Anónima (S.A.)' },
    {
      _id: '507f1f77bcf86cd799439012',
      title: 'Sociedad de Responsabilidad Limitada (S. de R.L.)',
    },
    {
      _id: '507f1f77bcf86cd799439014',
      title:
        'Sociedad de Responsabilidad Limitada de Capital Variable (S. de R.L. de C.V.)',
    },
    {
      _id: '507f1f77bcf86cd799439015',
      title: 'Sociedad en Nombre Colectivo (S.N.C.)',
    },
    {
      _id: '507f1f77bcf86cd799439016',
      title: 'Sociedad en Comandita Simple (S. en C.S.)',
    },
    {
      _id: '507f1f77bcf86cd799439017',
      title: 'Sociedad en Comandita por Acciones (S. en C.P.A.)',
    },
  ];

  const taxRegimes = [
    {
      _id: '707f1f77bcf86cd799439010',
      title: 'Régimen General de Ley (RGL)',
    },
    {
      _id: '707f1f77bcf86cd799439011',
      title: 'Régimen de Pequeños Contribuyentes (REPECOS)',
    },
    {
      _id: '707f1f77bcf86cd799439012',
      title: 'Régimen de Incorporación Fiscal (RIF)',
    },
    {
      _id: '707f1f77bcf86cd799439013',
      title: 'Régimen de Actividad Empresarial',
    },
    {
      _id: '707f1f77bcf86cd799439014',
      title: 'Régimen de Enajenación o Adquisición de Bienes (REPECO)',
    },
    {
      _id: '707f1f77bcf86cd799439015',
      title: 'Régimen de Consolidación Fiscal',
    },
  ];

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rfc: '',
      name: '',
      comercialSociety: '',
      taxRegime: '',
      street: '',
    },
  });

  useEffect(() => {
    async function fillForm() {
      if (params.id) {
        const company = await getCompany(params.id);
        form.reset({
          rfc: company.rfc,
          name: company.name,
          comercialSociety: company.comercialSociety,
          taxRegime: company.taxRegime,
        });
      }
    }
    fillForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line no-unused-vars
  const onSubmit = async (values) => {
    let res;
    if (params.id) {
      res = await putCompany(params.id, values);
    } else {
      res = await postCompany(values);
    }

    if ([200, 201].find((status) => status === res.status)) {
      navigate('/tenderers');
    }
  };

  const values = form.getValues();

  return (
    <main className="pt-[20vh] pb-[10vh] flex justify-center items-center w-screen h-fit">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 w-[40vw] lg:w-[30vw] scrollbar-hide"
        >
          <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
            Supplier
          </h1>
          <FormDescription className="scroll-m-20 text-xl font-semibold tracking-tight text-gray-800 dark:text-white ">
            Submit the form to create a new supplier.
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
            name="rfc"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className={`text-lg font-semibold ${
                    form.formState.errors.rfc ? 'dark:text-red-400' : null
                  }`}
                >
                  RFC
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className={`text-lg font-semibold ${
                    form.formState.errors.name ? 'dark:text-red-400' : null
                  }`}
                >
                  Name
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
            name="comercialSociety"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className={`text-lg font-semibold ${
                    form.formState.errors.comercialSociety
                      ? 'dark:text-red-400'
                      : null
                  }`}
                >
                  Society
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup {...field}>
                        <SelectLabel>Society</SelectLabel>
                        {comercialSocieties.map((society, index) => (
                          <SelectItem key={index} value={society._id}>
                            {society.title}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="dark:text-red-400" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="taxRegime"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className={`text-lg font-semibold ${
                    form.formState.errors.taxRegime ? 'dark:text-red-400' : null
                  }`}
                >
                  Tax Regime
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup {...field}>
                        <SelectLabel>Tax Regime</SelectLabel>
                        {taxRegimes.map((regime, index) => (
                          <SelectItem key={index} value={regime._id}>
                            {regime.title}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="dark:text-red-400" />
              </FormItem>
            )}
          />
          <h1 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
            Address
          </h1>
          <div className="flex flex-col w-[45%] gap-5">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Add</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] h-full mt-[5vh] overflow-scroll">
                <DialogHeader>
                  <DialogTitle>Address</DialogTitle>
                  <DialogDescription>
                    Enter the address of the supplier.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex justify-between">
                  <FormField
                    control={form.control}
                    name="street"
                    render={({ field }) => (
                      <FormItem className="max-w-max">
                        <FormLabel
                          className={`text-lg font-semibold ${
                            form.formState.errors.street
                              ? 'dark:text-red-400'
                              : null
                          }`}
                        >
                          Street
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
                    name="exteriorNumber"
                    render={({ field }) => (
                      <FormItem className="w-[40%]">
                        <FormLabel
                          className={`text-lg font-semibold ${
                            form.formState.errors.exteriorNumber
                              ? 'dark:text-red-400'
                              : null
                          }`}
                        >
                          Exterior Number
                        </FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage className="dark:text-red-400" />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="neighborhood"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className={`text-lg font-semibold ${
                          form.formState.errors.neighborhood
                            ? 'dark:text-red-400'
                            : null
                        }`}
                      >
                        Neighborhood
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
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className={`text-lg font-semibold ${
                          form.formState.errors.city
                            ? 'dark:text-red-400'
                            : null
                        }`}
                      >
                        City
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
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className={`text-lg font-semibold ${
                          form.formState.errors.state
                            ? 'dark:text-red-400'
                            : null
                        }`}
                      >
                        State
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
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className={`text-lg font-semibold ${
                          form.formState.errors.country
                            ? 'dark:text-red-400'
                            : null
                        }`}
                      >
                        Country
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
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel
                        className={`text-lg font-semibold ${
                          form.formState.errors.postalCode
                            ? 'dark:text-red-400'
                            : null
                        }`}
                      >
                        Postal Code
                      </FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage className="dark:text-red-400" />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </main>
  );
}

export default ProfileForm;
