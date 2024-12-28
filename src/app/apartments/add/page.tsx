'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';

import { addNewApartment } from '@/actions';
import Input from '@/components/input';
import Textarea from '@/components/textarea';
import { i18n } from '@/lib/i18n';
import { AddNewApartmentData, AddNewApartmentSchemaResolver } from '@/schemas/addNewApartmentSchema';

interface ToastData {
  visible: boolean;
  message: string;
  type: string;
}

async function onSubmit(data: AddNewApartmentData, setToast: Dispatch<SetStateAction<ToastData>>) {
  try {
    const ret = await addNewApartment(data);
    if (ret.status === 'success') {
      setToast({ visible: true, message: i18n.ApartmentAdded, type: 'alert-success' });
    } else {
      setToast({ visible: true, message: ret.error, type: 'alert-error' });
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    setToast({ visible: true, message: i18n.Error, type: 'alert-error' });
  }
}
function onError(errors: FieldErrors<AddNewApartmentData>) {
  // These are reported alongside the input fields, just log the errors for now
  console.warn('Form errors', errors);
}

function onToastDataChange(toast: ToastData, setToast: Dispatch<SetStateAction<ToastData>>) {
  if (toast.visible) {
    const timer = setTimeout(() => {
      setToast({ visible: false, message: '', type: '' });
    }, 3000);
    return () => clearTimeout(timer);
  }
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
    onToastDataChange(toast, setToast);
  }, [toast]);
  return (
    <div className="flex justify-center items-center">
      {toast.visible && (
        <div className="toast z-50">
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
