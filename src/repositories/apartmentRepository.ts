import { prisma } from 'prisma/prisma';

import { Apartment } from '@/models';

export async function getAllApartments(): Promise<Apartment[]> {
  return prisma.apartment.findMany();
}
