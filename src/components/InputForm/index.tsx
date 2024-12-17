import React from 'react';
import { ErrorMessage, Field } from 'formik';
import InputMask from 'react-input-mask'; // Importando o InputMask

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
  name: string;
  type: string;
  placeholder?: string;
  mask?: string;
}

export const InputForm = ({
  id,
  label,
  name,
  type,
  placeholder,
  mask, // Agora aceitamos a propriedade 'mask'
  ...props
}: FieldProps) => {
  return (
    <div className="flex gap-2 items-center justify-between">
      <label htmlFor={name} className="flex text-xs">
        {label}:{' '}
      </label>
      <div className="flex flex-col relative">
        {/* Usando o InputMask para aplicar a máscara */}
        {mask ? (
          <Field
            id={id || name}
            name={name}
            type={type}
            placeholder={placeholder}
            className="rounded-sm w-full outline-none text-dark px-2 text-xs py-1 max-w-full"
            {...props}
            render={({ field }: any) => (
              <InputMask
                {...field}
                mask={mask || ''}
                maskChar={null} // Define que o caractere de máscara não será exibido
              >
                {(inputProps: any) => (
                  <input
                    {...inputProps}
                    className="rounded-sm w-full outline-none text-dark px-2 text-xs py-1 max-w-full"
                  />
                )}
              </InputMask>
            )}
          />
        ) : (
          <Field
            id={id || name}
            name={name}
            type={type}
            placeholder={placeholder}
            className="rounded-sm w-full outline-none text-dark px-2 text-xs py-1 max-w-full"
            {...props}
          />
        )}
        <ErrorMessage
          name={name}
          component="span"
          className="text-[8px] text-red-700 flex absolute top-[calc(100%)]"
        />
      </div>
    </div>
  );
};
