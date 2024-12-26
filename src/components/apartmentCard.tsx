import { Apartment } from '@prisma/client';
import { MdHouse } from 'react-icons/md';

export default function ApartmentCard({ apartment }: { apartment: Apartment }) {
  return (
    <div className="card bg-neutral text-neutral-content w-96 shadow-xl my-4">
      <figure className="w-96 h-36">
        <MdHouse size={84} />
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
