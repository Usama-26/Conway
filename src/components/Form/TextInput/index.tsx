import {cn} from 'server/utils/helper';
import React, {ForwardedRef} from 'react';
import {FieldError} from 'react-hook-form';
import {ESizeVariant} from '_enums/ui';
import {TSizeTypes} from '_types/ui';

// const sizes: TSizeTypes = {
//   sm: 'h-10',
//   md: 'h-12',
//   lg: 'h-14',
// };

interface ITextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  variant?: ESizeVariant;
  error?: FieldError;
  helperText?: string;
}

const TextInput = React.forwardRef(
  (
    {
      name,
      variant,
      type,
      className,
      error,
      helperText,
      ...otherProps
    }: ITextInputProps,
    ref: ForwardedRef<any>
  ) => {
    return (
      <>
        <div className={`relative`}>
          <input
            ref={ref}
            type={type || 'text'}
            name={name}
            id={name}
            className={cn(
              variant !== 'sm' ? 'rounded-md' : null,
              error ? `form-control is-invalid` : `form-control`,
              ` ${className}`
            )}
            {...otherProps}
          />
          {error && (
            <p
              className={`text-sm mt-1.5 ${
                error ? 'text-red-500' : 'text-gray-600'
              }`}
            >
              {error.message}
            </p>
          )}
        </div>
      </>
    );
  }
);

export default TextInput;
