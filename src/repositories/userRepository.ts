import { User } from '@prisma/client';
import { prisma } from 'prisma/prisma';

export async function upsertUser(user: Omit<User, 'id' | 'createdAt' | 'modifiedAt'>) {
  const dbUser = await prisma.user.findUnique({ where: { email: user.email } });

  if (dbUser) {
    return prisma.user.update({
      where: { id: dbUser.id },
      data: user,
    });
  }

  return prisma.user.create({
    data: user,
  });
}
