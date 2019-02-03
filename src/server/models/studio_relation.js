import MongooseClass from '../utils/mongooseClass';

class StudioRelation extends MongooseClass {
  studio = { type: Number, required: true };

  anime = { type: Number, required: true };
}

export default StudioRelation.schema();
