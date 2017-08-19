import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Button } from 'react-bootstrap';
import Textarea from 'react-textarea-autosize';

import Avatar from '../Avatar';
import Icon from '../Icon';
import Store from './CommentCreator.store';

@inject(({ app }) => ({ app }))
@observer
class CommentCreator extends PureComponent {
    static defaultProps = {
        reply: null,
    }
    static propTypes = {
        app: PropTypes.object.isRequired,
    }
    constructor(props) {
        super(props);
        this.store = new Store(props);
    }
    toFull = () => {
        if (this.store.collapsed) return false;
        this.store.changeCollapse(true);
        return true;
    }
    handleCreateComment = () => {
        this.store.createComment();
    }
    handleChangeContent = (e) => {
        this.store.changeContent(e.target.value);
    }
    renderShortView() {
        const { user } = this.props.app;
        return (
            <div className="comment-creator-short" onClick={this.toFull}>
                <Avatar
                    size={30}
                    className="post-creator-avatar"
                    src={user.getAvatar}
                    title={user.displayName}
                />
                <Textarea
                    minRows={1}
                    maxRows={1}
                    readOnly
                    style={{
                        cursor: 'text',
                    }}
                    value="Написать комментарий..."
                    placeholder="Написать комментарий..."
                />
            </div>
        );
    }
    renderFullView() {
        const { user } = this.props.app;
        return (
            <div className="comment-creator-full">
                <div className="post-creator-header">
                    <Avatar
                        size={30}
                        className="post-creator-avatar"
                        src={user.getAvatar}
                        title={user.displayName}
                    />
                    <Textarea
                        minRows={2}
                        autoFocus
                        value={this.store.content}
                        onChange={this.handleChangeContent}
                    />
                </div>
                <div className="post-creator-footer">
                    <div className="post-short-attachments">
                        <Button bsStyle="link" bsSize="xs">
                            <Icon type="image" />
                        </Button>
                    </div>
                    <Button
                        bsStyle="danger"
                        bsSize="sm"
                        onClick={this.handleCreateComment}
                    >
                        Отправить
                    </Button>
                </div>
            </div>
        );
    }
    render() {
        return (
            <div className="comment-creator">
                {this.store.collapsed
                    ? this.renderFullView()
                    : this.renderShortView()}
            </div>
        );
    }
}

export default CommentCreator;
