import { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';

import { FormFieldError, FormFieldLabel } from '@/components/formFieldUtils';

export default function Textarea<T extends FieldValues>({
  label,
  name,
  value,
  register,
  error,
}: {
  label: string;
  name: Path<T>;
  value?: string | number;
  register: UseFormRegister<T>;
  error?: FieldError;
}) {
  return (
    <>
      <FormFieldLabel label={label} />
      <textarea
        {...register(name)}
        placeholder={label}
        className="textarea textarea-bordered"
        defaultValue={value ?? ''}
      />
      <FormFieldError error={error} />
    </>
  );
}
