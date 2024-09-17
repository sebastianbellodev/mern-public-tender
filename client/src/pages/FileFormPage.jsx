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
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';

import { useFileContext } from '../contexts/data/FileContext.jsx';
import { useHiringContext } from '../contexts/data/HiringContext.jsx';
import { useLawContext } from '../contexts/data/LawContext.jsx';
import { useAssessmentMetricContext } from '../contexts/data/AssessmentMetricContext.jsx';
import { useHiringProcessCategoryContext } from '../contexts/data/HiringProcessCategoryContext.jsx';
import { useAuthContext } from '../contexts/data/AuthContext.jsx';

const formSchema = z
  .object({
    reference: z
      .string({
        message: 'Reference is required.',
      })
      .min(16, {
        message: 'Reference must be at least 16 characters.',
      }),
    description: z
      .string({
        message: 'Description is required.',
      })
      .min(10, {
        message: 'Description must be at least 10 characters.',
      })
      .max(255, {
        message: 'Description must be at most 255 characters.',
      }),
    hiring: z.string().min(1, { message: 'Hiring is required.' }),
    law: z.string().min(1, { message: 'Law is required.' }),
    assessmentMetric: z
      .string()
      .min(1, { message: 'Assessment metric is required.' }),
    advancePayment: z.boolean().optional(),
    percentage: z.string().optional(),
    hiringProcessCategory: z
      .string()
      .min(1, { message: 'Hiring process category is required.' }),
    internationalPolicies: z
      .array(z.string())
      .nonempty('International policies are required.'),
    addendum: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.advancePayment && !data.percentage) {
        return false;
      }
      return true;
    },
    {
      message: 'Percentage is required when advance payment is checked.',
      path: ['percentage'],
    }
  )
  .refine(
    (data) => {
      if (data.advancePayment) {
        if (Number(data.percentage) < 1 || Number(data.percentage) > 50) {
          return false;
        }
      }
      return true;
    },
    {
      message: 'Percentage must be between 1 and 50.',
      path: ['percentage'],
    }
  )
  .refine(
    (data) => {
      if (data.addendum.length <= 0) {
        return true;
      } else {
        if (data.addendum.length < 10) {
          return false;
        } else if (data.addendum.length > 255) {
          return false;
        }
        return true;
      }
    },
    {
      message: 'Addendum must be between 10 and 255 characters.',
      path: ['addendum'],
    }
  );

