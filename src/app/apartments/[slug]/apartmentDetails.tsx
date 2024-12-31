import { Apartment } from '@prisma/client';

import EditApartmentModal, { EditApartmentModalButton } from './editApartmentModal';

export default function ApartmentDetails({ apartment }: { apartment: Apartment }) {
  return (
    <div className="absolute top-0 left-0 bg-base-300 text-base-content opacity-75 max-w-prose p-3 m-3 md:p-4 md:m-4 rounded-lg shadow-xl">
      <div className="inline-flex justify-between items-end w-full">
        <div className="text-xl md:text-2xl font-bold">{apartment.streetAddress}</div>
        <div className="pl-8 pr-0">
          <EditApartmentModalButton slug={apartment.slug} />
        </div>
      </div>
      <div className="text-sm md:text-lg">
        {apartment.postalCode} {apartment.postOffice}
      </div>
      <div className="text-sm md:text-base">
        {apartment.title}, {apartment.apartmentSize}m<sup>2</sup>
      </div>
      <div className="divider m-0 md:m-4" />
      <div className="text-xs md:text-sm italic overflow-auto max-h-16 md:max-h-32 lg:max-h-40 xl:max-h-48 2xl:max-h-64">
        {apartment.description}
      </div>
      <EditApartmentModal apartment={apartment} />
    </div>
  );
}
