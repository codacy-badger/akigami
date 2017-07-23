import MongooseClass from '../utils/mongooseClass';

class News extends MongooseClass {
    title: { type: String, required: true };
    content: {
        bbcode: { type: String },
        plain: { type: String },
        raw: { type: String },
    };
    image: {
        small: { type: String },
        medium: { type: String },
        large: { type: String },
        original: { type: String },
    };
    author: { type: Number, required: true };
    category: [Number];
    relate: { type: Number };
}

export default News.schema();
