import MongooseClass from '../utils/mongooseClass';

class Followers extends MongooseClass {
  follower = { type: Number, required: true };
  followee = { type: Number, required: true };
}

export default Followers.schema();
