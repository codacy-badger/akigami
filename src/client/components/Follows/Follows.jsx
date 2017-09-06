import React, { PureComponent } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import PropTypes from 'prop-types';

import Blank from '../Blank';
import { Wrapper, Item, Avatar } from './Follows.styled';

class Follows extends PureComponent {
    static defaultProps = {
        entities: [],
        blankText: 'Здесь пока ничего нет',
    }
    static propTypes = {
        entities: PropTypes.array,
        blankText: PropTypes.string,
    }
    render() {
        const { entities, blankText } = this.props;
        if (!entities || entities.length === 0) {
            return <Blank>{blankText}</Blank>;
        }
        return (
            <Wrapper>
                {entities.map(item => (
                    <OverlayTrigger
                        key={item._id}
                        placement="top"
                        overlay={(
                            <Tooltip id={`${item.username}-${item._id}`}>
                                {item.displayName}
                            </Tooltip>
                        )}
                    >
                        <Item
                            href={`/@${item.username}`}
                        >
                            <Avatar
                                src={item.avatar}
                                alt={item.displayName}
                            />
                        </Item>
                    </OverlayTrigger>
                ))}
            </Wrapper>
        );
    }
}

export default Follows;
