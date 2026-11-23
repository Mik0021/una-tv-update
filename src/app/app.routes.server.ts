import { RenderMode, ServerRoute } from '@angular/ssr';

// Every page depends on live API data, so render everything per request.
// Not-found responses get their 404 status from NotFoundComponent (RESPONSE_INIT),
// which covers both `/404` and the `**` fallback.
export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
