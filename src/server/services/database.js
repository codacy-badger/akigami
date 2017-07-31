import mongoose from 'mongoose';
import cfg from 'config';

import { requireFiles } from '../utils';

mongoose.Promise = global.Promise;

const { options, host } = cfg.get('database');
mongoose.connect(`mongodb://${host}`, options);

mongoose.connection.on('connected', () => console.log('Connected to DB'));
mongoose.connection.on('error', () => console.log('DB error connection'));
mongoose.connection.on('disconnected', () => console.log('Disconnected from DB'));

requireFiles('models');
