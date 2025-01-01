import { Tenant } from '@prisma/client';
import { JSX } from 'react';

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
      <div role="tabpanel" className="tab-content bg-neutral rounded-b-lg p-6">
        {children}
      </div>
    </>
  );
}

export default function ApartmentTabs({ tenants }: { tenants: Tenant[] }) {
  return (
    <TabBar>
      <Tab label={i18n.Tenants} selected>
        <TenantTable tenants={tenants} />
      </Tab>
      <Tab label={i18n.Finance} disabled>
        Finance content
      </Tab>
    </TabBar>
  );
}
