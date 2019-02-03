import MongooseClass from '../utils/mongooseClass';
import autoIncrement from '../utils/mongooseAutoIncrement';

class Studio extends MongooseClass {
  title = { type: String, required: true };

  image = {
    small: { type: String },
    medium: { type: String },
    large: { type: String },
    original: { type: String },
  };

  about = { type: String };

  createdAt = { type: Date };

  plugins = [
    [
      autoIncrement.plugin,
      {
        model: 'Studio',
        startAt: 1,
        field: 'id',
      },
    ],
  ];
}

export default Studio.schema();
