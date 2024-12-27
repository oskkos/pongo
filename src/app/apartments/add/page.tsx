'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FieldError, FieldErrors, useForm, UseFormRegister } from 'react-hook-form';

import { addNewApartment } from '@/actions';
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

async function onSubmit(
  data: AddNewApartmentData,
  setToast: Dispatch<
    SetStateAction<{
      visible: boolean;
      message: string;
      type: string;
    }>
  >
) {
  try {
    const ret = await addNewApartment(data);
    if (ret.status === 'success') {
      setToast({ visible: true, message: 'i18n.ApartmentAdded', type: 'alert-success' });
    } else {
      console.log(ret.error);
      setToast({ visible: true, message: ret.error, type: 'alert-error' });
    }
  } catch (error) {
    console.error(error);
    setToast({ visible: true, message: 'i18n.error', type: 'alert-error' });
  }
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

  const [toast, setToast] = useState({ visible: false, message: '', type: '' });
  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        setToast({ visible: false, message: '', type: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.visible]);
  return (
    <div className="flex justify-center items-center">
      {toast.visible && (
        <div className="toast">
          <div className={`alert ${toast.type}`}>
            <span>{toast.message}</span>
          </div>
        </div>
      )}
      <form className="flex flex-col" onSubmit={handleSubmit((data) => onSubmit(data, setToast), onError)}>
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
