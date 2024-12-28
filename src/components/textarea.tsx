import { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';

import { FormFieldError, FormFieldLabel } from '@/components/formFieldUtils';

export default function Textarea<T extends FieldValues>({
  label,
  name,
  register,
  error,
}: {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  error?: FieldError;
}) {
  return (
    <>
      <FormFieldLabel label={label} />
      <textarea {...register(name)} placeholder={label} className="textarea textarea-bordered" />
      <FormFieldError error={error} />
    </>
  );
}
