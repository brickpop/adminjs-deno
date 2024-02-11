import mongoose from 'mongoose';
import { Database, Resource } from '@adminjs/mongoose';
import AdminJS from 'adminjs';
import { DATABASE_URI } from '../constants.ts';

AdminJS.registerAdapter({ Database, Resource });

const initialize = async () => {
  const db = await mongoose.connect(DATABASE_URI);

  return { db };
};

export default initialize;
