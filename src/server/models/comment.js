import autoIncrement from 'mongoose-auto-increment';
import MongooseClass from '../utils/mongooseClass';

class Comment extends MongooseClass {
    user = { type: MongooseClass.Types.Mixed, required: true };
    content = { type: String, required: true };
    attachments = [Number];
    post = { type: Number, required: true }
    reply = { type: Number }
    createdAt = {
        type: Date,
        default: Date.now,
    }

    async populateUser() {
        const user = await this.model('User').findById(this.user);
        this.user = user;
    }

    plugins = [
        [
            autoIncrement.plugin, {
                model: 'Comment',
                startAt: 1,
                field: 'id',
            },
        ],
    ];
}

export default Comment.schema();
