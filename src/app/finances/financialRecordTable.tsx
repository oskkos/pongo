'use client';

import { FinancialRecord } from '@prisma/client';
import React, { useState } from 'react';

import Image from '@/components/image';
import Modal, { showModal } from '@/components/modal';
import { useSort } from '@/components/useSort';
import { i18n } from '@/lib/i18n';

type FinancialRecordType = FinancialRecord & { apartment?: { slug: string; streetAddress: string } } & {
  category: { name: string; categoryType: string };
};
type SortColumns = 'apartment' | 'amount' | 'category' | 'type' | 'description' | 'recordDate';

const getters = new Map<SortColumns, (record: FinancialRecordType) => string>([
  ['apartment', (record: FinancialRecordType) => record.apartment?.streetAddress ?? '-'],
  ['category', (record: FinancialRecordType) => record.category.name],
  ['type', (record: FinancialRecordType) => record.category.categoryType],
]);

export default function FinancialRecordTable({ records }: { records: FinancialRecordType[] }) {
  const {
    sortedData: sortedFinancialRecords,
    updateSort,
    sortIcon,
  } = useSort<FinancialRecordType, SortColumns>({ property: 'recordDate', direction: 'desc' }, records, getters);

  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);
  return (
    <div className="overflow-x-auto max-h-content">
      <table className="table table-pin-rows table-xs md:table-sm xl:table-md">
        <thead>
          <tr>
            <th className="cursor-pointer" onClick={() => updateSort('apartment')}>
              {i18n.Apartment}
              {sortIcon('apartment')}
            </th>
            <th className="cursor-pointer" onClick={() => updateSort('amount')}>
              {i18n.Amount}
              {sortIcon('amount')}
            </th>
            <th className="cursor-pointer" onClick={() => updateSort('description')}>
              {i18n.Description}
              {sortIcon('description')}
            </th>
            <th className="cursor-pointer" onClick={() => updateSort('category')}>
              {i18n.Category}
              {sortIcon('category')}
            </th>
            <th className="cursor-pointer" onClick={() => updateSort('type')}>
              {i18n.Type}
              {sortIcon('type')}
            </th>
            <th className="cursor-pointer" onClick={() => updateSort('recordDate')}>
              {i18n.RecordDate}
              {sortIcon('recordDate')}
            </th>
            <th>{i18n.Attachment}</th>
          </tr>
        </thead>
        <tbody>
          {sortedFinancialRecords.map((financialrecord) => {
            return (
              <tr key={financialrecord.id}>
                <td>{financialrecord.apartment?.streetAddress}</td>
                <td>{financialrecord.amount} €</td>
                <td>{financialrecord.description}</td>
                <td>{financialrecord.category.name}</td>
                <td>{financialrecord.category.categoryType}</td>
                <td>{financialrecord.recordDate.toLocaleDateString()}</td>
                <td>
                  {financialrecord.attachmentId && (
                    <span
                      onClick={() => {
                        setModalContent(
                          <Image src={financialrecord.attachmentId!} alt={i18n.Attachment} width={1920} height={1920} />
                        );
                        showModal('financialRecordAttachmentModal');
                      }}
                    >
                      klik
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal id="financialRecordAttachmentModal" onClose={() => setModalContent(null)}>
        {modalContent}
      </Modal>
    </div>
  );
}
