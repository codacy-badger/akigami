import React, { PureComponent } from 'react';
import truncate from 'lodash/truncate';
import PropTypes from 'prop-types';
import Poster from '../Poster';

export default class Entity extends PureComponent {
    static defaultProps = {
        noTitle: false,
    }
    static propTypes = {
        noTitle: PropTypes.bool,
        item: PropTypes.object.isRequired,
        type: PropTypes.string.isRequired,
    }
    render() {
        const { item, type, noTitle } = this.props;
        return (
            <article className="entity">
                <Poster
                    src={item.poster}
                    title={item.title.romaji}
                    id={item.id}
                    type={type}
                />
                {!noTitle && (
                    <a href={`/${type}/${item.id}`} className="entity-title">
                        {truncate(item.title.romaji, { length: 36, separator: /,? +/ })}
                    </a>
                )}
            </article>
        );
    }
}
