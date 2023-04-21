/* eslint-disable @next/next/no-img-element */
import * as Yup from 'yup';
import {FormInputGroup} from '@/components/Form';
import {FormProvider, RHFTextField, RHFCheckbox} from '@/components/HookForm';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import Box from '@/components/Box';
import Link from 'next/link';
import {Button} from '@/components/Button';
import {signIn} from 'next-auth/react';
import {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import {useRouter} from 'next/router';
import Image from 'next/image';
import AuthPageLogo from '@/components/Logos/AuthPageLogo';

const Login = () => {
  const router = useRouter();
  const {verify} = router.query;

  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const defaultValues = {
    username: '',
    password: '',
    remember: '',
  };

  const methods = useForm({
    resolver: yupResolver(
      Yup.object().shape({
        username: Yup.string().required(),
        password: Yup.string().required(),
        // remember: Yup.boolean(),
      })
    ),
    defaultValues,
  });

  const {
    formState: {isSubmitting, errors},
    register,
    watch,
  } = methods;

  const formValues = watch();
  useEffect(() => {
    if (verify) {
      toast.success('Email verified successful.');
    }
  }, [verify]);

  const onSubmit = async (values: {username: string; password: string}) => {
    const res = await signIn('credentials', {
      username: values.username,
      password: values.password,
      redirect: false,
      callbackUrl: '/',
    });
    console.log(res);
    if (!res?.ok) {
      toast.error(
        'Unable to login, please re-check your credentials or verify your email if you have not.'
      );
    } else {
      if (typeof window !== 'undefined' && window.history.length > 1) {
        router.back();
      } else {
        router.push('/');
      }
    }
  };
  return (
    <div className="h-screen flex justify-center items-center md:bg-gray-100 bg-white font-pt-sans">
      <Box>
        <div className=" sm:w-72 w-64">
          <AuthPageLogo />
          <FormProvider
            className="flex flex-col gap-2 pt-5"
            methods={methods}
            onSubmit={onSubmit}
          >
            <div>
              <label htmlFor="inputEmail" className="relative block">
                <span
                  className={`absolute left-4 top-3.5 z-10 ${
                    formValues.username.length > 0 && 'opacity-0'
                  }`}
                >
                  <Image
                    src={'/icons/user.svg'}
                    width={15}
                    height={18}
                    alt="user icon"
                  />
                </span>
                <RHFTextField
                  id={'inputEmail'}
                  name={'username'}
                  placeholder={'Email'}
                  type={'email'}
                  className={`text-zinc-700 ${
                    formValues.username.length > 0 &&
                    'px-5 bg-white border-gray-300'
                  }`}
                  regForm={false}
                />
              </label>
            </div>

            <div>
              <label htmlFor="inputPassword" className="relative block">
                <span
                  className={`absolute left-4 top-3.5 z-10 ${
                    formValues.password.length > 0 && 'opacity-0'
                  }`}
                >
                  <Image
                    src={'/icons/lock-closed.svg'}
                    width={15}
                    height={19}
                    alt="Password icon"
                  />
                </span>
                <RHFTextField
                  id="inputPassword"
                  name="password"
                  type={passwordVisibility ? 'text' : 'password'}
                  placeholder="Password"
                  className={`text-zinc-700 ${
                    formValues.password.length > 0 &&
                    'px-5 bg-white border-gray-300'
                  }`}
                  regForm={false}
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
              </label>
            </div>

            <Button
              type="submit"
              size="lg"
              className="mt-3 w-full mx-auto bg-zinc-700 dark:hover:bg-zinc-900 dark:bg-zinc-700 hover:bg-zinc-900 disabled:opacity-60 text-[16px]"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Loading...' : 'Login'}
            </Button>

            <div className="flex justify-between mt-2 mx-2 text-sm">
              <div className="flex gap-2 font-medium items-center mb-5">
                <span className="hidden">
                  <RHFCheckbox name="remember" />
                </span>
                <label
                  htmlFor="remember"
                  className="inline-flex justify-between items-center cursor-pointer"
                >
                  <span
                    className={`inline-block h-2 w-2 mr-2.5 rounded-full outline outline-2 outline-[#C8C8C8] outline-offset-2 ${
                      formValues.remember
                        ? 'bg-zinc-700 outline-zinc-700'
                        : 'bg-transparent'
                    }`}
                  ></span>
                  <span className="text-[#858585] text-[13px] font-pt-sans">
                    Remember me
                  </span>
                </label>
              </div>

              <Link
                className="text-[#1651B0] font-pt-sans text-[13px] opacity-75 hover:underline underline-offset-2"
                href="/auth/forgot-password"
              >
                Forgot your password?
              </Link>
            </div>

            <p className="mt-8 text-center text-gray-500 text-[13px]">
              {"Don't"} have an account yet?{' '}
              <Link
                href="/auth/register"
                className="text-red-700 hover:underline underline-offset-2 text-[13px]"
              >
                Register now
              </Link>
            </p>
          </FormProvider>
        </div>
      </Box>
    </div>
  );
};

export default Login;
