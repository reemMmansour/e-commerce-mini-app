import React from 'react';
import { Input as AntInput } from 'antd';
import { InputProps } from 'antd/lib/input';

interface CustomInputProps extends Omit<InputProps, 'type'> {
  type?: 'text' | 'password' | 'email' | 'number';
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  size?: 'small' | 'middle' | 'large';
  className?: string;
}

const Input: React.FC<CustomInputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  size = 'middle',
  className,
  ...props
}) => {
  return (
    <AntInput
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      size={size}
      className={className}
      {...props}
    />
  );
};

export default Input;
