import MongooseClass from '../utils/mongooseClass';

class Track extends MongooseClass {
  title = { type: String, required: true };
  duration = { type: Number, required: true };
  type = {
    type: String,
    required: true,
    enum: ['op', 'ed', 'ost', 'theme', 'other'],
  };
}

export default Track.schema();
