import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import m from 'moment';

import { Button } from 'react-bootstrap';

import Avatar from '../Avatar';

class Comment extends PureComponent {
    static defaultProps = {
        replies: [],
        onReply: null,
        replied: false,
    }
    static propTypes = {
        comment: PropTypes.object.isRequired,
        onReply: PropTypes.func,
        replies: PropTypes.array,
        replied: PropTypes.bool,
    }
    render() {
        const { comment, onReply, replies, replied } = this.props;
        return (
            <article
                className={cx({
                    comment: true,
                    'comment-replies': replies.length > 0,
                    'comment-replied': replied,
                })}
            >
                <div className="comment-inits">
                    <Avatar
                        size={30}
                        src={comment.user.getAvatar}
                        title={comment.user.displayName}
                    />
                    <div className="comment-info">
                        <div className="comment-body">
                            <a className="comment-user" href={comment.user.link}>
                                {comment.user.displayName}
                            </a>
                            <span className="comment-content">
                                {comment.content}
                            </span>
                        </div>
                        <div className="comment-meta">
                            {onReply && (
                                <Button
                                    bsSize="xs"
                                    bsStyle="link"
                                    className="comment-reply"
                                    onClick={() => onReply(comment)}
                                >
                                    Ответить
                                </Button>
                            )}
                            <span className="comment-date">
                                {m(comment.createdAt).locale('ru').fromNow()}
                            </span>
                        </div>
                    </div>
                </div>
                {replies.length > 0 && (
                    <div className="comment-replies-wrapper">
                        {replies.map(reply => (
                            <Comment
                                key={reply.id}
                                comment={reply}
                                replied
                            />
                        ))}
                    </div>
                )}
            </article>
        );
    }
}

export default Comment;
