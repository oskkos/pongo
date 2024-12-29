import { Apartment } from '@prisma/client';
import { MdEdit } from 'react-icons/md';

export default function ApartmentDetails({ apartment }: { apartment: Apartment }) {
  return (
    <div className="absolute top-0 left-0 bg-base-300 text-base-content opacity-50 p-4 m-4 rounded-lg shadow-xl">
      <div className="inline-flex justify-between items-end w-full">
        <div className="text-xl md:text-2xl font-bold">{apartment.streetAddress}</div>
        <div className="pl-8 pr-0">
          <button className="btn btn-circle btn-ghost btn-sm">
            <MdEdit />
          </button>
        </div>
      </div>
      <div className="text-sm md:text-lg">
        {apartment.postalCode} {apartment.postOffice}
      </div>
      <div className="text-sm md:text-base">
        {apartment.title}, {apartment.apartmentSize}m<sup>2</sup>
      </div>
      <div className="divider m-1 md:m-4" />
      <div className="text-xs md:text-sm italic overflow-auto max-h-16 md:max-h-32 lg:max-h-48 xl:max-h-64 2xl:max-h-80">
        {apartment.description}
      </div>
    </div>
  );
}
