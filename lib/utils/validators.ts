import { z } from 'zod';

export const passwordValidator =
  z.string()
    .min(6)
    .max(20)
    .nonempty();

export const emailValidator =
  z.string()
    .email()
    .nonempty();

export const usernameValidator =
  z.string()
    .regex(/^[a-zA-Z]/)
    .min(5)
    .max(20)
    .nonempty();
