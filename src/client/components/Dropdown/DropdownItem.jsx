import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Item } from './Dropdown.styled';

const noop = () => {};

export default class DropdownItem extends PureComponent {
    static propTypes = {
        onClick: PropTypes.func,
        children: PropTypes.node.isRequired,
    }
    static defaultProps = {
        onClick: noop,
    }
    render() {
        return (
            <Item onClick={this.props.onClick}>{this.props.children}</Item>
        );
    }
}
