import mongoose from 'mongoose';
import io from '../../services/websockets';

const Post = mongoose.model('Post');

export default (socket) => {
    socket.on('feed:create', async (data, callback) => {
        socket.utils.check('user');
        const props = {
            ...data,
            user: socket.request.user.id,
        };
        const post = new Post(props);
        await post.save();

        await post.populateUser();

        io.sockets.emit('feed:getOnce', post);
        io.sockets.emit(`feed:getOnceUser-${socket.request.user.id}`, post);

        callback(post);
    });

    socket.on('feed:getByUser', async (data, callback) => {
        const posts = await Post.getByUserId(data.id);
        callback(posts);
    });
};
