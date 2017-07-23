import MongooseClass from '../utils/mongooseClass';

class Genre extends MongooseClass {
    title: { type: String, required: true };
}

export default Genre.schema();
