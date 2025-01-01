'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { FieldValues, Path } from 'react-hook-form';
import { ZodError, ZodIssue } from 'zod';

import { EditApartmentData, EditApartmentDataFields, EditApartmentSchema } from '@/schemas/editApartmentSchema';
import * as apartmentService from '@/services/apartmentService';
import * as tenantService from '@/services/tenantService';
import { EditTenantData, EditTenantSchema } from './schemas/editTenantSchema';

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
    return handleZodErrors(error.errors, EditApartmentDataFields).join(', ');
  }
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
}

export async function getAllApartments() {
  return apartmentService.getAllApartments();
}
export async function getApartmentsForSelect() {
  return apartmentService.getApartmentsForSelect();
}
export async function getAllTenants() {
  return tenantService.getAllTenants();
}

export async function editApartment(data: EditApartmentData) {
  let apartment;
  try {
    const result = EditApartmentSchema.parse(data);
    apartment = await apartmentService.editApartment(result);
  } catch (error) {
    console.log('Error adding new apartment', error);
    return { status: 'error', error: handleError(error) } as const;
  }

  revalidatePath(`/apartments/${apartment.slug}`);
  revalidatePath(`/apartments`);
  if (data.slug !== apartment.slug) {
    redirect(`/apartments/${apartment.slug}`);
  }
}

export async function editTenant(data: EditTenantData) {
  let tenant;
  try {
    const result = EditTenantSchema.parse(data);
    tenant = await tenantService.editTenant(result);
  } catch (error) {
    console.log('Error adding new tenant', error);
    return { status: 'error', error: handleError(error) } as const;
  }

  revalidatePath(`/tenants/${tenant.slug}`);
  revalidatePath(`/tenants`);
  if (data.slug !== tenant.slug) {
    redirect(`/tenants/${tenant.slug}`);
  }
}
