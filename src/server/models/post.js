import autoIncrement from '../utils/mongooseAutoIncrement';
import MongooseClass from '../utils/mongooseClass';

class Post extends MongooseClass {
  user = { type: MongooseClass.Types.Mixed, required: true };
  content = { type: String, required: true };
  attachments = [Number];
  namespace = {
    type: String,
    default: 'global',
    enum: ['global', 'followers', 'clubs'],
  };
  createdAt = {
    type: Date,
    default: Date.now,
  };

  deleted = {
    deleted: {
      type: Boolean,
    },
    time: {
      type: Date,
    },
  };

  async populateUser() {
    const user = await this.model('User').findById(this.user);
    this.user = user;
  }

  static async getByUserId(user) {
    const posts = await this.model('Post')
      .find({ user, deleted: null })
      .sort({ createdAt: -1 });
    await Promise.all(posts.map(async post => {
      await post.populateUser();
    }));
    return posts;
  }

  plugins = [
    [
      autoIncrement.plugin,
      {
        model: 'Post',
        startAt: 1,
        field: 'id',
      },
    ],
  ];
}

export default Post.schema();
