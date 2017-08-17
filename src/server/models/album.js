import MongooseClass from '../utils/mongooseClass';

class Album extends MongooseClass {
    title = { type: String, required: true };
    cover = {
        small: { type: String },
        medium: { type: String },
        large: { type: String },
        original: { type: String },
    };
}

export default Album.schema();
