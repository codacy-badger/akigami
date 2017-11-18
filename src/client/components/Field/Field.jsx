import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { Block, Title, Description, Column, Actions, Child } from './Field.styled';

class Field extends PureComponent {
    static defaultProps = {
        description: null,
        children: null,
        actions: null,
    }
    static propTypes = {
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        children: PropTypes.any,
        actions: PropTypes.any,
    }
    render() {
        const { title, description, children, actions } = this.props;
        return (
            <Block>
                <Column actions={!!actions}>
                    <Title>{title}</Title>
                    {description && <Description>{description}</Description>}
                    {children && <Child>{children}</Child>}
                </Column>
                {actions && (
                    <Actions>
                        {actions}
                    </Actions>
                )}
            </Block>
        );
    }
}

export default Field;
