import Image from 'next/image';

import { getAllApartments } from '@/actions';
import ApartmentCard from '@/components/apartmentCard';

export default async function Home() {
  const apartments = await getAllApartments();
  return (
    <main>
      <div>
        <h1 className="text-3xl font-bold underline">Welcome to Pongo!</h1>
        <Image src="/pongo.svg" alt="Pongo" width={256} height={256} priority />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
          {apartments.map((apartment) => {
            return <ApartmentCard key={apartment.id} apartment={apartment} />;
          })}
        </div>
      </div>
    </main>
  );
}
