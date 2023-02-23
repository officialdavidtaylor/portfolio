import { z } from 'zod';

const envSchema = z.object({
  NOTION_AUTH_TOKEN: z.string(),
  NOTION_PROJECTS_DATABASE_ID: z.string(),
});

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}
