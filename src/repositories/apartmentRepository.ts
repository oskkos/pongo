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
    include: { tenants: true },
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

export async function getApartmentsForSelect() {
  const apartments = await getAllApartments();
  return apartments.map((apartment) => ({
    streetAddress: apartment.streetAddress,
    id: apartment.id,
  }));
}
