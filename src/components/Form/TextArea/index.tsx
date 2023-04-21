import React, {ForwardedRef} from 'react';

interface ITextArea extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: any;
  error?: {
    message?: string;
  };
  helperText?: string;
}

const sizes: any = {
  sm: 'h-10',
  md: 'h-12',
  lg: 'h-14',
};

const TextArea = React.forwardRef(
  (
    {name, variant, readOnly, error, ...otherProps}: ITextArea,
    ref: ForwardedRef<any>
  ) => {
    return (
      <>
        <div className={`${variant ? sizes[variant] : sizes.xl}`}>
          <textarea
            readOnly={readOnly}
            ref={ref}
            name={name}
            id={name}
            className={ error ? `form-control is-invalid`: `form-control`}
            placeholder={otherProps.placeholder || ''}
          />
        </div>
        {error && (
          <p
            className={`invalid-feedback`}
          >
            {error.message}
          </p>
        )}
      </>
    );
  }
);

export default TextArea;
