import { Apartment } from '@prisma/client';
import Link from 'next/link';

import Image from '@/components/image';

export default function ApartmentCard({ apartment }: { apartment: Apartment }) {
  return (
    <Link href={`/apartments/${apartment.slug}`}>
      <div className="card bg-neutral text-neutral-content w-72 shadow-xl my-4">
        <figure className="w-full h-36">
          <Image
            alt="sample"
            src="sample"
            width="300"
            height="150"
            crop={{
              type: 'auto',
            }}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{apartment.streetAddress}</h2>
          <p>
            {apartment.title}
            <br /> {apartment.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
