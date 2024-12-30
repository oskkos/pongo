import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import type { ZodType } from 'zod';

export interface AddNewApartmentData {
  apartmentSize: number;
  coverPhoto?: FileList | null;
  description: string | null;
  postalCode: string;
  postOffice: string;
  streetAddress: string;
  title: string | null;
}
export const AddNewApartmentDataFields: Record<string, keyof AddNewApartmentData> = {
  apartmentSize: 'apartmentSize',
  coverPhoto: 'coverPhoto',
  description: 'description',
  postalCode: 'postalCode',
  postOffice: 'postOffice',
  streetAddress: 'streetAddress',
  title: 'title',
};
export const AddNewApartmentSchema: ZodType<AddNewApartmentData> = z.object({
  apartmentSize: z.coerce.number().positive().int(),
  coverPhoto: z.any().optional(),
  description: z.string(),
  postalCode: z.string().regex(/^\d{5}$/),
  postOffice: z.string().min(1),
  streetAddress: z.string().min(1),
  title: z.string().min(1),
});

export const AddNewApartmentSchemaResolver = zodResolver(AddNewApartmentSchema);
