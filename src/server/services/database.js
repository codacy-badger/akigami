import mongoose from 'mongoose';
import cfg from 'config';
import debugNamespace from 'debug';
import autoIncrement from '../utils/mongooseAutoIncrement';

import { requireFiles } from '../utils';

mongoose.Promise = global.Promise;

const debug = debugNamespace('akigami:server:db');
const { options, host } = cfg.get('database');
const connection = mongoose.connect(
  `mongodb://${host}`,
  options,
);

autoIncrement.initialize(connection);

mongoose.connection.on('connected', () => debug('Connected to DB'));
mongoose.connection.on('error', () => debug('DB error connection'));
mongoose.connection.on('disconnected', () => debug('Disconnected from DB'));

requireFiles('models');
