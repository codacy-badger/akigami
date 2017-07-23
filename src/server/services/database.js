import mongoose from 'mongoose';
import cfg from 'config';

import { requireFiles } from '../utils';

mongoose.Promise = global.Promise;

const { config, host } = cfg.get('database');
mongoose.connect(`mongodb://${host}`, { config });

mongoose.connection.on('connected', () => console.log('Connected to DB'));
mongoose.connection.on('error', () => console.log('DB error connection'));
mongoose.connection.on('disconnected', () => console.log('Disconnected from DB'));

requireFiles('models');
