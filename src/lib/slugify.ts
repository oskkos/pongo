import crypto from 'crypto';
import slugify from 'slugify';

export function generateSlug(input: string): string {
  const randomString = crypto.randomBytes(3).toString('hex').slice(0, 5);
  return slugify(`${input}-${randomString}`, { lower: true });
}
export function transformToSlug(input: string): string {
  return slugify(input, { lower: true });
}
