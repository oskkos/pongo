import 'server-only';

import { Apartment } from '@prisma/client';
import { prisma } from 'prisma/prisma';

import { getUserIdFromSession } from '@/auth';

export async function getAllApartments() {
  const userId = await getUserIdFromSession();
  return prisma.apartment.findMany({
    where: { userId },
    orderBy: { streetAddress: 'asc' },
  });
}
export async function getApartmentBySlug(slug: string) {
  const userId = await getUserIdFromSession();
  return prisma.apartment.findUnique({
    where: { slug, userId },
    include: { tenants: true },
  });
}
export async function addNewApartment(data: Omit<Apartment, 'id' | 'createdAt' | 'modifiedAt' | 'coverImageId'>) {
  const userIdFromSession = await getUserIdFromSession();
  if (data.userId !== userIdFromSession) {
    throw new Error('Unauthorized');
  }
  return prisma.apartment.create({
    data,
  });
}
export async function updateApartment(slug: string, data: Partial<Apartment>) {
  const userIdFromSession = await getUserIdFromSession();
  if (data.userId !== userIdFromSession) {
    throw new Error('Unauthorized');
  }
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
