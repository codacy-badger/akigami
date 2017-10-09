import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import PropTypes from 'prop-types';
import m from 'moment';

import { Button, ButtonToolbar, OverlayTrigger, Tooltip } from 'react-bootstrap';

import Icon from '../Icon';
import {
    Wrapper,
    Main,
    Info,
    Avatar,
    Replies,
    Body,
    User,
    Content,
    Textarea,
    Meta,
    Reply,
    Date,
    Actions,
    Action,
} from './Comment.styled';


@inject(({ app }) => ({ user: app.user }))
@observer
class Comment extends Component {
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
                <Body>
                    <Content>
                        <Textarea
                            minRows={1}
                            autoFocus
                            value={comment.content}
                            onChange={this.handleChangeContent}
                            placeholder="Расскажите что нового?"
                        />
                    </Content>
                </Body>
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
        const editTooltip = (
            <Tooltip id="edit">Редактировать</Tooltip>
        );
        const delTooltip = (
            <Tooltip id="delete">Удалить</Tooltip>
        );
        return (
            <div>
                <Body>
                    <User href={comment.user.link}>
                        {comment.user.displayName}
                    </User>
                    <Content>
                        {comment.content}
                    </Content>
                </Body>
                <Meta>
                    {onReply && (
                        <Reply
                            bsSize="xs"
                            bsStyle="link"
                            onClick={() => onReply(comment)}
                        >
                            Ответить
                        </Reply>
                    )}
                    <Date>
                        {m(comment.createdAt).locale('ru').fromNow()}
                    </Date>
                    {(user.id === comment.user.id && !comment.edit) && (
                        <Actions>
                            <OverlayTrigger placement="top" overlay={editTooltip}>
                                <Action
                                    bsSize="xs"
                                    bsStyle="link"
                                    onClick={this.startEditComment}
                                >
                                    <Icon type="lead-pencil" />
                                </Action>
                            </OverlayTrigger>
                            <OverlayTrigger placement="top" overlay={delTooltip}>
                                <Action
                                    bsSize="xs"
                                    bsStyle="link"
                                    style={{ fontSize: 14, marginLeft: 6 }}
                                    onClick={() => {}}
                                >
                                    <Icon type="close" />
                                </Action>
                            </OverlayTrigger>
                        </Actions>
                    )}
                </Meta>
            </div>
        );
    }
    render() {
        const { comment, replies, replied, user } = this.props;
        return (
            <Wrapper
                replies={replies.length > 0}
                replied={replied}
            >
                <Main>
                    <Avatar
                        size={30}
                        replied={replied}
                        src={comment.user.getAvatar}
                        title={comment.user.displayName}
                    />
                    <Info>
                        {comment.edit
                            ? this.renderEditableBody()
                            : this.renderDefaultBody()}
                    </Info>
                </Main>
                {replies.length > 0 && (
                    <Replies>
                        {replies.map(reply => (
                            <Comment
                                user={user}
                                key={reply.id}
                                comment={reply}
                                replied
                            />
                        ))}
                    </Replies>
                )}
            </Wrapper>
        );
    }
}

export default Comment;
