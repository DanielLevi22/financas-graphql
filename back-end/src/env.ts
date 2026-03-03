import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  PORT: z.string().optional().default('4000'),
  JWT_SECRET: z.string().min(1, 'JWT_SECRET must be provided in the environment variables'),
});

export const env = envSchema.parse(process.env);
