import { Apartment } from '@prisma/client';

import Image from '@/components/image';

export default function ApartmentCard({ apartment }: { apartment: Apartment }) {
  return (
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
  );
}

/*
      src="jg8db3klrfrjh3xxrsk4" // Use this sample image or upload your own via the Media Explorer
      width="500" // Transform the image: auto-crop to square aspect_ratio
      height="500"
      crop={{
        type: 'auto',
        source: true,
      }}
      alt="Sample image"

*/
