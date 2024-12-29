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
export function addNewApartment(data: Omit<Apartment, 'id' | 'createdAt' | 'modifiedAt' | 'coverImageId'>) {
  return prisma.apartment.create({
    data,
  });
}
export function updateApartment(slug: string, data: Partial<Apartment>) {
  return prisma.apartment.update({
    where: { slug },
    data,
  });
}
