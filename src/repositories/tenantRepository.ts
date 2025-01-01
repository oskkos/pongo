import { Tenant } from '@prisma/client';
import { prisma } from 'prisma/prisma';

export async function getAllTenants() {
  return prisma.tenant.findMany({
    orderBy: { tenantFrom: 'desc' },
    include: { apartment: { select: { slug: true, streetAddress: true } } },
  });
}
export function getTenantBySlug(slug: string) {
  return prisma.tenant.findUnique({
    where: { slug },
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
