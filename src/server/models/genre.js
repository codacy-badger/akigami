import MongooseClass from '../utils/mongooseClass';
import autoIncrement from '../utils/mongooseAutoIncrement';

class Genre extends MongooseClass {
  title = { type: String, required: true };

  plugins = [
    [
      autoIncrement.plugin,
      {
        model: 'Genre',
        startAt: 1,
        field: 'id',
      },
    ],
  ];
}

export default Genre.schema();
