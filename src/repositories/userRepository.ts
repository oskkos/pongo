import { prisma } from 'prisma/prisma';

export async function upsertUser(user: { email: string; name: string; image: string | null }) {
  const dbUser = await prisma.user.findUnique({ where: { email: user.email } });

  if (dbUser) {
    const isDifferent = user.name !== dbUser.name || user.image !== dbUser.image;
    if (!isDifferent) {
      return dbUser;
    }
    return prisma.user.update({
      where: { id: dbUser.id },
      data: user,
    });
  }

  return prisma.user.create({
    data: user,
  });
}
