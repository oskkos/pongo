'use client';

import { useRouter } from 'next/navigation';

import Fab from '@/components/fab';
import { i18n } from '@/lib/i18n';

export default function AddNewApartmentBtn() {
  const router = useRouter();
  return (
    <>
      {/* Button is visible for bigger screen sizes */}
      <button
        type="button"
        className="btn btn-neutral mt-4 hidden md:flex col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4"
        onClick={() => router.push('/apartments/add')}
      >
        {i18n.AddNewApartment}
      </button>
      {/* Fab is visible for small screen size */}
      <div className="visible md:hidden" onClick={() => router.push('/apartments/add')}>
        <Fab />
      </div>
    </>
  );
}
