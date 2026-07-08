/**
 * server.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Custom Node.js server entry point for Namecheap cPanel (Phusion Passenger).
 *
 * Phusion Passenger expects the app to listen on the port passed via the
 * PORT environment variable (or 3000 as a fallback for local testing).
 *
 * This file is the "Application startup file" you set in cPanel's
 * "Setup Node.js App" interface.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/* eslint-disable @typescript-eslint/no-require-imports */
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOST || 'localhost';
const port = parseInt(process.env.PORT || '3000', 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  })
    .once('error', (err) => {
      console.error('Server startup error:', err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(
        `> Perbicubs Foundation ready on http://${hostname}:${port} [${dev ? 'development' : 'production'}]`
      );
    });
});
