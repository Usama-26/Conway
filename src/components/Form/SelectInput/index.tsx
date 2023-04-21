import React from 'react';

interface ISelectInputProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  variant?: any;
  options: any[];
  error?: {
    message?: string;
  };
  value?: number | string;
}

const sizes: any = {
  sm: 'h-10',
  md: 'h-12',
  lg: 'h-14',
};

const SelectInput = ({
  name,
  options,
  variant,
  error,
  ...otherProps
}: ISelectInputProps) => {
  console.log('error:', error)
  return (
    <>
      <div className={`${variant ? sizes[variant] : sizes.sm}`}>
        <select
          name={name}
          id={name}
          className={ error ? `form-select is-invalid`: `form-select`}
          {...otherProps}
        >
          {options.map(item => (
            <option className="text-base" key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
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
};

export default SelectInput;
