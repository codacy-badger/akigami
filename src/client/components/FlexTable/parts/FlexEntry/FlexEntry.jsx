import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Icon } from 'semantic-ui-react';

class FlexEntry extends PureComponent {
  static propTypes = {
    item: PropTypes.object.isRequired,
    listType: PropTypes.string.isRequired,
    libraryType: PropTypes.string.isRequired,
  }
  render() {
    const { item, listType, libraryType } = this.props;
    return (
      <div
        className={cx({
          'list-entry': true,
          [`list-${listType}`]: listType,
        })}
      >
        <div className="list-cover">
          <div className="list-edit">
            <Icon name="pencil" />
          </div>
          <div className="list-image" style={{ backgroundImage: `url(${item.poster})` }} />
        </div>
        <a href={`/${libraryType}/${item.id}`} className="list-title">{item.title}</a>
        <div className="list-format">{item.type}</div>
        <div className="list-score">{item.score}</div>
        <div className="list-progress">{item.progress}</div>
      </div>
    );
  }
}

export default FlexEntry;
