import { AdminJSOptions } from 'adminjs';

import componentLoader from './component-loader.ts';

const options: AdminJSOptions = {
  componentLoader,
  rootPath: '/',
  resources: [],
  databases: [],
};

export default options;
