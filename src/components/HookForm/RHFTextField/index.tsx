import React from 'react';
import {TextInput} from '../../Form';
import {useFormContext, Controller} from 'react-hook-form';
interface IRHFTextField extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  regForm?: boolean;
}
export default function RHFTextField({
  className,
  name,
  regForm,
  ...other
}: IRHFTextField) {
  const {control} = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState: {error}}) => (
        <TextInput
          error={error}
          helperText={error?.message}
          className={[
            'w-full rounded-[15px] h-[46px] text-[14px] px-10 bg-[#F4F4F4] focus:bg-white focus:outline-none border border-transparent focus:border-gray-300 mb-4',
            className,
            regForm && 'px-2 border border-[#E2E6EB] rounded-[5px]',
          ].join(' ')}
          {...field}
          {...other}
        />
      )}
    />
  );
}
