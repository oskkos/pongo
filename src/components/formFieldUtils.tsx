import { FieldError } from 'react-hook-form';

export function FormFieldLabel({ label }: { label: string }) {
  return <label className="text-sm mt-2">{label}</label>;
}
export function FormFieldError({ error }: { error?: FieldError }) {
  return error && <div className="text-xs text-error ml-2">{error.message}</div>;
}
