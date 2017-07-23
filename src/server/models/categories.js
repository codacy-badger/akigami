import MongooseClass from '../utils/mongooseClass';

class Categories extends MongooseClass {
    title: { type: String, required: true };
}

export default Categories.schema();
