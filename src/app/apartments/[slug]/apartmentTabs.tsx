import { FinancialRecord, FinancialRecordCategory, Tenant } from '@prisma/client';
import { JSX } from 'react';

import FinancialRecordTable from '@/app/finances/financialRecordTable';
import TenantTable from '@/app/tenants/tenantTable';
import { i18n } from '@/lib/i18n';

export function TabBar({ children }: { children: JSX.Element[] }) {
  return (
    <div role="tablist" className="tabs tabs-bordered mt-4">
      {children}
    </div>
  );
}
export function Tab({
  label,
  children,
  selected,
  disabled,
}: {
  label: string;
  children: string | JSX.Element | JSX.Element[];
  selected?: boolean;
  disabled?: boolean;
}) {
  return (
    <>
      <input
        type="radio"
        name="apartmentTable"
        role="tab"
        className="tab checked:bg-neutral rounded-t-lg sticky"
        aria-label={label}
        disabled={disabled}
        defaultChecked={selected}
      />
      <div role="tabpanel" className="tab-content bg-neutral rounded-b-lg">
        {children}
      </div>
    </>
  );
}

export default function ApartmentTabs({
  apartments,
  tenants,
  categories,
  records,
}: {
  apartments: { id: string; streetAddress: string }[];
  tenants: Tenant[];
  records: FinancialRecord[];
  categories: FinancialRecordCategory[];
}) {
  return (
    <TabBar>
      <Tab label={i18n.Tenants} selected>
        <div className="w-full max-w-[100vw] p-4">
          <TenantTable tenants={tenants} />
        </div>
      </Tab>
      <Tab label={i18n.Finance}>
        <div className="w-full max-w-[100vw] p-4">
          <FinancialRecordTable apartments={apartments} records={records} categories={categories} />
        </div>
      </Tab>
    </TabBar>
  );
}
