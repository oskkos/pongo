'use client';

import { Tenant } from '@prisma/client';
import { FieldErrors, useForm } from 'react-hook-form';

import { editTenant } from '@/actions';
import Input from '@/components/input';
import { i18n } from '@/lib/i18n';
import { EditTenantData, EditTenantSchemaResolver } from '@/schemas/editTenantSchema';
import { onSubmit } from './formSubmitter';
import Select from './select';
import { useToast } from './useToast';

function onError(errors: FieldErrors<EditTenantData>) {
  // These are reported alongside the input fields, just log the errors for now
  console.warn('Form errors', errors);
}

export default function EditTenantDetails({
  apartments,
  tenant,
  onAfterSubmit,
}: {
  apartments: { id: string; streetAddress: string }[];
  tenant?: Tenant;
  onAfterSubmit?: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditTenantData>({
    resolver: EditTenantSchemaResolver,
  });

  const [toast, setToast] = useToast();
  const apartmentOptions = apartments.map((apartment) => ({ value: apartment.id, label: apartment.streetAddress }));

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
        onSubmit={handleSubmit((data) => onSubmit(data, editTenant, setToast, onAfterSubmit), onError)}
      >
        <Input label="" name="slug" register={register} type="hidden" value={tenant?.slug} error={errors.slug} />
        <Select
          label={i18n.Apartment}
          name="apartmentId"
          options={apartmentOptions}
          register={register}
          value={tenant?.apartmentId}
          error={errors.apartmentId}
        />
        <Input
          label={i18n.FirstName}
          name="firstName"
          register={register}
          value={tenant?.firstName ?? ''}
          error={errors.firstName}
        />
        <Input
          label={i18n.LastName}
          name="lastName"
          register={register}
          value={tenant?.lastName ?? ''}
          error={errors.lastName}
        />
        <Input
          label={i18n.PersonId}
          name="personId"
          register={register}
          value={tenant?.personId ?? ''}
          error={errors.personId}
        />
        <Input label={i18n.Email} name="email" register={register} value={tenant?.email ?? ''} error={errors.email} />
        <Input
          label={i18n.PhoneNumber}
          name="phoneNumber"
          register={register}
          error={errors.phoneNumber}
          value={tenant?.phoneNumber}
        />
        <Input
          label={i18n.TenantFrom}
          name="tenantFrom"
          value={tenant?.tenantFrom}
          register={register}
          error={errors.tenantFrom}
          type="date"
        />
        <Input
          label={i18n.TenantTo}
          name="tenantTo"
          value={tenant?.tenantTo ?? ''}
          register={register}
          error={errors.tenantTo}
          type="date"
        />

        <button className="btn btn-primary mt-2" type="submit">
          {i18n.Submit}
        </button>
      </form>
    </div>
  );
}
