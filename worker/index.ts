import { Hono } from 'hono';
import characterClickApp from './api/character_click';
import enterLogApp from './api/enter';
import markerFoundApp from './api/marker_found';

const app = new Hono();

app.route('/enter', enterLogApp);
app.route('/marker_found', markerFoundApp);
app.route('/character_click', characterClickApp);

export default app;
