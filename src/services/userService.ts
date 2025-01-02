import { User } from '@prisma/client';

import * as userRepository from '@/repositories/userRepository';

export function upsertUser(user: Omit<User, 'id' | 'createdAt' | 'modifiedAt'>) {
  return userRepository.upsertUser(user);
}
