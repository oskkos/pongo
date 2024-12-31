import { getAllApartments } from '@/actions';
import AddNewBtn from '@/components/addNewBtn';
import ApartmentCard from '@/components/apartmentCard';
import { i18n } from '@/lib/i18n';

export default async function Apartments() {
  const apartments = await getAllApartments();
  return (
    <main>
      <div>
        <AddNewBtn label={i18n.AddNewApartment} path="/apartments/add" />
      </div>
      <div className="inline-flex flex-wrap gap-4 items-center justify-center md:justify-start">
        {apartments.map((apartment) => {
          return <ApartmentCard key={apartment.id} apartment={apartment} />;
        })}
      </div>
    </main>
  );
}
