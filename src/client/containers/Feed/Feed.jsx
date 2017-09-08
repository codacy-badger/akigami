import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

import Loading from '../../components/Loading';
import PostCreator from '../../components/PostCreator';
import Post from '../../components/Post';
import Store from './Feed.store';
import Wrapper from './Feed.styled';

@inject(({ app }) => ({ app }))
@observer
class Feed extends PureComponent {
    static defaultProps = {
        userId: null,
    }
    static propTypes = {
        app: PropTypes.object.isRequired,
        userId: PropTypes.number,
    }
    constructor(props) {
        super(props);
        this.store = new Store(props.app, {
            type: props.userId ? 'local' : 'global',
            userId: props.userId,
        });
    }
    componentDidMount() {
        this.store.getFeed();
        this.store.addListener();
    }
    componentWillUnmount() {
        this.store.removeListener();
    }
    render() {
        return (
            <Wrapper>
                {this.store.isOwner && <PostCreator />}
                {this.store.list.map(post => <Post key={post.id} post={post} />)}
                {this.store.loading && (
                    <Loading />
                )}
            </Wrapper>
        );
    }
}

export default Feed;
