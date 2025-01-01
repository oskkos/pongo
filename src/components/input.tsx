import { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';

import { FormFieldError, FormFieldLabel } from '@/components/formFieldUtils';

export default function Input<T extends FieldValues>({
  label,
  name,
  register,
  type,
  error,
  className,
  value,
}: {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  type?: 'string' | 'number' | 'date' | 'hidden' | 'file';
  error?: FieldError;
  className?: string;
  value?: string | number | Date;
}) {
  return (
    <>
      <FormFieldLabel label={label} />
      <input
        {...register(name)}
        placeholder={label}
        type={type ?? 'text'}
        className={`${className ?? 'input input-bordered w-full max-w-xs'}`}
        defaultValue={value instanceof Date ? value.toISOString() : value}
      />
      <FormFieldError error={error} />
    </>
  );
}
