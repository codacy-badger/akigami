import React, { PureComponent } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import PropTypes from 'prop-types';

import Blank from '../Blank';

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
            <div className="follows-wrapper">
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
                        <a
                            href={`/@${item.username}`}
                            className="follow-item"
                        >
                            <img src={item.avatar} alt={item.displayName} />
                        </a>
                    </OverlayTrigger>
                ))}
            </div>
        );
    }
}

export default Follows;
