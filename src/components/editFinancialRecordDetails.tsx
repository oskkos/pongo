'use client';

import { FinancialRecord, FinancialRecordCategory } from '@prisma/client';
import { useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';

import { editFinancialRecord } from '@/actions';
import Input from '@/components/input';
import { i18n } from '@/lib/i18n';
import { EditFinancialRecordData, EditFinancialRecordSchemaResolver } from '@/schemas/editFinancialRecordSchema';
import { onSubmit } from './formSubmitter';
import Select from './select';
import Textarea from './textarea';
import { useToast } from './useToast';

function onError(errors: FieldErrors<EditFinancialRecordData>) {
  // These are reported alongside the input fields, just log the errors for now
  console.warn('Form errors', errors);
}

export default function EditFinancialRecordDetails({
  apartments,
  categories,
  financialRecord,
  onAfterSubmit,
}: {
  apartments: { id: string; streetAddress: string }[];
  categories: FinancialRecordCategory[];
  financialRecord?: FinancialRecord;
  onAfterSubmit?: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditFinancialRecordData>({
    resolver: EditFinancialRecordSchemaResolver,
  });

  const [toast, setToast] = useToast();
  const [recordIsExpence, setRecordIsExpence] = useState(true);

  if (!apartments.length) {
    return <h2 className="mt-4">{i18n.AddApartmentPriorFinancialRecord}</h2>;
  }
  if (!categories.length) {
    return <h2 className="mt-4">{i18n.AddFinancialRecordCategoriesPriorFinancialRecord}</h2>;
  }

  const apartmentOptions = apartments.map((apartment) => ({ value: apartment.id, label: apartment.streetAddress }));
  const categoryOptions = categories
    .filter((category) => category.categoryType === (recordIsExpence ? 'EXPENSE' : 'INCOME'))
    .map((category) => ({ value: category.id, label: category.name, title: category.description }));

  return (
    <div className="flex flex-col justify-center items-center">
      {toast.visible && (
        <div className="toast z-50">
          <div className={`alert ${toast.type}`}>
            <span>{toast.message}</span>
          </div>
        </div>
      )}
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Income</span>
          <input
            type="checkbox"
            className="toggle mx-4"
            defaultChecked={recordIsExpence}
            onChange={() => setRecordIsExpence(!recordIsExpence)}
          />
          <span className="label-text">Expense</span>
        </label>
      </div>
      <form
        className="flex flex-col"
        onSubmit={handleSubmit((data) => onSubmit(data, editFinancialRecord, setToast, onAfterSubmit), onError)}
      >
        {financialRecord?.id && (
          <Input label="" name="id" register={register} type="hidden" value={financialRecord?.id} error={errors.id} />
        )}
        <Select
          label={i18n.Apartment}
          name="apartmentId"
          options={apartmentOptions}
          register={register}
          value={financialRecord?.apartmentId}
          error={errors.apartmentId}
        />
        <Select
          label={i18n.FinancialRecordCategory}
          name="categoryId"
          options={categoryOptions}
          register={register}
          value={financialRecord?.categoryId}
          error={errors.categoryId}
        />
        <Input
          label={i18n.Amount}
          name="amount"
          register={register}
          value={financialRecord?.amount ?? ''}
          error={errors.amount}
          type="number"
        />
        <Textarea
          label={i18n.Description}
          name="description"
          register={register}
          value={financialRecord?.description ?? ''}
          error={errors.description}
        />

        <Input
          label={i18n.RecordDate}
          name="recordDate"
          value={financialRecord?.recordDate ? financialRecord.recordDate.toISOString().split('T')[0] : ''}
          register={register}
          error={errors.recordDate}
          type="date"
        />
        <Input
          label={i18n.Attachment}
          name="attachment"
          register={register}
          error={errors.attachment}
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
