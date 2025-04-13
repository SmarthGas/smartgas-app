import React from 'react';
import { CaretUpDown } from '@phosphor-icons/react';
import { Select, MenuItem } from '@mui/material';

export interface SelectFieldProps {
  label: string;
  options: Array<{ value: string; label: string }>;
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  disabled?: boolean;
}

export const SelectField = ({
  label,
  options,
  value,
  onChange,
  onBlur,
  placeholder,
  disabled,
}: SelectFieldProps) => {
  return (
    <div className="w-full flex flex-col items-start gap-2 text-sm">
      <label>{label}</label>
      <Select
        IconComponent={() => <CaretUpDown size={20} className="text-dark" />}
        className="border border-cream-100 px-2 bg-cream-100 h-10 w-full text-start"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onBlur={onBlur}
        displayEmpty
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <span className="text-dark">{placeholder}</span>;
          }
          const selectedOption = options.find(
            (option) => option.value === selected
          );
          return selectedOption ? selectedOption.label : placeholder;
        }}
        sx={{
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'transparent',
          },
          '& .MuiOutlinedInput-root.Mui-focused': {
            boxShadow: 'none',
          },
        }}
        disabled={disabled}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};
