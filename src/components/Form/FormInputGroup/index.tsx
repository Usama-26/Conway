import React from 'react';
interface IFormInputGroup extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string | JSX.Element;
  children: JSX.Element;
  information?: string;
}

const FormInputGroup = ({
  name,
  label,
  children,
  className,
}: IFormInputGroup) => {
  return (
    <div className={['relative', className].join(' ')}>
      {label ? (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          <span className="flex space-x-4">{label}</span>
        </label>
      ) : null}
      {children}
    </div>
  );
};

export default FormInputGroup;
