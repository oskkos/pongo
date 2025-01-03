import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import type { ZodType } from 'zod';

export interface EditFinancialRecordData {
  id?: string;
  amount: number;
  apartmentId: string;
  attachment?: FileList | null;
  categoryId: string;
  description: string | null;
  recordDate: string;
}
export const EditFinancialRecordDataFields: Record<string, keyof EditFinancialRecordData> = {
  id: 'id',
  amount: 'amount',
  apartmentId: 'apartmentId',
  attachment: 'attachment',
  categoryId: 'categoryId',
  description: 'description',
  recordDate: 'recordDate',
};
export const EditFinancialRecordSchema: ZodType<EditFinancialRecordData> = z.object({
  id: z.string().uuid().optional(),
  amount: z.coerce.number(),
  apartmentId: z.string().uuid(),
  attachment: z.any().optional(),
  categoryId: z.string().uuid(),
  description: z.string(),
  recordDate: z.string().date(),
});

export const EditFinancialRecordSchemaResolver = zodResolver(EditFinancialRecordSchema);
