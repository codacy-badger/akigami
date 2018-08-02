import MongooseClass from '../utils/mongooseClass';

class ReviewRelation extends MongooseClass {
  review = { type: Number, required: true };
  entity = { type: Number, required: true };
}

export default ReviewRelation.schema();
