import MongooseClass from '../utils/mongooseClass';

class Review extends MongooseClass {
  title = { type: String, required: true };
  content = { type: String, required: true };
  user = { type: Number, required: true };
}

export default Review.schema();
