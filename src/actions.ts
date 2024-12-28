'use server';

import { FieldValues, Path } from 'react-hook-form';
import { ZodError, ZodIssue } from 'zod';

import * as apartmentService from '@/services/apartmentService';
import { AddNewApartmentData, AddNewApartmentDataFields, AddNewApartmentSchema } from './schemas/addNewApartmentSchema';

function handleZodErrors<T extends FieldValues>(errors: ZodIssue[], knwonFields: { [k: string]: Path<T> }) {
  return errors.reduce(
    (acc, issue) => {
      const path = issue.path[0];
      if (!path || !knwonFields[path]) {
        return acc;
      }
      return [...acc, `${knwonFields[path]}: ${issue.message}`];
    },

    [] as string[]
  );
}
function handleError(error: unknown) {
  if (error instanceof ZodError) {
    return handleZodErrors(error.errors, AddNewApartmentDataFields).join(', ');
  }
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}
export async function getAllApartments() {
  return apartmentService.getAllApartments();
}

export async function addNewApartment(data: AddNewApartmentData) {
  try {
    const result = AddNewApartmentSchema.parse(data);
    await apartmentService.addNewApartment(result);
    return { status: 'success' } as const;
  } catch (error) {
    return { status: 'error', error: handleError(error) } as const;
  }
}
