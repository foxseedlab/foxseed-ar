import { Hono } from 'hono';

const app = new Hono();

app.get('/foo', (c) => c.json({ message: 'Hello World' }));

export default app;
