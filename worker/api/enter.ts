import { Hono } from 'hono';
import { drizzle } from 'drizzle-orm/d1';
import { enterLogs } from '../../src/db/schema';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>();

const schema = z.object({
  guestName: z.string().min(1, 'guest name is required'),
  deviceInnerWidth: z
    .number()
    .int()
    .positive('device inner width must be a positive integer'),
  deviceInnerHeight: z
    .number()
    .int()
    .positive('device inner height must be a positive integer'),
  userAgent: z.string().min(1, 'user agent is required'),
});

app.post('/', zValidator('json', schema), async (c) => {
  const params = c.req.valid('json');
  const db = drizzle(c.env.DB);

  const result = await db.insert(enterLogs).values({
    guestName: params.guestName,
    deviceInnerWidth: params.deviceInnerWidth,
    deviceInnerHeight: params.deviceInnerHeight,
    userAgent: params.userAgent,
  });

  return c.json(result);
});

export default app;
