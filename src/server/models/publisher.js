import MongooseClass from '../utils/mongooseClass';

class Publisher extends MongooseClass {
  title = { type: String, required: true };
}

export default Publisher.schema();
