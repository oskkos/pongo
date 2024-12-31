import { prisma } from 'prisma/prisma';

export async function getAllTenants() {
  return prisma.tenant.findMany({
    orderBy: { tenantFrom: 'desc' },
    include: { apartment: { select: { slug: true, streetAddress: true } } },
  });
}
