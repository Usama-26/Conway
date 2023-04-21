import React from 'react';
import {TextArea} from '../../Form';
import {useFormContext, Controller} from 'react-hook-form';

interface IRHFTextArea extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

export default function RHFTextArea({name, readOnly, ...other}: IRHFTextArea) {
  const {control} = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState: {error}}) => (
        <TextArea
          readOnly={readOnly}
          {...field}
          error={error}
          helperText={error?.message}
          {...other}
        />
      )}
    />
  );
}
