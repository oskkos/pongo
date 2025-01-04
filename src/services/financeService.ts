import 'server-only';

import { FinancialRecord } from '@prisma/client';

import { getApartmentById } from '@/repositories/apartmentRepository';
import * as financeRepository from '@/repositories/financeRepository';
import { EditFinancialRecordData } from '@/schemas/editFinancialRecordSchema';
import { uploadImage } from './imageUploadService';

export async function getFinancialRecordCategories() {
  return financeRepository.getFinancialRecordCategories();
}

async function setAttachment(attachment: File, id: string, slug: string, apartmentId: string) {
  const attachmentId = await uploadImage(attachment, slug, 'receipt');
  return await financeRepository.updateFinancialRecord({ id, attachmentId, apartmentId });
}

export async function editFinancialRecord(data: EditFinancialRecordData) {
  let financialRecord: FinancialRecord;
  const { attachment, ...recordDataRaw } = data;

  const recordData = {
    ...recordDataRaw,
    recordDate: new Date(recordDataRaw.recordDate),
  };
  if (!recordData.id) {
    financialRecord = await financeRepository.addNewFinancialRecord(recordData);
  } else {
    financialRecord = await financeRepository.updateFinancialRecord({ ...recordData, id: recordData.id! });
  }
  if (attachment?.[0]) {
    const apartment = await getApartmentById(data.apartmentId);
    if (apartment) {
      financialRecord = await setAttachment(attachment[0], financialRecord.id, apartment.slug, apartment.id);
    }
  }
  return financialRecord;
}

export async function getAllFinancialRecords() {
  return financeRepository.getAllFinancialRecords();
}
