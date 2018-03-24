import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import Outside from 'react-outside-component';
import Store from './CommentCreator.store';
import {
    Creator,
    Short,
    Full,
    Textarea,
    Avatar,
    Header,
    Footer,
    Action,
    Replied,
    Clear,
    Attach,
    Icon,
    Attachments,
} from './CommentCreator.styled';

@inject(({ app }) => ({ app }))
@observer
class CommentCreator extends Component {
    static defaultProps = {
        reply: null,
        post: null,
    }
    static propTypes = {
        app: PropTypes.object.isRequired,
    }
    constructor(props) {
        super(props);
        this.store = new Store(props);
        if (props.embed) {
            this.store.collapsed = props.embed;
            this.store.replyObject = props.replyObject;
            this.store.cancelReply = props.onCancel;
        }
    }
    componentWillReceiveProps(nextProps) {
        this.store.updateProps(nextProps);
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
    clearReplyState = () => {
        this.store.updateReply();
        this.store.changeCollapse(true);
    }
    renderShortView() {
        const { user } = this.props.app;
        return (
            <Short onClick={this.toFull}>
                <Avatar
                    size={30}
                    src={user.getAvatar}
                    title={user.displayName}
                />
                <Textarea
                    minRows={1}
                    maxRows={1}
                    readOnly
                    value="Написать комментарий..."
                    placeholder="Написать комментарий..."
                />
            </Short>
        );
    }
    renderFullView() {
        const { user } = this.props.app;
        return (
            <Outside isOpen={this.store.collapsed} onClickOutside={this.store.handleBlur}>
                <Full>
                    <Header>
                        <Avatar
                            size={30}
                            src={user.getAvatar}
                            title={user.displayName}
                        />
                        <Textarea
                            minRows={2}
                            autoFocus
                            value={this.store.content}
                            onChange={this.handleChangeContent}
                        />
                    </Header>
                    <Footer>
                        <Attachments>
                            <Attach bsStyle="link" bsSize="xs">
                                <Icon type="image" />
                            </Attach>
                            {this.store.reply && (
                                <Replied>
                                    {`Ответить ${this.store.reply.user.displayName}`}
                                    <Clear
                                        bsSize="xs"
                                        bsStyle="link"
                                        onClick={this.clearReplyState}
                                    >
                                        <Icon type="close" />
                                    </Clear>
                                </Replied>
                            )}
                        </Attachments>
                        {this.props.embed && <Action
                            bsStyle="link"
                            bsSize="sm"
                            onClick={this.props.onCancel}
                        >
                            Отменить
                        </Action>}
                        <Action
                            bsStyle="danger"
                            bsSize="sm"
                            onClick={this.handleCreateComment}
                        >
                            Отправить
                        </Action>
                    </Footer>
                </Full>
            </Outside>
        );
    }
    render() {
        return (
            <Creator>
                {this.store.collapsed
                    ? this.renderFullView()
                    : this.renderShortView()}
            </Creator>
        );
    }
}

export default CommentCreator;
