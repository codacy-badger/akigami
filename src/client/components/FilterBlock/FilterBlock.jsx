import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Block, Title, Content } from './FilterBlock.styled';

class FilterBlock extends PureComponent {
    static defaultProps = {
        title: null,
        children: null,
    }
    static propTypes = {
        title: PropTypes.string,
        children: PropTypes.any,
    }
    render() {
        const { title, children } = this.props;
        return (
            <Block>
                {title && <Title>{title}</Title>}
                <Content>
                    {children}
                </Content>
            </Block>
        );
    }
}

export default FilterBlock;
