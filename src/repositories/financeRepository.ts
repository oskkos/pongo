import 'server-only';

import { FinancialRecord } from '@prisma/client';
import { prisma } from 'prisma/prisma';

import { getUserIdFromSession } from '@/auth';
import { getApartmentById } from './apartmentRepository';

export async function getFinancialRecordCategories() {
  return prisma.financialRecordCategory.findMany({ orderBy: { name: 'asc' } });
}

export async function addNewFinancialRecord(
  data: Omit<FinancialRecord, 'id' | 'createdAt' | 'modifiedAt' | 'attachmentId'>
) {
  const userIdFromSession = await getUserIdFromSession();
  const apartment = await getApartmentById(data.apartmentId);
  if (!apartment || apartment.userId !== userIdFromSession) {
    throw new Error('Unauthorized');
  }
  return prisma.financialRecord.create({
    data,
  });
}
export async function updateFinancialRecord(data: { id: string; apartmentId: string } & Partial<FinancialRecord>) {
  const userIdFromSession = await getUserIdFromSession();
  const apartment = await getApartmentById(data.apartmentId);
  if (!apartment || apartment.userId !== userIdFromSession) {
    throw new Error('Unauthorized');
  }
  return prisma.financialRecord.update({
    where: { id: data.id },
    data,
  });
}

export async function getAllFinancialRecords() {
  const userId = await getUserIdFromSession();
  return prisma.financialRecord.findMany({
    where: { apartment: { userId } },
    orderBy: { recordDate: 'desc' },
    include: {
      apartment: { select: { streetAddress: true, slug: true } },
      category: { select: { name: true, categoryType: true } },
    },
  });
}
