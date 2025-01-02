'use client';

import { useForm } from 'react-hook-form';

import { editApartment } from '@/actions';
import Input from '@/components/input';
import Textarea from '@/components/textarea';
import { i18n } from '@/lib/i18n';
import { EditApartmentData, EditApartmentSchemaResolver } from '@/schemas/editApartmentSchema';
import { onSubmit } from './formSubmitter';
import { useToast } from './useToast';

import type { Apartment } from '@prisma/client';
import type { FieldErrors } from 'react-hook-form';

function onError(errors: FieldErrors<EditApartmentData>) {
  // These are reported alongside the input fields, just log the errors for now
  console.warn('Form errors', errors);
}

export default function EditApartmentDetails({
  userId,
  apartment,
  onAfterSubmit,
}: {
  userId: string;
  apartment?: Apartment;
  onAfterSubmit?: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditApartmentData>({
    resolver: EditApartmentSchemaResolver,
  });

  const [toast, setToast] = useToast();

  return (
    <div className="flex justify-center items-center">
      {toast.visible && (
        <div className="toast z-50">
          <div className={`alert ${toast.type}`}>
            <span>{toast.message}</span>
          </div>
        </div>
      )}
      <form
        className="flex flex-col"
        onSubmit={handleSubmit((data) => onSubmit(data, editApartment, setToast, onAfterSubmit), onError)}
      >
        <Input label="" name="slug" register={register} type="hidden" value={apartment?.slug} error={errors.slug} />
        <Input label="" name="userId" register={register} type="hidden" value={userId} error={errors.userId} />
        <Input
          label={i18n.Title}
          name="title"
          register={register}
          value={apartment?.title ?? ''}
          error={errors.title}
        />
        <Textarea
          label={i18n.Description}
          name="description"
          register={register}
          value={apartment?.description ?? ''}
          error={errors.description}
        />
        <Input
          label={i18n.ApartmentSize}
          name="apartmentSize"
          register={register}
          error={errors.apartmentSize}
          value={apartment?.apartmentSize}
          type="number"
        />
        <Input
          label={i18n.StreetAddress}
          name="streetAddress"
          value={apartment?.streetAddress}
          register={register}
          error={errors.streetAddress}
        />
        <Input
          label={i18n.PostalCode}
          name="postalCode"
          value={apartment?.postalCode}
          register={register}
          error={errors.postalCode}
        />
        <Input
          label={i18n.PostOffice}
          name="postOffice"
          value={apartment?.postOffice}
          register={register}
          error={errors.postOffice}
        />

        <Input
          label={i18n.CoverPhoto}
          name="coverPhoto"
          register={register}
          error={errors.coverPhoto}
          type="file"
          className="file-input file-input-bordered w-full max-w-xs"
        />

        <button className="btn btn-primary mt-2" type="submit">
          {i18n.Submit}
        </button>
      </form>
    </div>
  );
}
