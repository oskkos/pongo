import { MdOutlineAdd } from 'react-icons/md';

import { getAllApartments } from '@/actions';
import ApartmentCard from '@/components/apartmentCard';

export default async function Home() {
  const apartments = await getAllApartments();
  return (
    <main>
      <div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
          {apartments.map((apartment) => {
            return <ApartmentCard key={apartment.id} apartment={apartment} />;
          })}
        </div>
      </div>

      <div className="toast mb-16 md:mb-0">
        <div className="dropdown dropdown-top dropdown-end">
          <label tabIndex={0} className="btn btn-primary btn-circle">
            <MdOutlineAdd size={30} />
          </label>
        </div>
      </div>
    </main>
  );
}
