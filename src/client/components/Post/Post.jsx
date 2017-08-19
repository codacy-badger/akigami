import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import Textarea from 'react-textarea-autosize';
import m from 'moment';

import {
    OverlayTrigger,
    Tooltip,
    DropdownButton,
    MenuItem,
    Button,
    ButtonToolbar,
} from 'react-bootstrap';

import Avatar from '../Avatar';
import Icon from '../Icon';

@inject(({ app }) => ({ user: app.user }))
@observer
class Post extends PureComponent {
    static propTypes = {
        post: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired,
    }
    handleChangeContent = (e) => {
        this.props.post.changeContent(e.target.value);
    }
    handleSelectMenu = (key) => {
        if (key === 'edit') {
            this.startEditPost();
        }
    }
    startEditPost = () => {
        const { post } = this.props;
        post.backupData();
        post.changeEdit(true);
    }
    cancelEditPost = () => {
        const { post } = this.props;
        post.changeEdit(false);
        post.restoreData();
    }
    finishEditPost = () => {
        this.props.post.editPost();
    }
    renderHeader() {
        const { post, user } = this.props;
        const tooltip = (
            <Tooltip id="post-type">
                Пост виден всем на сайте.
            </Tooltip>
        );
        return (
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
                        <OverlayTrigger placement="top" overlay={tooltip}>
                            <span className="post-header-type">
                                <Icon type="earth" />
                            </span>
                        </OverlayTrigger>
                    </span>
                </div>
                {(user.id === post.user.id && !post.edit) && (
                    <div className="post-header-menu">
                        <DropdownButton
                            noCaret
                            pullRight
                            bsSize="xs"
                            onSelect={this.handleSelectMenu}
                            title={<Icon type="dots-horizontal" />}
                            id="post-header-menu"
                        >
                            <MenuItem eventKey="edit">Изменить</MenuItem>
                            <MenuItem eventKey="delete">Удалить</MenuItem>
                        </DropdownButton>
                    </div>
                )}
            </div>
        );
    }
    renderEditableBody() {
        const { post } = this.props;
        return (
            <div className="post-body">
                <div className="post-content">
                    <Textarea
                        minRows={3}
                        autoFocus
                        value={post.content}
                        onChange={this.handleChangeContent}
                        placeholder="Расскажите что нового?"
                    />
                </div>
                {post.attachments.length > 0 && (
                    <div className="post-attachments">
                        {post.attachments.map((attach, i) => (
                            <div key={i}>123</div>
                        ))}
                    </div>
                )}
                <div className="post-edit-actions">
                    <ButtonToolbar>
                        <Button
                            bsSize="sm"
                            onClick={this.cancelEditPost}
                        >
                            Отмена
                        </Button>
                        <Button
                            bsSize="sm"
                            bsStyle="danger"
                            onClick={this.finishEditPost}
                        >
                            Сохранить
                        </Button>
                    </ButtonToolbar>
                </div>
            </div>
        );
    }
    renderDefaultBody() {
        const { post } = this.props;
        return (
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
        );
    }
    render() {
        const { post } = this.props;
        return (
            <article className="post" style={{ boxShadow: post.edit ? '-6px 0 0 #ffbb07' : 'none' }}>
                {this.renderHeader()}
                {post.edit
                    ? this.renderEditableBody()
                    : this.renderDefaultBody()}
            </article>
        );
    }
}

export default Post;