function ProfileForm() {
  // eslint-disable-next-line no-unused-vars
  const { postFile, getFile, putFile, errors: formErrors } = useFileContext();
  const { hirings, getHirings } = useHiringContext();
  const { laws, getLaws } = useLawContext();
  const { assessmentMetrics, getAssessmentMetrics } =
    useAssessmentMetricContext();
  const { hiringProcessCategories, getHiringProcessCategories } =
    useHiringProcessCategoryContext();
  const { user } = useAuthContext();

  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const params = useParams();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reference: '',
      description: '',
      hiring: '',
      law: '',
      assessmentMetric: '',
      advancePayment: false,
      percentage: '',
      addendum: '',
      hiringProcessCategory: '',
      internationalPolicies: [],
    },
  });

  useEffect(() => {
    getHirings();
    getLaws();
    getAssessmentMetrics();
    getHiringProcessCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function fillForm() {
      if (params.id) {
        const file = await getFile(params.id);
        form.reset({
          reference: file.reference,
          description: file.description,
          hiring: file.hiring._id,
          law: file.law._id,
          assessmentMetric: file.assessmentMetric._id,
          advancePayment: file.advancePayment,
          percentage: file.percentage || '',
          addendum: file.addendum || '',
          hiringProcessCategory: file.hiringProcessCategory._id,
          internationalPolicies: file.internationalPolicies.map(
            (policy) => policy._id
          ),
        });
      }
    }
    fillForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const advancePaymentValue = form.watch('advancePayment');
  useEffect(() => {
    if (!advancePaymentValue) {
      form.clearErrors('percentage');
    }
  });

  const selectedHiringProcessCategory = form.watch('hiringProcessCategory');

  const selectedCategory = hiringProcessCategories.find(
    (category) => category._id === selectedHiringProcessCategory
  );

  const filteredInternationalPolicies = selectedCategory
    ? selectedCategory.internationalPolicies
    : [];

  useEffect(() => {
    form.setValue('internationalPolicies', []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedHiringProcessCategory, form.setValue]);

  // eslint-disable-next-line no-unused-vars
  const onSubmit = async (values) => {
    const budgetaryYear = new Date().getFullYear().toString();
    let file = {
      ...values,
      operator: user._id,
      budgetaryYear,
    };
    if (!file.advancePayment) {
      delete file.percentage;
    }
    if (file.addendum.length === 0) {
      delete file.addendum;
    }

    let res;
    if (params.id) {
      res = await putFile(params.id, file);
    } else {
      res = await postFile(file);
    }

    if ([200, 201].find((status) => status === res.status)) {
      navigate('/hirings');
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
            File
          </h1>
          <FormDescription className="scroll-m-20 text-xl font-semibold tracking-tight text-gray-800 dark:text-white ">
            Submit the details of the file you want to upload
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
            name="reference"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className={`text-lg font-semibold ${
                    form.formState.errors.reference ? 'dark:text-red-400' : null
                  }`}
                >
                  Reference
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className={`text-lg font-semibold ${
                    form.formState.errors.description
                      ? 'dark:text-red-400'
                      : null
                  }`}
                >
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage className="dark:text-red-400" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hiring"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className={`text-lg font-semibold ${
                    form.formState.errors.hiring ? 'dark:text-red-400' : null
                  }`}
                >
                  Hiring
                </FormLabel>
                <FormControl>
                  <Select
                    value={values.hiring || ''}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup {...field}>
                        <SelectLabel>Hiring</SelectLabel>
                        {hirings.map((hiring, index) => (
                          <SelectItem key={index} value={hiring._id}>
                            {hiring.title}
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
            name="law"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className={`text-lg font-semibold ${
                    form.formState.errors.law ? 'dark:text-red-400' : null
                  }`}
                >
                  Law
                </FormLabel>
                <FormControl>
                  <Select
                    value={values.law || ''}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup {...field}>
                        <SelectLabel>Law</SelectLabel>
                        {laws.map((law, index) => (
                          <SelectItem key={index} value={law._id}>
                            {law.title}
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
            name="assessmentMetric"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className={`text-lg font-semibold ${
                    form.formState.errors.assessmentMetric
                      ? 'dark:text-red-400'
                      : null
                  }`}
                >
                  Assessment
                </FormLabel>
                <FormControl>
                  <Select
                    value={values.assessmentMetric || ''}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent {...field}>
                      <SelectGroup>
                        <SelectLabel>Metric</SelectLabel>
                        {assessmentMetrics.map((assessment, index) => (
                          <SelectItem key={index} value={assessment._id}>
                            {assessment.title}
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
            name="advancePayment"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1">
                <FormLabel
                  className={`text-lg font-semibold ${
                    form.formState.errors.advancePayment
                      ? 'dark:text-red-400'
                      : null
                  }`}
                >
                  Payment
                </FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>
                  Check this box if there is an advance payment.
                </FormDescription>
                <FormMessage className="dark:text-red-400" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="percentage"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className={`text-lg font-semibold ${
                    form.formState.errors.percentage
                      ? 'dark:text-red-400'
                      : null
                  }`}
                >
                  Percentage
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    disabled={!advancePaymentValue}
                  />
                </FormControl>
                <FormMessage className="dark:text-red-400" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hiringProcessCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className={`text-lg font-semibold ${
                    form.formState.errors.hiringProcessCategory
                      ? 'dark:text-red-400'
                      : null
                  }`}
                >
                  Hiring process category
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    value={values.hiringProcessCategory || ''}
                    onValueChange={field.onChange}
                  >
                    {hiringProcessCategories.map((category, index) => (
                      <div key={index} className="flex gap-3">
                        <RadioGroupItem
                          id={category._id}
                          value={category._id}
                        />
                        <Label
                          htmlFor={category._id}
                        >{`${category.number} ${category.title}`}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage className="dark:text-red-400" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="internationalPolicies"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel
                    className={`text-lg font-semibold ${
                      form.formState.errors.internationalPolicies
                        ? 'dark:text-red-400'
                        : null
                    }`}
                  >
                    International policies
                  </FormLabel>
                  <FormDescription>
                    Select the international policies that apply to this file.
                  </FormDescription>
                </div>
                {filteredInternationalPolicies.map((policy) => (
                  <FormField
                    key={policy._id}
                    control={form.control}
                    name="internationalPolicies"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={policy._id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(policy._id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, policy._id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== policy._id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <Label>{policy.title}</Label>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage className="dark:text-red-400" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="addendum"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className={`text-lg font-semibold ${
                    form.formState.errors.addendum ? 'dark:text-red-400' : null
                  }`}
                >
                  Addendum
                </FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormDescription>
                  Add any additional information about the file if necessary.
                </FormDescription>
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
