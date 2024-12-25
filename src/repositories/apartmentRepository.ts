import 'server-only';

import { prisma } from 'prisma/prisma';

import { Apartment } from '@/models';

export function getAllApartments(): Promise<Apartment[]> {
  return prisma.apartment.findMany({
    include: {
      tenants: true,
    },
  });
}
