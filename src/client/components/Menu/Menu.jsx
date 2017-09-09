import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import {
    Wrapper,
    MenuInner,
    Item,
    Counter,
    Title,
} from './Menu.styled';

class Menu extends PureComponent {
    static defaultProps = {
        items: [],
        selected: null,
        onSelect: e => console.log('unhandled control', e),
        sticky: false,
        offsetTop: 352,
    }
    static propTypes = {
        items: PropTypes.array,
        selected: PropTypes.string,
        onSelect: PropTypes.func,
        sticky: PropTypes.bool,
        offsetTop: PropTypes.number,
    }
    state = {
        sticked: false,
    }
    componentDidMount() {
        if (this.props.sticky) {
            window.addEventListener('scroll', this.scrollEventer);
        }
    }
    componentWillUnmount() {
        if (this.props.sticky) {
            window.removeEventListener('scroll', this.scrollEventer);
        }
    }
    scrollEventer = () => {
        const { offsetTop } = this.props;
        const { sticked } = this.state;
        const scroll = document.body.scrollTop || document.documentElement.scrollTop;
        const state = {};
        if (scroll >= offsetTop && !sticked) {
            state.sticked = true;
        }
        if (scroll < offsetTop && sticked) {
            state.sticked = false;
        }
        this.setState(state);
    }
    render() {
        const { sticked } = this.state;
        const { items, selected, onSelect, sticky } = this.props;
        return (
            <Wrapper>
                <MenuInner
                    sticky={sticky}
                    sticked={sticked}
                >
                    <Grid>
                        <Row>
                            <Col xs={12}>
                                {items.map(item => (
                                    <Item
                                        key={item.tab}
                                        active={selected === item.tab}
                                        onClick={() => onSelect(item)}
                                    >
                                        <Title>{item.title}</Title>
                                        {typeof item.count === 'number' && (
                                            <Counter>{item.count}</Counter>
                                        )}
                                    </Item>
                                ))}
                            </Col>
                        </Row>
                    </Grid>
                </MenuInner>
            </Wrapper>
        );
    }
}

export default Menu;
