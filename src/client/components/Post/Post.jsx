import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import m from 'moment';

import Avatar from '../Avatar';

class Post extends PureComponent {
    static propTypes = {
        post: PropTypes.object.isRequired,
    }
    render() {
        const { post } = this.props;
        return (
            <article className="post">
                <div className="post-header">
                    <Avatar
                        size={45}
                        href={post.user.link}
                        src={post.user.getAvatar}
                        title={post.user.displayName}
                    />
                    <div className="post-header-info">
                        <a
                            className="post-header-username"
                            href={post.user.link}
                        >
                            {post.user.displayName}
                        </a>
                        <span className="post-header-date">
                            {m(post.createdAt).locale('ru').fromNow()}
                        </span>
                    </div>
                </div>
                <div className="post-body">
                    <div className="post-content">
                        {post.content}
                    </div>
                    {post.attachments.length > 0 && (
                        <div className="post-attachments">
                            {post.attachments.map((attach, i) => (
                                <div key={i}>123</div>
                            ))}
                        </div>
                    )}
                </div>
            </article>
        );
    }
}

export default Post;
