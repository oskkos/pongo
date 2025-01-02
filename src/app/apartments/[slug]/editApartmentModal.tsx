'use client';

import { Apartment } from '@prisma/client';
import { MdEdit } from 'react-icons/md';

import EditApartmentDetails from '@/components/editApartmentDetails';

export default function EditApartmentModal({ userId, apartment }: { userId: string; apartment: Apartment }) {
  const hideModal = () => {
    const modal = document.getElementById(`editApartmentModal-${apartment.slug}`) as HTMLDialogElement;
    if (modal) {
      modal.close();
    }
  };

  return (
    <dialog id={`editApartmentModal-${apartment.slug}`} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <EditApartmentDetails apartment={apartment} userId={userId} onAfterSubmit={hideModal} />
      </div>
    </dialog>
  );
}

export function EditApartmentModalButton({ slug }: { slug: string }) {
  return (
    <button
      className="btn btn-circle btn-ghost btn-sm"
      onClick={() => {
        (document.getElementById(`editApartmentModal-${slug}`) as HTMLDialogElement).showModal();
      }}
    >
      <MdEdit />
    </button>
  );
}
