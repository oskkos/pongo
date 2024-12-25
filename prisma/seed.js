import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  for (let i = 1; i <= 5; i++) {
    const apartment = await prisma.apartment.create({
      data: {
        apartmentSize: 100 + i,
        description: `Apartment ${i} description`,
        postalCode: `1234${i}`,
        postOffice: `Post Office ${i}`,
        streetAddress: `Street Address ${i}`,
        title: `Apartment ${i}`,
        tenants: {
          create: Array.from({ length: 5 }, (_, j) => ({
            personId: `person${i}${j}`,
            phoneNumber: `123-456-789${j}`,
            tenantFrom: new Date(),
            tenantTo: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
            deposit: 1000 + j * 100,
            depositPaid: j % 2 === 0,
            depositReturned: j % 3 === 0,
            email: `tenant${i}${j}@example.com`,
            firstName: `FirstName${i}${j}`,
            lastName: `LastName${i}${j}`,
          })),
        },
      },
    });
    console.log(`Created apartment with id: ${apartment.id}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
