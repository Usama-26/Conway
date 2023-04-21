import React, {ForwardedRef} from 'react';
interface ICheckBox extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: {
    message?: string;
  };
}

const CheckBox = React.forwardRef(
  ({name, error, ...otherProps}: ICheckBox, ref: ForwardedRef<any>) => {
    return <input type="checkbox" name={name} id={name} {...otherProps} />;
  }
);

export default CheckBox;
