import Box from '@/components/Box';
import {Button} from '@/components/Button';
import {useRouter} from 'next/router';
import AuthPageLogo from '@/components/Logos/AuthPageLogo';
import {verifyEmailApi} from 'apis/auth';
import {toast} from 'react-toastify';
import {useEffect, useState} from 'react';

const VerificationEmail = () => {
  const router = useRouter();
  const {email, token} = router.query;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!email || !token) {
      toast.error('Invalid verification link');
      return;
    }

    setLoading(true);
    verifyEmailApi({email: email as string, token: token as string})
      .then(res => {
        if (res.status === 200 || res.status === 201) {
          toast.success('Email verified successful.');
        } else {
          toast.error(
            'Unable to verify email, please re-check your credentials or verify your email if you have not'
          );
        }
      })
      .catch(err => {
        toast.error(
          'Unable to verify email, please re-check your credentials or verify your email if you have not'
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [email, token]);

  return (
    <div className="flex justify-center items-center w-screen h-screen md:bg-gray-100 bg-white">
      <Box>
        <div className="sm:w-72 w-64">
          <AuthPageLogo className="mb-10" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Email Verified Successfully
          </h1>
          <p className="text-zinc-700/70 mb-1 text-sm w-4/5">
            Your email has been verified successfully. You can now login to your
            account.
          </p>
          <Button
            size="lg"
            type="submit"
            className="mt-3 w-full mx-auto bg-zinc-700 dark:hover:bg-zinc-900 dark:bg-zinc-700 hover:bg-zinc-900"
            onClick={() => router.push('/auth/login')}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Login'}
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default VerificationEmail;
