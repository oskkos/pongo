import * as userRepository from '@/repositories/userRepository';

export function upsertUser(user: { email: string; name: string; image: string | null }) {
  return userRepository.upsertUser(user);
}
