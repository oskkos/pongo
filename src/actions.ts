'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { FieldValues, Path } from 'react-hook-form';
import { ZodError, ZodIssue } from 'zod';

import { AddNewApartmentData, AddNewApartmentDataFields, AddNewApartmentSchema } from '@/schemas/addNewApartmentSchema';
import * as apartmentService from '@/services/apartmentService';

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
  let apartment;
  try {
    const result = AddNewApartmentSchema.parse(data);
    apartment = await apartmentService.addNewApartment(result);
  } catch (error) {
    return { status: 'error', error: handleError(error) } as const;
  }

  revalidatePath(`/apartments/${apartment.slug}`);
  revalidatePath(`/apartments`);
  redirect(`/apartments/${apartment.slug}`);
}

export async function setCoverPhoto(data: FormData) {
  const slug = data.get('slug') as string;
  const coverPhoto = data.get('coverPhoto') as File;
  if (!coverPhoto || !slug) {
    throw new Error('Slug and cover photo are required');
  }
  apartmentService.setCoverPhoto(coverPhoto, slug);

  revalidatePath(`/apartments/${slug}`);
  revalidatePath(`/apartments`);
}
