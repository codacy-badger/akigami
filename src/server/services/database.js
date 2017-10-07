import mongoose from 'mongoose';
import autoIncrement from '../utils/mongooseAutoIncrement';
import cfg from 'config';

import { requireFiles } from '../utils';

mongoose.Promise = global.Promise;

const { options, host } = cfg.get('database');
const connection = mongoose.connect(`mongodb://${host}`, options);

autoIncrement.initialize(connection);

mongoose.connection.on('connected', () => console.log('Connected to DB'));
mongoose.connection.on('error', () => console.log('DB error connection'));
mongoose.connection.on('disconnected', () => console.log('Disconnected from DB'));

requireFiles('models');
