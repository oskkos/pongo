'use client';

import { FinancialRecord, FinancialRecordCategory } from '@prisma/client';
import Link from 'next/link';
import React, { useMemo, useState } from 'react';
import { MdAttachFile, MdCalculate, MdContentCopy, MdEdit } from 'react-icons/md';

import EditFinancialRecordDetails from '@/components/editFinancialRecordDetails';
import Image from '@/components/image';
import Modal, { hideModal, showModal } from '@/components/modal';
import { useSort } from '@/components/useSort';
import { i18n } from '@/lib/i18n';
import FinancialCalculations from './financialCalculations';

type FinancialRecordType = FinancialRecord & { apartment?: { slug: string; streetAddress: string } };
type SortColumns = 'apartment' | 'amount' | 'category' | 'type' | 'description' | 'recordDate';

export default function FinancialRecordTable({
  apartments,
  records,
  categories,
}: {
  apartments: { id: string; streetAddress: string }[];
  records: FinancialRecordType[];
  categories: FinancialRecordCategory[];
}) {
  const [categoryMap, getters] = useMemo(() => {
    const categoryMap = new Map(categories.map((category) => [category.id, category]));
    const getters = new Map<SortColumns, (record: FinancialRecordType) => string>([
      ['apartment', (record: FinancialRecordType) => record.apartment?.streetAddress ?? '-'],
      [
        'category',
        (record: FinancialRecordType) => {
          console.log('category');
          return categoryMap.get(record.categoryId)?.name ?? '-';
        },
      ],
      ['type', (record: FinancialRecordType) => categoryMap.get(record.categoryId)?.categoryType ?? '-'],
    ]);
    return [categoryMap, getters] as const;
  }, [categories]);

  const {
    sortedData: sortedFinancialRecords,
    updateSort,
    sortIcon,
  } = useSort<FinancialRecordType, SortColumns>({ property: 'recordDate', direction: 'desc' }, records, getters);

  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);

  const renderApartmentCell = sortedFinancialRecords.some((record) => record.apartment);
  return (
    <>
      <MdCalculate
        className="m-4"
        size={24}
        onClick={() => {
          setModalContent(<FinancialCalculations records={sortedFinancialRecords} categories={categories} />);
          showModal('financialRecordModal');
        }}
      />
      <div className="overflow-x-auto max-h-content">
        <table className="table table-pin-rows table-xs md:table-sm xl:table-md">
          <thead>
            <tr>
              {renderApartmentCell && (
                <th className="cursor-pointer" onClick={() => updateSort('apartment')}>
                  {i18n.Apartment}
                  {sortIcon('apartment')}
                </th>
              )}
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
              <th className="w-8"></th>
              <th className="w-8"></th>
            </tr>
          </thead>
          <tbody>
            {sortedFinancialRecords.map((record) => {
              return (
                <tr key={record.id}>
                  {renderApartmentCell && (
                    <td>
                      <Link href={`/apartments/${record.apartment?.slug}`}>{record.apartment?.streetAddress}</Link>
                    </td>
                  )}
                  <td className="!py-0">
                    <div
                      className={` w-24 p-3 m-0 badge ${categoryMap.get(record.categoryId)?.categoryType === 'EXPENSE' ? 'badge-error' : 'badge-success'}`}
                    >
                      {record.amount} €
                    </div>
                  </td>
                  <td>{record.description}</td>
                  <td>{categoryMap.get(record.categoryId)?.name ?? '-'}</td>
                  <td>{categoryMap.get(record.categoryId)?.categoryType ?? '-'}</td>
                  <td>{record.recordDate.toLocaleDateString()}</td>
                  <td>
                    {record.attachmentId && (
                      <span
                        onClick={() => {
                          setModalContent(
                            <Image src={record.attachmentId!} alt={i18n.Attachment} width={1920} height={1920} />
                          );
                          showModal('financialRecordModal');
                        }}
                      >
                        <MdAttachFile size={24} />
                      </span>
                    )}
                  </td>
                  <td className="!p-0">
                    <MdEdit
                      size={24}
                      onClick={() => {
                        setModalContent(
                          <EditFinancialRecordDetails
                            apartments={apartments}
                            financialRecord={record}
                            categories={categories}
                            onAfterSubmit={() => hideModal('financialRecordModal')}
                          />
                        );
                        showModal('financialRecordModal');
                      }}
                    />
                  </td>
                  <td className="!p-0">
                    <MdContentCopy
                      size={24}
                      onClick={() => {
                        const recordCopy = { ...record, id: '' };
                        setModalContent(
                          <EditFinancialRecordDetails
                            apartments={apartments}
                            financialRecord={recordCopy}
                            categories={categories}
                            onAfterSubmit={() => hideModal('financialRecordModal')}
                          />
                        );
                        showModal('financialRecordModal');
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Modal id="financialRecordModal" onClose={() => setModalContent(null)}>
          {modalContent}
        </Modal>
      </div>
    </>
  );
}
