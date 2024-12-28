import { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';

import { FormFieldError, FormFieldLabel } from '@/components/formFieldUtils';

export default function Input<T extends FieldValues>({
  label,
  name,
  register,
  type,
  error,
}: {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  type?: string;
  error?: FieldError;
}) {
  return (
    <>
      <FormFieldLabel label={label} />
      <input
        {...register(name)}
        placeholder={label}
        type={type ?? 'text'}
        className="input input-bordered w-full max-w-xs"
      />
      <FormFieldError error={error} />
    </>
  );
}
