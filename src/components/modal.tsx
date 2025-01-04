'use client';

import React, { JSX } from 'react';

export default function Modal({
  id,
  onClose,
  children,
}: {
  id: string;
  onClose?: () => void;
  children: JSX.Element | JSX.Element[] | React.ReactNode | string;
}) {
  return (
    <dialog id={id} className="modal" onClose={onClose}>
      <div className="modal-box max-w-7xl">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        {children}
      </div>
    </dialog>
  );
}

export function hideModal(id: string) {
  (document.getElementById(id) as HTMLDialogElement).close();
}

export function showModal(id: string) {
  (document.getElementById(id) as HTMLDialogElement).showModal();
}
