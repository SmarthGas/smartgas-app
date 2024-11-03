import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input = ({ className, ...props }: InputProps) => {
  return (
    <>
      <input
        className={`rounded-sm w-full outline-none text-dark px-2 text-xs py-1 ${className}`}
        {...props}
      />
    </>
  );
};
