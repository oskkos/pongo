import Image from 'next/image';

import { getAllApartments } from '@/actions';

export default async function Home() {
  const apartments = await getAllApartments();
  return (
    <main>
      <div>
        <h1>Welcome to Pongo!</h1>
        <Image src="/pongo.svg" alt="Pongo" width={256} height={256} priority />
        {apartments.map((apartment) => {
          return (
            <div key={apartment.id}>
              <h2>{apartment.slug}</h2>
              <p>{apartment.description}</p>
              <div>
                {apartment.tenants.map((t) => {
                  return (
                    <div key={t.id}>
                      <small>{t.firstName}</small>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
