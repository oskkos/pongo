'use client';

import { Apartment, Tenant } from '@prisma/client';
import { MdEdit } from 'react-icons/md';

import EditTenantDetails from '@/components/editTenantDetails';

export default function EditTenantModal({ tenant, apartments }: { tenant: Tenant; apartments: Apartment[] }) {
  const hideModal = () => {
    (document.getElementById(`editTenantModal-${tenant.slug}`) as HTMLDialogElement).close();
  };

  return (
    <dialog id={`editTenantModal-${tenant.slug}`} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <EditTenantDetails tenant={tenant} apartments={apartments} onAfterSubmit={hideModal} />
      </div>
    </dialog>
  );
}

export function EditTenantModalButton({ slug }: { slug: string }) {
  return (
    <button
      className="btn btn-circle btn-ghost btn-sm"
      onClick={() => {
        (document.getElementById(`editTenantModal-${slug}`) as HTMLDialogElement).showModal();
      }}
    >
      <MdEdit />
    </button>
  );
}
