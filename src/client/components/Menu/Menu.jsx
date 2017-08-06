import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import cx from 'classnames';

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
        const state = {};
        if (document.body.scrollTop >= offsetTop && !sticked) {
            state.sticked = true;
        }
        if (document.body.scrollTop < offsetTop && sticked) {
            state.sticked = false;
        }
        this.setState(state);
    }
    render() {
        const { sticked } = this.state;
        const { items, selected, onSelect, sticky } = this.props;
        return (
            <div className="menu-wrapper">
                <div
                    className={cx({
                        menu: true,
                        sticked,
                        sticky,
                    })}
                >
                    <Grid>
                        <Row>
                            <Col xs={12}>
                                {items.map(item => (
                                    <button
                                        key={item.tab}
                                        onClick={() => onSelect(item)}
                                        className={cx({
                                            'menu-item': true,
                                            active: selected === item.tab,
                                        })}
                                    >
                                        <span className="menu-title">{item.title}</span>
                                        {typeof item.count === 'number' && (
                                            <span className="menu-counter">{item.count}</span>
                                        )}
                                    </button>
                                ))}
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default Menu;
