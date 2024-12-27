import 'server-only';

import { Apartment } from '@prisma/client';
import { prisma } from 'prisma/prisma';

export function getAllApartments() {
  return prisma.apartment.findMany({
    include: {
      tenants: true,
    },
  });
}
export function addNewApartment(data: Omit<Apartment, 'id' | 'createdAt' | 'modifiedAt'>) {
  return prisma.apartment.create({
    data,
  });
}
