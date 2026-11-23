/**
 * PM2 ecosystem example for the UNA TV SSR server.
 *
 * Copy to `ecosystem.config.js` on the server, adjust `cwd` (and `interpreter`
 * if Node is installed through nvm), then:
 *
 *   pm2 start ecosystem.config.js --only una-tv-rs        # production
 *   pm2 start ecosystem.config.js --only una-tv-rs-test   # test/staging
 *   pm2 save                                              # keep across reboots (after `pm2 startup`)
 *
 * Deploy: build with `npm run build:ssrsrbprod` (or `build:ssrsrb` for test)
 * and copy the whole `dist/` output (`browser/` + `server/`) into `cwd`.
 * The server serves static files from `../browser` relative to
 * `server/server.mjs`, so both folders must stay side by side.
 *
 * The port is NOT set here: it is compiled in from the environment file
 * (`APP_PORT`: 3080 for unasrprod, 3040 for unasr). `PORT` is only a fallback.
 *
 * Requires Node >= 22.22.
 */
module.exports = {
  apps: [
    {
      name: 'una-tv-rs',
      cwd: '/var/www/una-tv/rs', // contains browser/ and server/ from the unasrprod build
      script: 'server/server.mjs',
      // interpreter: '/home/<user>/.nvm/versions/node/v24.x.x/bin/node',
      exec_mode: 'fork',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      kill_timeout: 5000,
      time: true, // timestamp log lines
      env: {
        NODE_ENV: 'production',
        // Extra hosts beyond security.allowedHosts in angular.json (comma-separated).
        // Requests for any other Host / X-Forwarded-Host get HTTP 400.
        // NG_ALLOWED_HOSTS: 'example.com,*.example.com',
      },
    },
    {
      name: 'una-tv-rs-test',
      cwd: '/home/mik00/Projects/una-tv-portal-lat/dist', // contains browser/ and server/ from the unasr build
      script: 'server/server.mjs',
      // interpreter: '/home/<user>/.nvm/versions/node/v24.x.x/bin/node',
      exec_mode: 'fork',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      kill_timeout: 5000,
      time: true,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
