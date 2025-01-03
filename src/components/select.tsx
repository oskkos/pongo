import { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';

import { FormFieldError, FormFieldLabel } from '@/components/formFieldUtils';

export default function Select<T extends FieldValues>({
  label,
  name,
  value,
  options,
  register,
  error,
}: {
  label: string;
  name: Path<T>;
  value?: string | number;
  options: { value: string; label: string; title?: string | null }[];
  register: UseFormRegister<T>;
  error?: FieldError;
}) {
  return (
    <>
      <FormFieldLabel label={label} />
      <select {...register(name)} className="select select-bordered w-full max-w-xs" defaultValue={value}>
        {options.map((option) => (
          <option key={option.value} value={option.value} title={option.title ?? ''}>
            {option.label}
          </option>
        ))}
      </select>
      <FormFieldError error={error} />
    </>
  );
}
