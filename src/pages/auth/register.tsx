import OverlayLoader from '@/components/OverlayLoader';
import {setLicenseDB} from 'server/db';
import viewModel from 'server/models/viewModel';
import {getCustomFormApi} from 'apis';
import {getFormFieldsApi} from 'apis/form_fields';
import {GetServerSideProps, InferGetServerSidePropsType} from 'next';
import React, {useEffect, useState} from 'react';
import {VIEWS} from '_constant';
import {TCustomForm, TFormField, TView} from '_types/types';
import AuthLayout from '../../layouts/AuthLayout';
import dynamic from 'next/dynamic';

const Register = dynamic(() => import('@/modules/auth/Register'), {});

const Index = ({
  view,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [fields, setFields] = useState<TFormField[]>([]);
  const [customForm, setCustomForm] = useState<null | TCustomForm>(null);
  const [loader, setLoader] = useState<boolean>(false);

  const getCustomForm = async (id: number) => {
    const {data} = await getCustomFormApi<TCustomForm | null>(id);
    setCustomForm(data);
  };
  const getFields = async (id: number) => {
    setLoader(true);
    const res = await getFormFieldsApi<TFormField[] | []>(id);
    setFields(res.data);
    setLoader(false);
  };
  useEffect(() => {
    if (view?.custom_form_id) {
      getCustomForm(view.custom_form_id);
      getFields(view.custom_form_id);
    }
    return () => {};
  }, [view]);

  return (
    <AuthLayout>
      {loader ? <OverlayLoader /> : <Register view={view} fields={fields} />}
    </AuthLayout>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  if (!(await setLicenseDB(req.headers.host))) {
    return {
      notFound: true,
    };
  }
  const view: TView = await viewModel.findFirst(`route='${VIEWS.REGSITER}'`);
  return {
    props: {view},
  };
};
