import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
 
export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    GOOGLE_ID: z.string().min(1),
    GOOGLE_SECRET: z.string().min(1),
  },
  client: {},
  experimental__runtimeEnv: {},
});
