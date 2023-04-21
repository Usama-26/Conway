import {FormProvider, RHFTextField} from '@/components/HookForm';
import {yupResolver} from '@hookform/resolvers/yup';
import axios from 'axios';
import * as Yup from 'yup';
import React, {Suspense, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {TCustomForm, TFormField, TView} from '_types/types';
import {FormInputGroup} from '@/components/Form';
import Box from '@/components/Box';
import Link from 'next/link';
import {Button} from '@/components/Button';
import {getFormFieldAndValidations} from 'utils/helper';
import {registerApi} from 'apis/auth';
import {toast} from 'react-toastify';
import {useRouter} from 'next/router';
import {requestErrorHandler} from 'utils/request-error-handler';
import Image from 'next/image';
import AuthPageLogo from '@/components/Logos/AuthPageLogo';

interface RegisterProps {
  view: TView;
  fields: TFormField[];
}
const Register = ({view, fields}: RegisterProps) => {
  const router = useRouter();
  const {formFields, validations} = getFormFieldAndValidations(fields);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [passwordVisibilityConf, setPasswordVisibilityConf] = useState(false);

  const defaultValues = formFields;
  const methods = useForm({
    resolver: yupResolver(validations),
    defaultValues,
  });

  const {
    handleSubmit,
    watch,
    reset,
    setError,
    formState: {isSubmitting, errors},
  } = methods;

  const formValues = watch();

  const onSubmit = async (values: any) => {
    try {
      const res = await registerApi(values);
      if (res) {
        toast.success(res.data.message);
        reset();
        router.push('/auth/login');
      }
    } catch (error) {
      const {errorMessages} = requestErrorHandler(error);
      errorMessages.forEach((err: any) =>
        setError(err.field, {type: 'custom', message: err.message})
      );
    }
  };
  return (
    <div className="h-screen flex justify-center items-center 2xl:pt-40 2xl:pb-14 md:bg-gray-100 bg-white">
      <Box>
        <div className="w-full md:w-[500px]">
          <AuthPageLogo />
          <h1 className="text-[30px] font-bold text-zinc-900 text-center mb-7 font-pt-sans">
            Create new account
          </h1>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-x-10 gap-x-1">
              {fields.map((field, index) => (
                <Suspense key={field.id}>
                  <div
                    className={
                      field.field.slug === 'email' ||
                      field.field.slug === 'company'
                        ? 'md:col-span-2 col-span-1'
                        : ''
                    }
                  >
                    {field?.field?.translation?.description !== 'Password' && (
                      <FormInputGroup>
                        <RHFTextField
                          name={field.field.slug}
                          placeholder={
                            field.visible === 'required'
                              ? `${field.field.translation.description}*`
                              : `${field.field.translation.description}`
                          }
                          className={`text-[14px] ${
                            formValues[field.field.slug].length > 0 &&
                            'rounded-md bg-white border-gray-300'
                          } ${
                            field.field.slug === 'email' ||
                            field.field.slug === 'company'
                              ? 'w-full h-[36px]'
                              : ' h-[36px]'
                          }`}
                          type={field.ft.input_type}
                          regForm={true}
                        />
                      </FormInputGroup>
                    )}
                    {field?.field?.translation?.description == 'Password' && (
                      <FormInputGroup>
                        <>
                          <RHFTextField
                            name={field.field.slug}
                            placeholder={`${field.field.translation.description}*`}
                            className={`text-[14px] ${
                              formValues.password.length > 0 &&
                              'rounded-md bg-white border-gray-300'
                            }  h-[36px]`}
                            type={passwordVisibility ? 'text' : 'password'}
                            regForm={true}
                          />

                          <button
                            type="button"
                            onClick={() =>
                              setPasswordVisibility(!passwordVisibility)
                            }
                            className={`absolute right-5 top-2.5 ${
                              formValues.password.length > 0
                                ? 'visible'
                                : 'invisible'
                            }`}
                          >
                            {passwordVisibility ? (
                              <Image
                                src={'/icons/eye-off.svg'}
                                width={20}
                                height={20}
                                alt="Eye icon"
                              />
                            ) : (
                              <Image
                                src={'/icons/eye.svg'}
                                width={20}
                                height={20}
                                alt="Eye Off icon"
                              />
                            )}
                          </button>
                        </>
                      </FormInputGroup>
                    )}
                  </div>
                  {field.validation_rules?.map(
                    validation =>
                      validation.slug == 'confirmed' && (
                        <FormInputGroup key={validation.slug}>
                          <>
                            <RHFTextField
                              name="password_confirmation"
                              placeholder="Password confirmation*"
                              className={`text-[14px] ${
                                formValues.password_confirmation.length > 0 &&
                                'rounded-md bg-white border-gray-300'
                              }  h-[36px]`}
                              type={
                                passwordVisibilityConf ? 'text' : 'password'
                              }
                              regForm={true}
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setPasswordVisibilityConf(
                                  !passwordVisibilityConf
                                )
                              }
                              className={`absolute right-5 top-2.5 ${
                                formValues.password_confirmation.length > 0
                                  ? 'visible'
                                  : 'invisible'
                              }`}
                            >
                              {passwordVisibilityConf ? (
                                <Image
                                  src={'/icons/eye-off.svg'}
                                  width={20}
                                  height={20}
                                  alt="Eye icon"
                                />
                              ) : (
                                <Image
                                  src={'/icons/eye.svg'}
                                  width={20}
                                  height={20}
                                  alt="Eye Off icon"
                                />
                              )}
                            </button>
                          </>
                        </FormInputGroup>
                      )
                  )}
                </Suspense>
              ))}
            </div>
            <div className="flex justify-center">
              <div>
                <Button
                  type="submit"
                  size="lg"
                  className="mt-3 w-full mx-auto bg-zinc-700  hover:bg-zinc-900 mb-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Loading...' : 'Register'}
                </Button>
                <p className="text-center text-gray-500">
                  Already have login and password{' '}
                  <Link
                    href="/auth/login"
                    className="text-blue-800 hover:underline"
                  >
                    Login now
                  </Link>
                </p>
              </div>
            </div>
          </FormProvider>
        </div>
      </Box>
    </div>
  );
};

export default Register;
