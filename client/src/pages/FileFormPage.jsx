/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { set, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
dayjs.extend(utc);

import { useFileContext } from '../contexts/FileContext.jsx';
import { useAssessmentMetricContext } from '../contexts/AssessmentMetricContext.jsx';
import { useHiringContext } from '../contexts/HiringContext.jsx';
import { useHiringProcessCategoryContext } from '../contexts/HiringProcessCategoryContext.jsx';
import { useLawContext } from '../contexts/LawContext.jsx';
import { useAuthContext } from '../contexts/AuthContext.jsx';
import warning from '../assets/warning.svg';

function FileFormPage() {
  const { assessmentMetrics, getAssessmentMetrics } =
    useAssessmentMetricContext();
  const { hirings, getHirings } = useHiringContext();
  const { hiringProcessCategories, getHiringProcessCategories } =
    useHiringProcessCategoryContext();
  const { laws, getLaws } = useLawContext();
  const { user } = useAuthContext();

  const { postFile, putFile, getFile, errors: formErrors } = useFileContext();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isAdvancePaymentChecked, setIsAdvancePaymentChecked] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    async function fetch() {
      await getAssessmentMetrics();
      await getHirings();
      await getHiringProcessCategories();
      await getLaws();

      if (!params.id) {
        reset({
          id: permutate(),
          budgetaryYear: currentYear,
          assessmentMetric: assessmentMetrics[0]?._id,
          hiring: hirings[0]?._id,
          law: laws[0]?._id,
        });
      }
    }
    fetch();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: 'onBlur',
  });

  const permutate = () => {
    const digits = [0, 1, 2, 3, 4, 5];

    // Shuffle the array using the Fisher-Yates algorithm
    for (let i = digits.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [digits[i], digits[j]] = [digits[j], digits[i]];
    }

    return digits.join('');
  };

  useEffect(() => {
    if (Object.keys(errors).length > 0 || formErrors?.length > 0) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  }, [errors, formErrors]);

  useEffect(() => {
    async function loadFile() {
      if (params.id) {
        const file = await getFile(params.id);
        reset({
          id: file.id,
          reference: file.reference,
          budgetaryYear: file.budgetaryYear,
          description: file.description,
          hiring: file.hiring._id,
          law: file.law._id,
          assessmentMetric: file.assessmentMetric._id,
          advancePayment: file.advancePayment,
          percentage: file.percentage,
          addendum: file.addendum,
          hiringProcessCategory: file.hiringProcessCategory._id,
          internationalPolicies: file.internationalPolicies.map(
            (policy) => policy._id
          ),
        });
        setIsAdvancePaymentChecked(file.advancePayment);
        setSelectedCategory(file.hiringProcessCategory._id);
      }
    }
    loadFile();
  }, []);

  const onSubmit = handleSubmit((values) => {
    const file = {
      ...values,
      operator: user._id,
    };

    file.budgetaryYear = file.budgetaryYear.toString();
    if (file.percentage === undefined) delete file.percentage;

    if (params.id) {
      putFile(params.id, file);
    } else {
      postFile(file);
    }
    navigate('/hirings');
  });

  return (
    <main className="flex flex-col gap-3 justify-start w-fit m-7">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-extrabold text-black">
        File
      </h1>

      {(Object.keys(errors).length > 0 || formErrors?.length > 0) && (
        <section className="flex items-center h-fit w-full p-4 bg-red-200 rounded-lg border-red-300 border-[1.5px]">
          <img src={warning} alt="warning" className="h-7" />
          <div className="flex flex-col gap-2">
            {formErrors.map((err, i) => (
              <p className="ml-3 text-red-660000 break-all" key={i}>
                {err}
              </p>
            ))}
            {errors.reference && (
              <p className="ml-3 text-red-660000 break-all">
                {errors.reference.message}
              </p>
            )}
            {errors.budgetaryYear && (
              <p className="ml-3 text-red-660000 break-all">
                {errors.budgetaryYear.message}
              </p>
            )}
            {errors.description && (
              <p className="ml-3 text-red-660000 break-all">
                {errors.description.message}
              </p>
            )}
            {errors.addendum && (
              <p className="ml-3 text-red-660000 break-all">
                {errors.addendum.message}
              </p>
            )}
            {errors.hiring && (
              <p className="ml-3 text-red-660000 break-all">
                {errors.hiring.message}
              </p>
            )}
            {errors.law && (
              <p className="ml-3 text-red-660000 break-all">
                {errors.law.message}
              </p>
            )}
            {errors.hiringProcessCategory && (
              <p className="ml-3 text-red-660000 break-all">
                {errors.hiringProcessCategory.message}
              </p>
            )}
            {errors.assesmentMetric && (
              <p className="ml-3 text-red-660000 break-all">
                {errors.assesmentMetric.message}
              </p>
            )}
            {errors.percentage && (
              <p className="ml-3 text-red-660000 break-all">
                {errors.percentage.message}
              </p>
            )}
            {errors.internationalPolicies && (
              <p className="ml-3 text-red-660000 break-all">
                {errors.internationalPolicies.message}
              </p>
            )}
          </div>
        </section>
      )}

      <section className="flex flex-col justify-center items-start p-4 w-[75vw] sm:w-[60vw] md:w-[50vw] lg:w-fit shadow-2xl">
        <form onSubmit={onSubmit} className="flex">
          <section className="flex flex-col items-start gap-3 w-fit">
            <label htmlFor="id" className="font-semibold text-gray-333333">
              ID
            </label>
            <input
              type="text"
              id="id"
              {...register('id', { readOnly: true })}
              className="w-[25vw] sm:w-[22vw] md:w-[18vw] lg:w-[16vw] p-2 border-2 rounded-sm border-gray-666666"
            />
            <label
              htmlFor="reference"
              className="font-semibold text-gray-333333"
            >
              Reference
            </label>
            <input
              type="text"
              id="reference"
              {...register('reference', {
                required: {
                  value: true,
                  message: 'Reference is required.',
                },
                minLength: {
                  value: 16,
                  message: 'Reference must be at least 16 characters long.',
                },
                maxLength: {
                  value: 20,
                  message: 'Reference cannot be more than 20 characters long.',
                },
              })}
              className="w-[45vw] sm:w-[22vw] md:w-[18vw] lg:w-[16vw] p-2 border-2 rounded-sm border-gray-666666"
            />
            <label
              htmlFor="budgetaryYear"
              className="font-semibold text-gray-333333"
            >
              Budgetary Year
            </label>
            <input
              type="number"
              id="budgetaryYear"
              {...register('budgetaryYear', {
                required: {
                  value: true,
                  message: 'Budgetary year is required.',
                },
                min: {
                  value: 1930,
                  message: 'Budgetary year must be at least 1930.',
                },
                max: {
                  value: currentYear,
                  message: `Budgetary year cannot be more than ${currentYear}.`,
                },
              })}
              className="w-[18vw] sm:w-[16vw] md:w-[14vw] lg:w-[12vw] p-2 border-2 rounded-sm border-gray-666666"
            />
            <label
              htmlFor="description"
              className="font-semibold text-gray-333333"
            >
              Description
            </label>
            <textarea
              type="text"
              id="description"
              {...register('description', {
                required: {
                  value: true,
                  message: 'Description is required.',
                },
                minLength: {
                  value: 1,
                  message: 'Description must be at least 1 characters long.',
                },
                maxLength: {
                  value: 255,
                  message:
                    'Description cannot be more than 255 characters long.',
                },
              })}
              className="h-[50vh] w-[55vw] sm:w-[50vw] md:w-[40vw] lg:w-[35vw] p-2 border-2 rounded-sm resize-y border-gray-666666"
            />
            <label htmlFor="hiring" className="font-semibold text-gray-333333">
              Hiring
            </label>
            <select
              id="hiring"
              {...register('hiring')}
              className="w-[43vw] sm:w-[30vw] md:w-[25vw] lg:w-[20vw] p-2 border-2 rounded-sm border-gray-666666"
            >
              {hirings.map((hiring, index) => (
                <option key={index} value={hiring._id}>
                  {hiring.title}
                </option>
              ))}
            </select>
            <label htmlFor="law" className="font-semibold text-gray-333333">
              Law
            </label>
            <select
              id="law"
              {...register('law')}
              className="w-[33vw] sm:w-[20vw] md:w-[15vw] lg:w-[15vw] p-2 border-2 rounded-sm border-gray-666666"
            >
              {laws.map((law, index) => (
                <option key={index} value={law._id}>
                  {law.title}
                </option>
              ))}
            </select>
            <label
              htmlFor="assessmentMetric"
              className="font-semibold text-gray-333333"
            >
              Assessment
            </label>
            <select
              id="assessmentMetric"
              {...register('assessmentMetric')}
              className="w-[33vw] sm:w-[25vw] md:w-[20vw] lg:w-[15vw] p-2 border-2 rounded-sm border-gray-666666"
            >
              {assessmentMetrics.map((assesmentMetric, index) => (
                <option key={index} value={assesmentMetric._id}>
                  {assesmentMetric.title}
                </option>
              ))}
            </select>
            <label
              htmlFor="advancePayment"
              className="font-semibold text-gray-333333"
            >
              Payment
            </label>
            <p id="advancePaymentInstruction" className="break-all">
              Please check the box if you want to set the percentage for the
              advance payment.
            </p>
            <input
              type="checkbox"
              id="advancePayment"
              {...register('advancePayment')}
              value={isAdvancePaymentChecked}
              onChange={() =>
                setIsAdvancePaymentChecked(!isAdvancePaymentChecked)
              }
            />
            <label
              htmlFor="percentage"
              className="font-semibold text-gray-333333"
            >
              Percentage
            </label>
            <input
              type="number"
              id="percentage"
              {...register(
                'percentage',
                isAdvancePaymentChecked
                  ? {
                      min: {
                        value: 1,
                        message: 'Percentage must be at least 1.',
                      },
                      max: {
                        value: 50,
                        message: 'Percentage cannot be more than 50.',
                      },
                    }
                  : {}
              )}
              disabled={!isAdvancePaymentChecked}
              className={`w-[15vw] sm:w-[15vw] md:w-[10vw] lg:w-[10vw] p-2 border-2 rounded-sm ${
                isAdvancePaymentChecked
                  ? 'border-gray-666666'
                  : 'border-gray-cccccc text-gray-cccccc cursor-not-allowed'
              }`}
            />
            <label
              htmlFor="hiringProcessCategory"
              className="font-semibold text-gray-333333"
            >
              Category
            </label>
            <p id="hiringProcessCategoryInstruction" className="break-all">
              Please select a hiring process category to display the
              international policies available.
            </p>
            {hiringProcessCategories.map((category, index) => (
              <div key={index}>
                <input
                  type="radio"
                  id={category._id}
                  name="hiringProcessCategory"
                  {...register('hiringProcessCategory', {
                    required: {
                      value: true,
                      message: 'Hiring process category is required.',
                    },
                  })}
                  value={category._id}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="mr-2"
                />
                <label
                  htmlFor={category._id}
                >{`${category.number} ${category.title}`}</label>
              </div>
            ))}
            <article className="flex flex-col gap-2 items-start">
              <label
                htmlFor="internationalPolicies"
                className="font-semibold text-gray-333333"
              >
                Policy
              </label>
              <div className="h-[16vh] w-[38vw] rounded-lg">
                {selectedCategory &&
                  hiringProcessCategories
                    .find((category) => category._id === selectedCategory)
                    .internationalPolicies.map((policy, index) => (
                      <div key={index}>
                        <input
                          type="checkbox"
                          id={policy._id}
                          name="internationalPolicies"
                          {...register('internationalPolicies', {
                            required: {
                              value: true,
                              message: 'International policy is required.',
                            },
                          })}
                          value={policy._id || ''}
                          className="mr-2"
                        />
                        <label htmlFor={policy._id}>{policy.title}</label>
                      </div>
                    ))}
              </div>
            </article>
            <label
              htmlFor="addendum"
              className="font-semibold text-gray-333333"
            >
              Addendum
            </label>
            <textarea
              type="text"
              id="addendum"
              {...register('addendum', {
                minLength: {
                  value: 1,
                  message: 'Addendum must be at least 1 characters long.',
                },
                maxLength: {
                  value: 255,
                  message: 'Addendum cannot be more than 255 characters long.',
                },
              })}
              className="h-[50vh] w-[55vw] sm:w-[50vw] md:w-[40vw] lg:w-[35vw] p-2 border-2 rounded-sm resize-y border-gray-666666"
            />
            <div className="mt-3">
              <button
                type="submit"
                disabled={!isValid}
                className={`p-2 w-[18vw] sm:p-2 sm:w-[16vw] md:p-3 md:w-[12vw] lg:p-3 lg:w-[8vw] rounded-md font-bold ${
                  isValid
                    ? 'bg-gray-333333 hover:bg-gray-666666 text-white'
                    : 'bg-gray-cccccc text-gray-666666 cursor-not-allowed'
                }`}
              >
                Add
              </button>
            </div>
          </section>
        </form>
      </section>
    </main>
  );
}

export default FileFormPage;
