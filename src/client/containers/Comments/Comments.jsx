import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

import CommentCreator from '../../components/CommentCreator';
import Loading from '../../components/Loading';
import Comment from '../../components/Comment';
import Store from './Comments.store';
import Wrapper from './Comments.styled';

@inject(({ app }) => ({ app }))
@observer
class Comments extends Component {
    static defaultProps = {
        postId: null,
    }
    static propTypes = {
        app: PropTypes.object.isRequired,
        postId: PropTypes.number,
    }
    constructor(props) {
        super(props);
        this.store = new Store(props.app, {
            postId: props.postId,
        });
    }
    componentDidMount() {
        this.store.getComments();
        this.store.addListener();
    }
    componentWillUnmount() {
        this.store.removeListener();
    }
    handleReply = (comment) => {
        this.store.changeRepliedState(comment);
    }
    render() {
        return (
            <Wrapper>
                {this.store.list.map(comment => (
                    <Comment
                        key={comment.id}
                        comment={comment}
                        replies={this.store.getRepliesOnComment(comment.id)}
                        onReply={this.handleReply}
                    />
                ))}
                {this.store.loading && (
                    <Loading />
                )}
                {this.props.app.user.isAuth && (
                    <CommentCreator
                        post={this.props.postId}
                        reply={this.store.repliedComment}
                    />
                )}
            </Wrapper>
        );
    }
}

export default Comments;
