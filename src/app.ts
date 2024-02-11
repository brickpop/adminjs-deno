import express from 'npm:express';
import AdminJS from 'npm:adminjs';
import { buildAuthenticatedRouter } from 'npm:@adminjs/express';

import provider from './admin/auth-provider.ts';
import options from './admin/options.ts';
import initializeDb from './db/index.ts';
import { PORT, COOKIE_SECRET } from './constants.ts';
// import { NODE_ENV } from './constants.ts';

const start = async () => {
  const app = express();

  await initializeDb();

  const admin = new AdminJS(options);

  // if (NODE_ENV === 'production') {
  await admin.initialize();
  // } else {
  //   admin.watch();
  // }

  const router = buildAuthenticatedRouter(
    admin,
    {
      cookiePassword: COOKIE_SECRET,
      cookieName: 'adminjs',
      provider,
    },
    null,
    {
      secret: COOKIE_SECRET,
      saveUninitialized: true,
      resave: true,
    }
  );

  app.use(admin.options.rootPath, router);

  app.listen(PORT, () => {
    console.log(`App available at http://localhost:${PORT}${admin.options.rootPath}`);
  });
};

start();
