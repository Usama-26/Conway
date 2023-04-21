export const BCRYPT_SALT_ROUND = process.env.SALT_ROUND
  ? Number(process.env.SALT_ROUND)
  : 10;

export const TOKEN_EXPIRED = 'Token expired.';
