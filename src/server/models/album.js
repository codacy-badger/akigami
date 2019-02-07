import MongooseClass from '../utils/mongooseClass';

class Album extends MongooseClass {
  title = { type: String, required: true };

  cover = { type: String }
}

export default Album.schema();
