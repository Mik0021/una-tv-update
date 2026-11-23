import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';
import { environment } from './environments/environment';

// Build output: <site>/browser (static files) and <site>/server/server.mjs.
const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();

/**
 * Allowed hosts come from `security.allowedHosts` in angular.json (or the
 * NG_ALLOWED_HOSTS environment variable). Requests for any other Host fall back
 * to client-side rendering.
 *
 * TLS terminates at the reverse proxy, so trust the scheme and host it forwards.
 * Without this, server-rendered canonical/og:url tags (built from
 * `document.location`) would use `http://` and the internal host. The proxy
 * must set/overwrite these headers; a spoofed host is still checked against
 * allowedHosts.
 */
const angularApp = new AngularNodeAppEngine({
  trustProxyHeaders: ['x-forwarded-proto', 'x-forwarded-host'],
});

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point, or it is run via PM2.
 * The port comes from the site environment (APP_PORT), then PORT, then 4000.
 */
if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = environment.APP_PORT || process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build).
 */
export const reqHandler = createNodeRequestHandler(app);
