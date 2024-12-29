import { Apartment } from '@prisma/client';
import Link from 'next/link';

import Image from '@/components/image';

export default function ApartmentCard({ apartment }: { apartment: Apartment }) {
  return (
    <Link href={`/apartments/${apartment.slug}`}>
      <div className="card bg-neutral text-neutral-content w-72 shadow-xl my-4">
        <figure className="w-full h-36">
          <Image
            alt={apartment.streetAddress}
            src={apartment.coverImageId ?? 'pongo'}
            width="300"
            height="150"
            crop={{
              type: 'fill',
            }}
          />
        </figure>
        <div className="card-body p-4">
          <h2 className="card-title">{apartment.streetAddress}</h2>
          <div>{apartment.title}</div>
          <div className="h-6 overflow-hidden text-nowrap text-ellipsis"> {apartment.description}</div>
        </div>
      </div>
    </Link>
  );
}
