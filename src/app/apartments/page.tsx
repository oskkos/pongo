import { getAllApartments } from '@/actions';
import ApartmentCard from '@/components/apartmentCard';
import AddNewApartmentBtn from './addNewApartmentBtn';

export default async function Apartments() {
  const apartments = await getAllApartments();
  return (
    <main>
      <div>
        <AddNewApartmentBtn />
      </div>
      <div className="inline-flex flex-wrap gap-4 items-center justify-center md:justify-start">
        {apartments.map((apartment) => {
          return <ApartmentCard key={apartment.id} apartment={apartment} />;
        })}
      </div>
    </main>
  );
}
