'use client';

import { FieldError, FieldErrors, useForm, UseFormRegister } from 'react-hook-form';

import { i18n } from '@/lib/i18n';
import { AddNewApartmentData, AddNewApartmentSchemaResolver } from '@/schemas/addNewApartmentSchema';

function Label({ label }: { label: string }) {
  return <label className="text-sm mt-2">{label}</label>;
}
function Error({ error }: { error?: FieldError }) {
  return error && <div className="text-xs text-error ml-2">{error.message}</div>;
}
function Input({
  label,
  name,
  register,
  type,
  error,
}: {
  label: string;
  name: keyof AddNewApartmentData;
  register: UseFormRegister<AddNewApartmentData>;
  type?: string;
  error?: FieldError;
}) {
  return (
    <>
      <Label label={label} />
      <input
        {...register(name)}
        placeholder={label}
        type={type ?? 'text'}
        className="input input-bordered w-full max-w-xs"
      />
      <Error error={error} />
    </>
  );
}
function Textarea({
  label,
  name,
  register,
  error,
}: {
  label: string;
  name: keyof AddNewApartmentData;
  register: UseFormRegister<AddNewApartmentData>;
  error?: FieldError;
}) {
  return (
    <>
      <Label label={label} />
      <textarea {...register(name)} placeholder={label} className="textarea textarea-bordered" />
      <Error error={error} />
    </>
  );
}

function onSubmit(data: AddNewApartmentData) {
  console.log('Form data', data);
}
function onError(errors: FieldErrors<AddNewApartmentData>) {
  // These are reported alongside the input fields, just log the errors for now
  console.warn('Form errors', errors);
}

export default function AddNewApartment() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddNewApartmentData>({
    resolver: AddNewApartmentSchemaResolver,
  });

  return (
    <div className="flex justify-center items-center">
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit, onError)}>
        <Input label={i18n.Title} name="title" register={register} error={errors.title} />
        <Textarea label={i18n.Description} name="description" register={register} error={errors.description} />
        <Input
          label={i18n.ApartmentSize}
          name="apartmentSize"
          register={register}
          error={errors.apartmentSize}
          type="number"
        />
        <Input label={i18n.StreetAddress} name="streetAddress" register={register} error={errors.streetAddress} />
        <Input label={i18n.PostalCode} name="postalCode" register={register} error={errors.postalCode} />
        <Input label={i18n.PostOffice} name="postOffice" register={register} error={errors.postOffice} />

        <button className="btn btn-primary mt-2" type="submit">
          {i18n.Submit}
        </button>
      </form>
    </div>
  );
}
