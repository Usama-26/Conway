import * as Yup from 'yup';
import {FormInputGroup} from '@/components/Form';
import {FormProvider, RHFTextField, RHFCheckbox} from '@/components/HookForm';
import Box from '@/components/Box';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import Link from 'next/link';
import {Button} from '@/components/Button';
import {forgotPasswordApi} from 'apis/auth';
import {toast} from 'react-toastify';
import {useRouter} from 'next/router';
import Modal from '@/components/Modal';
import {Fragment, useState} from 'react';
import Typography from '@/components/Typography';
import {ETypographyVarient} from '_enums/ui';
import Image from 'next/image';
import {Dialog, Transition} from '@headlessui/react';
import AuthPageLogo from '@/components/Logos/AuthPageLogo';

const ForgotPassword = () => {
  const router = useRouter();
  const [showSent, setShowsent] = useState(false);
  const defaultValues = {
    email: '',
  };
  const methods = useForm({
    resolver: yupResolver(
      Yup.object().shape({
        email: Yup.string().required('Required!'),
      })
    ),
    defaultValues,
  });

  const closeModal = () => {
    setShowsent(false);
  };

  const {
    handleSubmit,
    watch,
    reset,
    formState: {isSubmitting, errors},
  } = methods;
  const formValues = watch();
  const onSubmit = async (values: any) => {
    try {
      const {data} = await forgotPasswordApi(values);
      if (data) {
        toast.success(data?.message);
        setShowsent(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="flex justify-center font-pt-sans items-center w-screen h-screen md:bg-gray-100 bg-white">
        <Box>
          <div className="sm:w-72 w-64">
            <AuthPageLogo />
            <h1 className="text-xl font-bold text-zinc-900 mb-2">
              Forgot password?
            </h1>
            <p className="text-zinc-700/70 mb-1 text-sm">
              Enter your email address to receive a link for resetting your
              password.
              <br />
              {'(The link is valid for one day.)'}
            </p>
            <FormProvider
              methods={methods}
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
            >
              <div className="mt-3">
                <label htmlFor="inputEmail" className="relative block">
                  <span
                    className={`absolute left-4 top-3.5 z-10 ${
                      formValues.email.length > 0 && 'opacity-0'
                    }
                    `}
                  >
                    <Image
                      src={'/icons/user.svg'}
                      width={15}
                      height={18}
                      alt="user icon"
                    />
                  </span>
                  <RHFTextField
                    name="email"
                    placeholder="Email"
                    type="email"
                    className={`text-zinc-700 ${
                      formValues.email.length > 0 && 'px-5'
                    }`}
                  />
                </label>
              </div>
              <Button
                type="submit"
                size="lg"
                className=" w-full mx-auto bg-zinc-700 dark:hover:bg-zinc-900 dark:bg-zinc-700 hover:bg-zinc-900"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Loading...' : 'Request Reset'}
              </Button>

              <hr className="mt-4 border-t border-black/25 mb-2" />
              <Link
                href="/auth/login"
                className="text-yellow-600 text-center text-yellow-700/75 hover:underline underline-offset-2 hover:text-yellow-700 text-lg font-bold"
              >
                Sign In
              </Link>
            </FormProvider>
          </div>
        </Box>
      </div>

      {/* Message Modal */}
      <Transition appear show={showSent} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center relative">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white py-6 px-8 text-left align-middle shadow-xl transition-all">
                  <div className="absolute inline-block right-5 top-5">
                    {/* Close Button */}
                    <button
                      type="button"
                      onClick={closeModal}
                      className={'focus:outline-none'}
                    >
                      <Image
                        src="/icons/times.svg"
                        height={16}
                        width={16}
                        alt={'Close Modal'}
                        className={'select-none'}
                      />
                    </button>
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="text-xl text-center py-4 leading-6 font-pt-sans font-bold  text-neutral-700"
                  >
                    An email is headed your way
                  </Dialog.Title>
                  <div className="my-4 text-neutral-600">
                    <p className="text-sm  text-center">
                      If{' '}
                      <b>
                        <em>{formValues.email}</em>
                      </b>{' '}
                      is in our system, then we have sent you a link to reset
                      your password. The link is valid for one day.
                    </p>
                    <br />
                    <p className="text-sm  text-center">
                      {`Didn't get the email? Please confirm you entered the
                        correct email address and try checking your spam folder.
                        If the problem persists, please contact support!`}
                    </p>
                  </div>
                  <hr className="border-t border-black/25" />

                  <div className="flex justify-center font-pt-sans mt-6">
                    <Button
                      onClick={() => router.push('/auth/login')}
                      size="lg"
                      className=" w-3/5 mx-auto bg-zinc-700 dark:hover:bg-zinc-900 dark:bg-zinc-700 hover:bg-zinc-900 sm:text-base text-sm disabled:opacity-60"
                    >
                      Go to Login Page
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ForgotPassword;
