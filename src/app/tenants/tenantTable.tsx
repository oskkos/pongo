'use client';

import { Tenant } from '@prisma/client';
import Link from 'next/link';
import { SetStateAction, useEffect, useState } from 'react';

import { i18n } from '@/lib/i18n';

type TenantType = Tenant & { apartment?: { slug: string; streetAddress: string } };
interface SortType {
  property: 'name' | 'email' | 'phoneNumber' | 'streetAddress' | 'tenantFrom' | 'tenantTo';
  direction: 'asc' | 'desc';
}

function updateSort(property: SortType['property'], setSort: (value: SetStateAction<SortType>) => void) {
  setSort((prev) => {
    if (prev.property === property) {
      return { property, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
    }
    return { property, direction: 'asc' };
  });
}
function sortTenants(tenants: TenantType[], sort: SortType) {
  tenants.sort((a, b) => {
    const property = sort.property;

    let aValue;
    let bValue;
    if (property === 'name') {
      aValue = a.lastName + a.firstName;
      bValue = b.lastName + b.firstName;
    } else if (property === 'streetAddress') {
      aValue = a.apartment?.streetAddress ?? '';
      bValue = b.apartment?.streetAddress ?? '';
    } else {
      aValue = a[property] ?? '';
      bValue = b[property] ?? '';
    }
    if (aValue < bValue) {
      return sort.direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sort.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });
}

export default function TenantTable({ tenants }: { tenants: TenantType[] }) {
  const [sort, setSort] = useState({ property: 'tenantFrom', direction: 'desc' } as SortType);
  const [sortedTenants, setSortedTenants] = useState<TenantType[]>(tenants);

  useEffect(() => {
    sortTenants(tenants, sort);
    setSortedTenants([...tenants]);
  }, [sort, tenants]);

  const renderApartmentCell = tenants.some((tenant) => tenant.apartment);
  return (
    <div className="overflow-x-auto max-h-content">
      <table className="table table-pin-rows table-xs md:table-sm xl:table-md">
        <thead>
          <tr>
            <th className="cursor-pointer" onClick={() => updateSort('name', setSort)}>
              {i18n.Name}
            </th>
            <th className="cursor-pointer" onClick={() => updateSort('email', setSort)}>
              {i18n.Email}
            </th>
            <th className="cursor-pointer" onClick={() => updateSort('phoneNumber', setSort)}>
              {i18n.PhoneNumber}
            </th>
            {renderApartmentCell && (
              <th className="cursor-pointer" onClick={() => updateSort('streetAddress', setSort)}>
                {i18n.Apartment}
              </th>
            )}
            <th className="cursor-pointer" onClick={() => updateSort('tenantFrom', setSort)}>
              {i18n.TenantFrom}
            </th>
            <th className="cursor-pointer" onClick={() => updateSort('tenantTo', setSort)}>
              {i18n.TenantTo}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedTenants.map((tenant) => {
            return (
              <tr key={tenant.id}>
                <td>
                  <Link href={`tenants/${tenant.slug}`}>
                    {tenant.lastName}, {tenant.firstName}
                  </Link>
                </td>
                <td>
                  <Link href={`mailto:${tenant.email}`}>{tenant.email}</Link>
                </td>
                <td>{tenant.phoneNumber}</td>
                {renderApartmentCell && (
                  <td>
                    {tenant.apartment && (
                      <Link href={`apartments/${tenant.apartment.slug}`}>{tenant.apartment.streetAddress}</Link>
                    )}
                  </td>
                )}
                <td>{tenant.tenantFrom.toLocaleDateString()}</td>
                <td>{tenant.tenantTo?.toLocaleDateString() ?? ''}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
