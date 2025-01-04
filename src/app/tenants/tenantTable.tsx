'use client';

import { Tenant } from '@prisma/client';
import Link from 'next/link';

import { useSort } from '@/components/useSort';
import { i18n } from '@/lib/i18n';

type TenantType = Tenant & { apartment?: { slug: string; streetAddress: string } };
type SortColumns = 'name' | 'email' | 'phoneNumber' | 'streetAddress' | 'tenantFrom' | 'tenantTo';

const getters = new Map<SortColumns, (tenant: TenantType) => string>([
  ['name', (tenant) => tenant.lastName + tenant.firstName],
  ['streetAddress', (tenant) => tenant.apartment?.streetAddress ?? '-'],
]);

export default function TenantTable({ tenants }: { tenants: TenantType[] }) {
  const {
    sortedData: sortedTenants,
    updateSort,
    sortIcon,
  } = useSort<TenantType, SortColumns>({ property: 'tenantFrom', direction: 'desc' }, tenants, getters);

  const renderApartmentCell = tenants.some((tenant) => tenant.apartment);
  return (
    <div className="overflow-x-auto max-h-content">
      <table className="table table-pin-rows table-xs md:table-sm xl:table-md">
        <thead>
          <tr>
            <th className="cursor-pointer" onClick={() => updateSort('name')}>
              {i18n.Name}
              {sortIcon('name')}
            </th>
            <th className="cursor-pointer" onClick={() => updateSort('email')}>
              {i18n.Email}
              {sortIcon('email')}
            </th>
            <th className="cursor-pointer" onClick={() => updateSort('phoneNumber')}>
              {i18n.PhoneNumber}
              {sortIcon('phoneNumber')}
            </th>
            {renderApartmentCell && (
              <th className="cursor-pointer" onClick={() => updateSort('streetAddress')}>
                {i18n.Apartment}
                {sortIcon('streetAddress')}
              </th>
            )}
            <th className="cursor-pointer" onClick={() => updateSort('tenantFrom')}>
              {i18n.TenantFrom}
              {sortIcon('tenantFrom')}
            </th>
            <th className="cursor-pointer" onClick={() => updateSort('tenantTo')}>
              {i18n.TenantTo}
              {sortIcon('tenantTo')}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedTenants.map((tenant) => {
            return (
              <tr key={tenant.id}>
                <td>
                  <Link href={`/tenants/${tenant.slug}`}>
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
                      <Link href={`/apartments/${tenant.apartment.slug}`}>{tenant.apartment.streetAddress}</Link>
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
