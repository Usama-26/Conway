import axiosInstance from 'utils/axios';

export async function registerApi(values: any) {
  return axiosInstance.post('customers/register', values);
}

export async function forgotPasswordApi(values: any) {
  return axiosInstance.post('customers/forgot_password', values);
}

export async function resetPasswordApi(values: any) {
  return axiosInstance.post('customers/reset_password', values);
}

export async function sendVerificationEmailApi({
  id,
  email,
}: {
  id: string;
  email: string;
}) {
  return axiosInstance.post('customers/send_verification_email', {id, email});
}

export async function verifyEmailApi(values: {email: string; token: string}) {
  return axiosInstance.post('customers/verify_email', values);
}
