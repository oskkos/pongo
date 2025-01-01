import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import type { ZodType } from 'zod';

export interface EditTenantData {
  apartmentId: string;
  email: string;
  firstName: string;
  lastName: string;
  personId: string;
  phoneNumber: string;
  slug?: string;
  tenantFrom: string;
  tenantTo?: string | null;
}
export const EditTenantDataFields: Record<string, keyof EditTenantData> = {
  apartmentId: 'apartmentId',
  email: 'email',
  firstName: 'firstName',
  lastName: 'lastName',
  personId: 'personId',
  phoneNumber: 'phoneNumber',
  slug: 'slug',
  tenantFrom: 'tenantFrom',
  tenantTo: 'tenantTo',
};
export const EditTenantSchema: ZodType<EditTenantData> = z.object({
  apartmentId: z.string().uuid(),
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  personId: z.string().length(11),
  phoneNumber: z.string().min(1),
  slug: z.string().min(0),
  tenantFrom: z.string().date(),
  tenantTo: z.string().date().optional().or(z.literal('')),
});

export const EditTenantSchemaResolver = zodResolver(EditTenantSchema);
