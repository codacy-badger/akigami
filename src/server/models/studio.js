import MongooseClass from '../utils/mongooseClass';

class Studio extends MongooseClass {
    title: { type: String, required: true };
}

export default Studio.schema();
