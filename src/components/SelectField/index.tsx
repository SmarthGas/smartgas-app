import React from 'react';
import { CaretUpDown } from '@phosphor-icons/react';
import { Select, MenuItem } from '@mui/material';

interface SelectFieldProps {
  label: string;
  options: Array<{ value: string; label: string }>;
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
}

export const SelectField = ({
  label,
  options,
  value,
  onChange,
  onBlur,
  placeholder,
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
        renderValue={(selected) =>
          selected
            ? options.find((o) => o.value === selected)?.label
            : placeholder
        }
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
