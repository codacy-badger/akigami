import MongooseClass from '../utils/mongooseClass';

class Manga extends MongooseClass {
    title: {
        russian: { type: String },
        romaji: { type: String },
        english: { type: String },
    };
    descriptopn: {
        russian: { type: String },
        english: { type: String },
    };
    type: {
        type: String,
        required: true,
        enum: ['tv', 'movie', 'ova', 'ona', 'special'],
    };
    volumes: { type: Number };
    chapters: { type: Number };
    status: {
        type: String,
        default: 'not yet published',
        enum: ['not yet published', 'publishing', 'published'],
    };
    publishing: {
        start: { type: Date },
        finish: { type: Date },
    };
    season: {
        type: String,
        required: true,
        enum: ['winter', 'spring', 'summer', 'fall'],
    };
    genres: [Number];
    duration: { type: Number };
    rating: {
        type: String,
        default: 'g',
        enum: ['g', 'pg', 'pg-13', 'r', 'rplus', 'rx'],
    };
    stats: {
        score: { type: Number },
        ranked: { type: Number },
        members: { type: Number },
    };
    poster: {
        small: { type: String },
        medium: { type: String },
        large: { type: String },
        original: { type: String },
    };
    externalLinks: [{
        title: { type: String, required: true },
        url: { type: String, required: true },
        type: {
            type: String,
            required: true,
            enum: ['mal', 'shiki', 'oficial', 'other'],
        },
    }];
}

export default Manga.schema();
