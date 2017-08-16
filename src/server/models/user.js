import MongooseClass from '../utils/mongooseClass';

class User extends MongooseClass {
    username = { type: String, required: true };
    displayName = { type: String, required: true };
    email = { type: String, required: true };
    birthday = { type: Date };
    avatar = { type: String };
    cover = { type: String };
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


    static async findById(id) {
        const user = await this.model('User').findOne({ id });
        if (!user) throw new Error('User not found');
        return user;
    }
}

export default User.schema();
