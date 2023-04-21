import React from 'react';
import {FormProvider as Form, UseFormReturn} from 'react-hook-form';

interface IFormProvider extends React.FormHTMLAttributes<HTMLFormElement> {
  children?: any;
  methods: UseFormReturn<any, any>;
  onSubmit: (values: any) => void;
}

export default function FormProvider({
  children,
  onSubmit,
  methods,
  ...otherProps
}: IFormProvider) {
  return (
    <Form {...methods}>
      <form {...otherProps} onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </form>
    </Form>
  );
}
