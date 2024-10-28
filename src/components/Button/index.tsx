import clsx from 'clsx';
import React from 'react';

type ButtonVariant = 'primary' | 'delete' | 'transparent';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: React.ReactNode;
  label?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  icon,
  label,
  ...props
}) => {
  return (
    <button
      className={clsx('inline-flex px-4 py-2 rounded items-center gap-2 h-fit', {
        'bg-brand-100 hover:bg-brand-100/75 text-cream-100':
          variant === 'primary',
        'bg-delete hover:bg-delete/75 text-cream-100': variant === 'delete',
        'bg-transparent hover:bg-black/5 text-cream-100': variant === 'transparent',
      })}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {label && <p>{label}</p>}
    </button>
  );
};
