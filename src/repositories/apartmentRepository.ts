import 'server-only';

import { Apartment } from '@prisma/client';
import { prisma } from 'prisma/prisma';

export function getAllApartments() {
  return prisma.apartment.findMany({
    orderBy: { streetAddress: 'asc' },
  });
}
export function getApartmentBySlug(slug: string) {
  return prisma.apartment.findUnique({
    where: { slug },
  });
}
export function addNewApartment(data: Omit<Apartment, 'id' | 'createdAt' | 'modifiedAt'>) {
  return prisma.apartment.create({
    data,
  });
}
