import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { Button } from 'react-bootstrap';
import Textarea from 'react-textarea-autosize';

import Avatar from '../Avatar';
import Icon from '../Icon';
import Store from './PostCreator.store';

@inject(({ app }) => ({ app }))
@observer
class PostCreator extends PureComponent {
    static propTypes = {
        app: PropTypes.object.isRequired,
    }
    constructor(props) {
        super(props);
        this.store = new Store(props.app);
    }
    componentDidMount() {
        this.store.initStorageState();
    }
    toFull = () => {
        if (this.store.collapsed) return false;
        this.store.changeCollapse(true);
        return true;
    }
    handleCreatePost = () => {
        this.store.createPost();
    }
    handleChangeContent = (e) => {
        this.store.changeContent(e.target.value);
    }
    renderShortView() {
        const { user } = this.props.app;
        return (
            <div className="post-creator-short" onClick={this.toFull}>
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
                    value="Расскажите что нового?"
                    placeholder="Расскажите что нового?"
                />
            </div>
        );
    }
    renderFullView() {
        const { user } = this.props.app;
        return (
            <div className="post-creator-full">
                <div className="post-creator-header">
                    <Avatar
                        size={30}
                        className="post-creator-avatar"
                        src={user.getAvatar}
                        title={user.displayName}
                    />
                    <Textarea
                        minRows={3}
                        autoFocus
                        value={this.store.content}
                        onChange={this.handleChangeContent}
                        placeholder="Расскажите что нового?"
                    />
                </div>
                <div className="post-creator-footer">
                    <div className="post-short-attachments">
                        <Button bsStyle="link" bsSize="xs">
                            <Icon type="image" />
                        </Button>
                    </div>
                    <Button
                        bsStyle="warning"
                        bsSize="sm"
                        onClick={this.handleCreatePost}
                    >
                        Опубликовать
                    </Button>
                </div>
            </div>
        );
    }
    render() {
        return (
            <section
                className="post"
            >
                {this.store.collapsed
                    ? this.renderFullView()
                    : this.renderShortView()}
            </section>
        );
    }
}

export default PostCreator;
