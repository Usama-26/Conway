import * as Yup from 'yup';
import {FormInputGroup} from '@/components/Form';
import {FormProvider, RHFTextField, RHFCheckbox} from '@/components/HookForm';
import Box from '@/components/Box';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import Link from 'next/link';
import {Button} from '@/components/Button';
import {resetPasswordApi} from 'apis/auth';
import {toast} from 'react-toastify';
import {useRouter} from 'next/router';
import Image from 'next/image';
import {useState} from 'react';
import AuthPageLogo from '@/components/Logos/AuthPageLogo';

const ResetPassword = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const router = useRouter();
  const {token, email} = router.query;
  // console.log(token, email);
  const defaultValues = {
    email,
    token,
    password: '',
    password_confirmation: '',
  };
  const methods = useForm({
    resolver: yupResolver(
      Yup.object().shape({
        password: Yup.string().required('Required!'),
        password_confirmation: Yup.string()
          .required('Password confirmation is required!')
          .oneOf([Yup.ref('password'), null]),
      })
    ),
    defaultValues,
  });

  const {
    handleSubmit,
    watch,
    reset,
    formState: {isSubmitting, errors},
  } = methods;
  const formValues = watch();
  const onSubmit = async (values: any) => {
    try {
      const {data} = await resetPasswordApi(values);
      if (data) {
        toast.success(data?.message);
        reset();
        router.push('/auth/login');
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="flex justify-center items-center w-screen h-screen md:bg-gray-100 bg-white">
      <Box>
        <div className="sm:w-72 w-64">
          <AuthPageLogo className="mb-10" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Reset Password
          </h1>
          <p className="text-zinc-700/70 mb-1 text-sm w-4/5">
            Enter a new password for your account.
          </p>
          <FormProvider
            methods={methods}
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col"
          >
            <div>
              <label htmlFor="inputEmail" className="relative block">
                <RHFTextField
                  id="inputEmail"
                  name="email"
                  placeholder="Email"
                  type="email"
                  className="mb-4 px-5"
                  readOnly
                />
              </label>
            </div>
            <div>
              <FormInputGroup>
                <label htmlFor="inputPassword" className="relative block">
                  <span
                    className={`absolute left-4 top-4 z-10 ${
                      formValues.password.length > 0 && 'invisible'
                    }
                    `}
                  >
                    <Image
                      src={'/icons/lock-closed.svg'}
                      width={15}
                      height={18}
                      alt="user icon"
                    />
                  </span>
                  <RHFTextField
                    id="inputPassword"
                    name="password"
                    placeholder="Password"
                    type={passwordVisibility ? 'text' : 'password'}
                    className={`text-zinc-700 ${
                      formValues.password.length > 0 && 'px-5'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordVisibility(!passwordVisibility)}
                    className={`absolute right-5 top-4 ${
                      formValues.password.length > 0 ? 'visible' : 'invisible'
                    }`}
                  >
                    {passwordVisibility ? (
                      <Image
                        src={'/icons/eye-off.svg'}
                        width={20}
                        height={20}
                        alt="Eye icon"
                        className=" select-none"
                      />
                    ) : (
                      <Image
                        src={'/icons/eye.svg'}
                        width={20}
                        height={20}
                        alt="Eye Off icon"
                        className=" select-none"
                      />
                    )}
                  </button>
                </label>
              </FormInputGroup>
            </div>
            <div>
              <FormInputGroup>
                <label
                  htmlFor="inputConfirmPassword"
                  className="relative block"
                >
                  <span
                    className={`absolute left-4 top-4 z-10 ${
                      formValues.password_confirmation.length > 0 && 'invisible'
                    }
                    `}
                  >
                    <Image
                      src={'/icons/lock-closed.svg'}
                      width={15}
                      height={18}
                      alt="user icon"
                    />
                  </span>
                  <RHFTextField
                    id="inputConfirmPassword"
                    name="password_confirmation"
                    placeholder="Cofirm Password"
                    type={passwordVisibility ? 'text' : 'password'}
                    className={`text-zinc-700 ${
                      formValues.password_confirmation.length > 0 && 'px-5'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordVisibility(!passwordVisibility)}
                    className={`absolute right-5 top-4 ${
                      formValues.password_confirmation.length > 0
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
                        className=" select-none"
                      />
                    ) : (
                      <Image
                        src={'/icons/eye.svg'}
                        width={20}
                        height={20}
                        alt="Eye Off icon"
                        className=" select-none"
                      />
                    )}
                  </button>
                </label>
              </FormInputGroup>
            </div>
            <Button
              size="lg"
              type="submit"
              className="mt-3 w-full mx-auto bg-zinc-700 dark:hover:bg-zinc-900 dark:bg-zinc-700 hover:bg-zinc-900"
            >
              Reset password
            </Button>

            <hr className="mt-6 mb-2" />
            <Link
              href="/auth/login"
              className="text-yellow-700/75 hover:text-yellow-700 hover:underline underline-offset-1 text-center text-lg font-bold"
            >
              Sign In
            </Link>
          </FormProvider>
        </div>
      </Box>
    </div>
  );
};
export default ResetPassword;