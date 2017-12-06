import config from 'config';
import autoIncrement from '../utils/mongooseAutoIncrement';
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
    createdAt = { type: Date, default: Date.now() };
    visitedAt = { type: Date, default: Date.now() };


    static async findById(id) {
        const user = await this.model('User').findOne({ id });
        if (!user) throw new Error('User not found');
        return user;
    }

    plugins = [
        [
            autoIncrement.plugin, {
                model: 'User',
                startAt: 1,
                field: 'id',
            },
        ],
    ];

    pre = {
        init: (next, user) => {
            if (user.avatar) {
                user.avatar = `${config.get('cdn.address')}${user.avatar}`;
            }
            if (user.cover) {
                user.cover = `${config.get('cdn.address')}${user.cover}`;
            }
            next();
        },
    }
}

export default User.schema();
