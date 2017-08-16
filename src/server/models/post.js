import MongooseClass from '../utils/mongooseClass';

class Post extends MongooseClass {
    user: { type: Number, required: true };
    content: { type: String, required: true };
    likes: [Number];
    repost: [Number];
    attachments: [{
        type: {
            type: String,
            required: true,
            enum: ['image', 'other'],
        },
        url: { type: String, required: true },
        title: { type: String },
    }];
    type: {
        type: String,
        default: 'post',
        enum: ['post', 'comment'],
    };

    async populateUser() {
        const user = await this.model('User').findById(this.user);
        this.user = user;
    }
}

export default Post.schema();
