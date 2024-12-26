import 'server-only';

import { prisma } from 'prisma/prisma';

export function getAllApartments() {
  return prisma.apartment.findMany({
    include: {
      tenants: true,
    },
  });
}
