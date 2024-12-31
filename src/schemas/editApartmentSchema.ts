import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import type { ZodType } from 'zod';

export interface EditApartmentData {
  apartmentSize: number;
  coverPhoto?: FileList | null;
  description: string | null;
  postalCode: string;
  postOffice: string;
  streetAddress: string;
  slug?: string;
  title: string | null;
}
export const EditApartmentDataFields: Record<string, keyof EditApartmentData> = {
  apartmentSize: 'apartmentSize',
  coverPhoto: 'coverPhoto',
  description: 'description',
  postalCode: 'postalCode',
  postOffice: 'postOffice',
  streetAddress: 'streetAddress',
  slug: 'slug',
  title: 'title',
};
export const EditApartmentSchema: ZodType<EditApartmentData> = z.object({
  apartmentSize: z.coerce.number().positive().int(),
  coverPhoto: z.any().optional(),
  description: z.string(),
  postalCode: z.string().regex(/^\d{5}$/),
  postOffice: z.string().min(1),
  streetAddress: z.string().min(1),
  slug: z.string().optional(),
  title: z.string().min(1),
});

export const EditApartmentSchemaResolver = zodResolver(EditApartmentSchema);
