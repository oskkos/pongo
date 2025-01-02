import 'server-only';

import { Tenant } from '@prisma/client';
import { prisma } from 'prisma/prisma';

import { getUserIdFromSession } from '@/auth';

export async function getAllTenants() {
  const userId = await getUserIdFromSession();

  return prisma.tenant.findMany({
    where: { apartment: { userId } },
    orderBy: { tenantFrom: 'desc' },
    include: { apartment: { select: { slug: true, streetAddress: true } } },
  });
}
export async function getTenantBySlug(slug: string) {
  const userId = await getUserIdFromSession();

  return prisma.tenant.findUnique({
    where: { apartment: { userId }, slug },
  });
}
export function addNewTenant(data: Omit<Tenant, 'id' | 'createdAt' | 'modifiedAt'>) {
  return prisma.tenant.create({
    data,
  });
}
export function updateTenant(slug: string, data: Partial<Tenant>) {
  return prisma.tenant.update({
    where: { slug },
    data,
  });
}
