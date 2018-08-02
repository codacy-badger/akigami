import mongoose from 'mongoose';
import classToSchema from './classToSchema';

class MongooseSchema {
  static Types = mongoose.Schema.Types;
  plugins = [];
  static model(...args) {
    return mongoose.model(args);
  }
  static schema() {
    return mongoose.model(this.name, classToSchema(new this()));
  }
}

export default MongooseSchema;
