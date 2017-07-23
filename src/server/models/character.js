import MongooseClass from '../utils/mongooseClass';

class Character extends MongooseClass {
    firstName: {
        russian: { type: String },
        romaji: { type: String },
        japanese: { type: String },
    };
    lastName: {
        russian: { type: String },
        romaji: { type: String },
        japanese: { type: String },
    };
    photo: {
        small: { type: String },
        medium: { type: String },
        large: { type: String },
        original: { type: String },
    };
    biography: {
        russian: { type: String },
        english: { type: String },
    };
    stats: {
        favorites: { type: Number, default: 0 },
    };
    altNames: [Number];
}

export default Character.schema();
