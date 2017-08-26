import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import Textarea from 'react-textarea-autosize';
import PropTypes from 'prop-types';
import cx from 'classnames';
import m from 'moment';

import { Button, ButtonToolbar } from 'react-bootstrap';

import Icon from '../Icon';
import Avatar from '../Avatar';

@inject(({ app }) => ({ user: app.user }))
@observer
class Comment extends PureComponent {
    static defaultProps = {
        replies: [],
        onReply: null,
        replied: false,
    }
    static propTypes = {
        comment: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
        onReply: PropTypes.func,
        replies: PropTypes.array,
        replied: PropTypes.bool,
    }
    handleChangeContent = (e) => {
        this.props.comment.changeContent(e.target.value);
    }
    startEditComment = () => {
        const { comment } = this.props;
        comment.backupData();
        comment.changeEdit(true);
    }
    cancelEditComment = () => {
        const { comment } = this.props;
        comment.changeEdit(false);
        comment.restoreData();
    }
    finishEditComment = () => {
        this.props.comment.editComment();
    }
    renderEditableBody() {
        const { comment } = this.props;
        return (
            <div>
                <div className="comment-body">
                    <span className="comment-content">
                        <Textarea
                            minRows={1}
                            autoFocus
                            value={comment.content}
                            onChange={this.handleChangeContent}
                            placeholder="Расскажите что нового?"
                        />
                    </span>
                </div>
                <div className="post-edit-actions">
                    <ButtonToolbar>
                        <Button
                            bsSize="sm"
                            onClick={this.cancelEditComment}
                        >
                            Отмена
                        </Button>
                        <Button
                            bsSize="sm"
                            bsStyle="danger"
                            onClick={this.finishEditComment}
                        >
                            Сохранить
                        </Button>
                    </ButtonToolbar>
                </div>
            </div>
        );
    }
    renderDefaultBody() {
        const { comment, user, onReply } = this.props;
        return (
            <div>
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
                    {(user.id === comment.user.id && !comment.edit) && (
                        <div className="comment-edit">
                            <Button
                                bsSize="xs"
                                bsStyle="link"
                                className="comment-reply"
                                onClick={this.startEditComment}
                            >
                                <Icon type="lead-pencil" />
                            </Button>
                            <Button
                                bsSize="xs"
                                bsStyle="link"
                                className="comment-reply"
                                style={{ fontSize: 14, marginLeft: 6 }}
                                onClick={() => {}}
                            >
                                <Icon type="close" />
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        );
    }
    render() {
        const { comment, replies, replied, user } = this.props;
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
                        {comment.edit
                            ? this.renderEditableBody()
                            : this.renderDefaultBody()}
                    </div>
                </div>
                {replies.length > 0 && (
                    <div className="comment-replies-wrapper">
                        {replies.map(reply => (
                            <Comment
                                user={user}
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
