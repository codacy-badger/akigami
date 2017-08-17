import autoIncrement from 'mongoose-auto-increment';
import MongooseClass from '../utils/mongooseClass';

class Post extends MongooseClass {
    user = { type: MongooseClass.Types.Mixed, required: true };
    content = { type: String, required: true };
    likes = [Number];
    repost = [Number];
    attachments = [{
        type: {
            type: String,
            required: true,
            enum: ['image', 'other'],
        },
        url: { type: String, required: true },
        title: { type: String },
    }];
    type = {
        type: String,
        default: 'post',
        enum: ['post', 'comment'],
    };
    createdAt = {
        type: Date,
        default: Date.now(),
    }

    async populateUser() {
        const user = await this.model('User').findById(this.user);
        this.user = user;
    }

    static async getByUserId(user) {
        const posts = await this.model('Post').find({ user }).sort({ createdAt: -1 });
        await Promise.all(posts.map(async (post) => {
            await post.populateUser();
        }));
        return posts;
    }

    plugins = [
        [
            autoIncrement.plugin, {
                model: 'Post',
                startAt: 1,
                field: 'id',
            },
        ],
    ];
}

export default Post.schema();
