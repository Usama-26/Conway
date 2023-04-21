import {useSession} from 'next-auth/react';
import Head from 'next/head';
import {useRouter} from 'next/router';
import React from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout({children}: LayoutProps) {
  const router = useRouter();
  const {status} = useSession();

  if (status === 'authenticated') {
    router.push('/');
  }

  return <>{children}</>;
}
