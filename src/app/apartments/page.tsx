import { getAllApartments } from '@/actions';
import ApartmentCard from '@/components/apartmentCard';
import AddNewApartmentBtn from './addNewApartmentBtn';

export default async function Apartments() {
  const apartments = await getAllApartments();
  return (
    <main>
      <div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
          <AddNewApartmentBtn />
          {apartments.map((apartment) => {
            return <ApartmentCard key={apartment.id} apartment={apartment} />;
          })}
        </div>
      </div>
    </main>
  );
}
