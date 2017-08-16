import mongoose from 'mongoose';
import omit from 'lodash/omit';

const User = mongoose.model('User');
const Post = mongoose.model('Post');

export default (socket) => {
    socket.on('feed:create', async (data, callback) => {
        if (!data.userId) throw new Error('User not submitted');
        const user = await User.findById(data.userId);

        const props = {
            ...omit(data, 'userId'),
            user: user.id,
        };
        const post = new Post(props);
        await post.save();

        await post.populateUser();
        callback(post);
    });
};
