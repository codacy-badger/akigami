import mongoose from 'mongoose';
import io from '../../services/websockets';

const Comment = mongoose.model('Comment');

export default socket => {
  socket.on('comment:create', async (data, callback) => {
    await socket.utils.check('user');
    const props = {
      ...data,
      user: socket.request.user.id,
    };
    const comment = new Comment(props);
    await comment.save();

    await comment.populateUser();

    io.sockets.emit(`comment:getOncePost-${data.post}`, comment);
    callback?.();
  });

  socket.on('comment:get', async ({ post }, callback) => {
    const comments = await Comment.find({ post });
    await Promise.all(comments.map(async comment => {
      await comment.populateUser();
    }));
    callback(comments);
  });

  socket.on('comment:edit', async ({ id, content, attachments }, callback) => {
    await socket.utils.check('user');
    const comment = await Comment.findOne({ id });
    if (!comment) throw new Error('Comment not found');
    if (comment.user !== socket.request.user.id) { throw new Error('Edit not permitted'); }

    const editedComment = {};

    if (content) editedComment.content = content;
    if (attachments) editedComment.attachments = attachments;

    await comment.update(editedComment);

    callback?.();
  });
};
