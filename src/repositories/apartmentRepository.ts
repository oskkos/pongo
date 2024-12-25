import { PrismaClient } from '@prisma/client';

import { Apartment } from '@/models';

const prisma = new PrismaClient();

export async function getAllApartments(): Promise<Apartment[]> {
  return prisma.apartment.findMany();
}
