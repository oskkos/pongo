import Image from 'next/image';

export default function Home() {
  return (
    <main>
      <div>
        <h1>Welcome to Pongo!</h1>
        <Image src="/pongo.svg" alt="Pongo" width={256} height={256} priority />
      </div>
    </main>
  );
}
