import mongoose from 'mongoose';
import config from 'config';

import { requireFiles } from '../utils';

mongoose.Promise = global.Promise;

mongoose.connect(`mongodb://${config.get('database.host')}`, config.get('database.options'));

mongoose.connection.on('connected', () => console.log('Connected to DB'));
mongoose.connection.on('error', () => console.log('DB error connection'));
mongoose.connection.on('disconnected', () => console.log('Disconnected from DB'));

requireFiles('models');
