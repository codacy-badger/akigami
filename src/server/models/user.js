import MongooseClass from '../utils/mongooseClass';

class User extends MongooseClass {
    username = { type: String, required: true };
    displayName = { type: String, required: true };
    email = { type: String, required: true };
    birthday = { type: Date };
    avatar = { type: String };
    status = { type: String };
    online = { type: Boolean, default: false };
    gender = {
        type: String,
        default: 'none',
        enum: ['none', 'male', 'female'],
    };
    favorites = [{
        type: {
            type: String,
            required: true,
            enum: ['anime', 'manga', 'novel', 'character', 'people', 'track'],
        },
        entity: {
            type: Number,
            required: true,
        },
    }];
    createdAt = { type: Date, default: Date.now() };
    visitedAt = { type: Date, default: Date.now() };
}

export default User.schema();
