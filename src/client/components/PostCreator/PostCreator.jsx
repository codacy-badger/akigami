import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import Select from 'react-select';
import Icon from '../Icon';
import Store from './PostCreator.store';
import {
    Post,
    Short,
    Avatar,
    Textarea,
    Full,
    Header,
    Footer,
    Attachments,
    Attach,
    Action,
} from './PostCreator.styled';


@inject(({ app }) => ({ app }))
@observer
class PostCreator extends Component {
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
    handleChangeNamespace = (e) => {
        console.log(e);
    }
    renderShortView() {
        const { user } = this.props.app;
        return (
            <Short onClick={this.toFull}>
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
            </Short>
        );
    }
    renderFullView() {
        const { user } = this.props.app;
        return (
            <Full>
                <Header>
                    <Avatar
                        size={30}
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
                </Header>
                <Footer>
                    <Attachments>
                        <Attach bsStyle="link" bsSize="xs">
                            <Icon type="image" />
                        </Attach>
                        <Select
                            className="post-namespace-selector"
                            name="post-namespace-selector"
                            value="global"
                            options={[{
                                value: 'global',
                                label: 'Глобально',
                            }, {
                                value: 'followers',
                                label: 'Подписчики',
                                disabled: true,
                            }, {
                                value: 'clubs',
                                label: 'Клуб',
                                disabled: true,
                            }]}
                            searchable={false}
                            clearable={false}
                            onChange={this.handleChangeNamespace}
                        />
                    </Attachments>
                    <Action
                        bsStyle="warning"
                        bsSize="sm"
                        onClick={this.handleCreatePost}
                    >
                        Опубликовать
                    </Action>
                </Footer>
            </Full>
        );
    }
    render() {
        return (
            <Post>
                {this.store.collapsed
                    ? this.renderFullView()
                    : this.renderShortView()}
            </Post>
        );
    }
}

export default PostCreator;
