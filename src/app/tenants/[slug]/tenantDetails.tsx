import { Apartment, Tenant } from '@prisma/client';
import Link from 'next/link';

import { i18n } from '@/lib/i18n';
import EditTenantModal, { EditTenantModalButton } from './editTenantModal';

export default function TenantDetails({ tenant, apartments }: { tenant: Tenant; apartments: Apartment[] }) {
  const apartment = apartments.find((a) => a.id === tenant.apartmentId);
  return (
    <div className="bg-base-300 text-base-content opacity-75 max-w-prose p-3 m-3 md:p-4 md:m-4 rounded-lg shadow-xl">
      <div className="inline-flex justify-between items-end w-full">
        <div className="text-xl md:text-2xl font-bold">{`${tenant.lastName}, ${tenant.firstName}`}</div>
        <div className="pl-8 pr-0">{<EditTenantModalButton slug={tenant.slug} />}</div>
      </div>

      <table className="table">
        <tbody>
          <tr>
            <th className="w-36">{i18n.Apartment}</th>
            <td>
              <Link href={`/apartments/${apartment?.slug}`}>{apartment?.streetAddress}</Link>
            </td>
          </tr>
          <tr>
            <th>{i18n.PersonId}</th>
            <td>{tenant.personId}</td>
          </tr>
          <tr>
            <th>{i18n.Email}</th>
            <td>{tenant.email}</td>
          </tr>
          <tr>
            <th>{i18n.PhoneNumber}</th>
            <td>{tenant.phoneNumber}</td>
          </tr>
          <tr>
            <th>{i18n.TenantFrom}</th>
            <td>{tenant.tenantFrom.toLocaleDateString()}</td>
          </tr>
          <tr>
            <th>{i18n.TenantTo}</th>
            <td>{tenant.tenantTo?.toLocaleDateString() ?? ''}</td>
          </tr>
        </tbody>
      </table>
      {<EditTenantModal tenant={tenant} apartments={apartments} />}
    </div>
  );
}
