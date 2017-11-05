import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';

import Icon from '../../components/Icon';

import {
    Wrapper,
    Header,
    Expand,
    Trigger,
    Search,
    Fixer,
} from './Filter.styled';

class Filter extends PureComponent {
    static defaultProps = {
        expand: false,
        search: '',
        onSearch: e => console.log('onSearch', e),
        onExpand: e => console.log('onExpand', e),
    }
    static propTypes = {
        expand: PropTypes.bool,
        type: PropTypes.string.isRequired,
        onSearch: PropTypes.func,
        onExpand: PropTypes.func,
        search: PropTypes.string,
    }
    constructor(props) {
        super(props);
        this.state = {
            expand: props.expand,
            search: props.search,
            fixed: false,
        };
    }
    componentDidMount() {
        window.addEventListener('scroll', this.listener);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.listener);
    }
    listener = () => {
        const { fixed } = this.state;
        const height = document.body.scrollTop || document.documentElement.scrollTop;
        const state = {
            fixed: false,
        };
        if (!fixed) {
            this.offset = this.fixer.offsetTop;
        }
        if (height >= this.offset) {
            state.fixed = true;
        } else {
            state.fixed = false;
        }
        this.setState(state);
    }
    handleExpandFilter = () => {
        const { onExpand } = this.props;
        this.setState({ expand: !this.state.expand }, () => onExpand?.(this.state.expand));
    }
    render() {
        const { search, expand, fixed } = this.state;
        const { type, onSearch } = this.props;
        return (
            <Fixer innerRef={(e) => { this.fixer = e; }} fixed={fixed}>
                <Grid>
                    <Row>
                        <Col xs={12}>
                            <Wrapper fixed={fixed}>
                                <Header>
                                    <Trigger
                                        onClick={this.handleExpandFilter}
                                        active={expand}
                                    >
                                        <Icon type="format-list-checks" />
                                    </Trigger>
                                    <Search
                                        value={search}
                                        placeholder={`Поиск по ${type}`}
                                        onChange={e => onSearch(e.targer.value)}
                                    />
                                </Header>
                                {expand && (
                                    <Expand>
                                        123
                                    </Expand>
                                )}
                            </Wrapper>
                        </Col>
                    </Row>
                </Grid>
            </Fixer>
        );
    }
}

export default Filter;
