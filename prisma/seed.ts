import slugify from 'slugify';

import { prisma } from './prisma';

async function main() {
  const users = [];
  for (let i = 1; i <= 5; i++) {
    const user = await prisma.user.create({
      data: {
        email: `user${i}_${new Date().getTime()}@google.com`,
        name: `User ${i}`,
      },
    });
    users.push(user);
  }
  for (let i = 1; i <= 5; i++) {
    await prisma.apartment.create({
      data: {
        apartmentSize: 100 + i,
        description: `Apartment ${i} description`,
        postalCode: `1234${i}`,
        postOffice: `Post Office ${i}`,
        streetAddress: `Street Address ${i}`,
        title: `Apartment ${i}`,
        slug: slugify(`Streaet Äddress ${i}`, { lower: true }),
        userId: users[i - 1]?.id ?? '',
        tenants: {
          create: Array.from({ length: 5 }, (_, j) => ({
            personId: `person${i}${j}`,
            phoneNumber: `123-456-789${j}`,
            tenantFrom: new Date(),
            tenantTo: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
            email: `tenant${i}${j}@example.com`,
            firstName: `FirstName${i}${j}`,
            lastName: `LastName${i}${j}`,
            slug: slugify(`FirstName${i}${j} LastName${i}${j}`, { lower: true }),
          })),
        },
      },
    });
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
