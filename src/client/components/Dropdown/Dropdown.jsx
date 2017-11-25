import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import some from 'lodash/some';
import { Dropdown, Trigger, DropdownContent } from './Dropdown.styled';

export default class DropdownComponent extends PureComponent {
    static propTypes = {
        children: PropTypes.node.isRequired,
        trigger: PropTypes.node.isRequired,
    }
    render() {
        if (!some(this.props.children)) {
            return false;
        }
        return (
            <Dropdown>
                <Trigger>{this.props.trigger}</Trigger>
                <DropdownContent>
                    {this.props.children}
                </DropdownContent>
            </Dropdown>
        );
    }
}
