import MongooseClass from '../utils/mongooseClass';

class PeopleRelation extends MongooseClass {
  type = {
    type: String,
    required: true,
    enum: ['producer', 'seiyuu', 'artist', 'author'],
  };
  people = { type: Number, required: true };
  character = { type: Number };
  characterRole = {
    type: String,
    enum: ['main', 'support'],
  };
  characterLang = {
    type: String,
    enum: ['japanese', 'english', 'russian'],
  };
  entity = { type: Number, required: true };
}

export default PeopleRelation.schema();
