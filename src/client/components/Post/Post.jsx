import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import m from 'moment';

import {
    OverlayTrigger,
    Tooltip,
    MenuItem,
    Button,
    ButtonToolbar,
} from 'react-bootstrap';


import Comments from '../../containers/Comments';
import Icon from '../Icon';

import {
    Element,
    Header,
    Avatar,
    Info,
    User,
    Date,
    Type,
    Menu,
    Dropdown,
    Body,
    Content,
    Textarea,
    Attachments,
    Actions,
} from './Post.styled';

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
    switchNamespace = (namespace) => {
        switch (namespace) {
        case 'followers': return {
            icon: 'account-star',
            text: 'Пост виден подписчикам',
        };
        case 'clubs': return {
            icon: 'hexagon-multiple',
            text: 'Пост виден участникам клуба',
        };
        default: return {
            icon: 'earth',
            text: 'Пост виден всем на сайте',
        };
        }
    }
    renderHeader() {
        const { post, user } = this.props;
        const namespace = this.switchNamespace(post.namespace);
        const tooltip = (
            <Tooltip id="post-type">
                {namespace.text}
            </Tooltip>
        );
        return (
            <Header paddings>
                <Avatar
                    size={45}
                    href={post.user.link}
                    src={post.user.getAvatar}
                    title={post.user.displayName}
                />
                <Info>
                    <User href={post.user.link}>
                        {post.user.displayName}
                    </User>
                    <Date>
                        {m(post.createdAt).locale('ru').fromNow()}
                        <OverlayTrigger placement="top" overlay={tooltip}>
                            <Type>
                                <Icon type={namespace.icon} />
                            </Type>
                        </OverlayTrigger>
                    </Date>
                </Info>
                {(user.id === post.user.id && !post.edit) && (
                    <Menu>
                        <Dropdown
                            noCaret
                            pullRight
                            bsSize="xs"
                            onSelect={this.handleSelectMenu}
                            title={<Icon type="dots-horizontal" />}
                            id="post-header-menu"
                        >
                            <MenuItem eventKey="edit">Изменить</MenuItem>
                            <MenuItem eventKey="delete">Удалить</MenuItem>
                        </Dropdown>
                    </Menu>
                )}
            </Header>
        );
    }
    renderEditableBody() {
        const { post } = this.props;
        return (
            <Body paddings>
                <Content>
                    <Textarea
                        minRows={3}
                        autoFocus
                        value={post.content}
                        onChange={this.handleChangeContent}
                        placeholder="Расскажите что нового?"
                    />
                </Content>
                {post.attachments.length > 0 && (
                    <Attachments>
                        {post.attachments.map((attach, i) => (
                            <div key={i}>123</div>
                        ))}
                    </Attachments>
                )}
                <Actions>
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
                </Actions>
            </Body>
        );
    }
    renderDefaultBody() {
        const { post } = this.props;
        return (
            <Body paddings>
                <Content>
                    {post.content}
                </Content>
                {post.attachments.length > 0 && (
                    <Attachments>
                        {post.attachments.map((attach, i) => (
                            <div key={i}>123</div>
                        ))}
                    </Attachments>
                )}
            </Body>
        );
    }
    render() {
        const { post, user } = this.props;
        return (
            <Element>
                {this.renderHeader()}
                {post.edit
                    ? this.renderEditableBody()
                    : this.renderDefaultBody()}
                <Comments postId={post.id} />
            </Element>
        );
    }
}

export default Post;
