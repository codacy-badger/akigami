import mongoose from 'mongoose';
import omit from 'lodash/omit';

const User = mongoose.model('User');
const Post = mongoose.model('Post');

export default (socket) => {
    socket.on('feed:create', async (data, callback) => {
        socket.utils.check('user');
        if (!data.userId) throw new Error('User not submitted');

        const props = {
            ...data,
            user: socket.request.user.id,
        };
        const post = new Post(props);
        await post.save();

        await post.populateUser();
        callback(post);
    });
};
