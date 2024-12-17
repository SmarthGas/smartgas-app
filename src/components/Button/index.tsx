import clsx from 'clsx';
import React from 'react';
import { icons } from '../Icons';
import { CircleNotch } from '@phosphor-icons/react';

type ButtonVariant = 'primary' | 'delete' | 'transparent';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  icon?: keyof typeof icons;
  label?: string;
  className?: string;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  icon,
  label,
  className,
  loading,
  ...props
}) => {
  return (
    <button
      className={clsx(
        `inline-flex px-4 py-2 rounded items-center gap-2 h-fit ${className}`,
        {
          'bg-brand-100 hover:bg-brand-100/75 text-cream-100':
            variant === 'primary',
          'bg-delete hover:bg-delete/75 text-cream-100': variant === 'delete',
          'bg-transparent hover:bg-black/5 text-cream-100':
            variant === 'transparent',
        },
        props.disabled && 'opacity-50 cursor-not-allowed'
      )}
      {...props}
    >
      {loading ? (
        <CircleNotch className="animate-spin" weight="bold" />
      ) : (
        <>
          {icons[icon as keyof typeof icons] && (
            <span>{icons[icon as keyof typeof icons]}</span>
          )}
          {label && <p className="text-xs">{label}</p>}
        </>
      )}
    </button>
  );
};
