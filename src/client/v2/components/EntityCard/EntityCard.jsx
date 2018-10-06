import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Header, Divider, Label } from 'semantic-ui-react';
import { Scrollbars } from 'react-custom-scrollbars';

import { getType } from '../../../lib/converters';

class EntityCard extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    type: PropTypes.oneOf(['anime', 'manga']),
  }
  static defaultProps = {
    type: 'anime',
  }
  constructor(props) {
    super(props);
    this.state = {
      more: false,
      height: 0,
    };
    this.inner = React.createRef();
    this.handleChangeMore = this.handleChangeMore.bind(this);
    this.handleMore = this.handleMore.bind(this);
    this.handleLess = this.handleLess.bind(this);
  }
  componentDidMount() {
    this.calculateHeight();
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.item.id !== nextProps.item.id) {
      return true;
    }
    if (this.state.height !== nextState.height) {
      return true;
    }
    if (this.state.more !== nextState.more) {
      return true;
    }
    return false;
  }
  calculateHeight() {
    const rect = this.inner.current.getBoundingClientRect();
    this.setState({ height: rect.height });
  }
  handleMore() {
    this.handleChangeMore(true);
  }
  handleLess() {
    this.handleChangeMore(false);
  }
  handleChangeMore(more) {
    this.setState({ more });
  }
  render() {
    const { more, height } = this.state;
    const { item, type } = this.props;
    let desc = null;
    if (item.description && item.description.russian) {
      desc = item.description.russian;
    } else if (item.description && item.description.english) {
      desc = item.description.english;
    }
    return (
      <a
        className="entity"
        href={`/${type}/${item.id}`}
        onMouseEnter={this.handleMore}
        onMouseLeave={this.handleLess}
        style={{ height }}
      >
        <div className="entity-box">
          <div className="entity-inner" ref={this.inner}>
            <div
              className="poster"
              style={{
                backgroundImage: `url(${item.poster.original})`,
              }}
            />
            <div className="entity-info">
              <div className="entity-meta">
                <span>{getType(item.type)}</span>
                <span>{moment(item.airing.start).format('YYYY')}</span>
              </div>
              <Divider fitted />
              <Header size="small">{item.title.romaji}</Header>
              {more && (
                <div className="entity-more">
                  <div className="entity-genres">
                    {item.genres.map(genre => (
                      <Label key={genre.id} size="mini">{genre.title}</Label>
                    ))}
                  </div>
                  {desc && (
                    <Scrollbars
                      universal
                      autoHide
                      autoHeight
                      autoHeightMax={100}
                      className="entity-description-wrapper"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <div className="entity-description">
                        {desc.split('\n').map((ph, i) => (
                          <p key={i}>{ph}</p> // eslint-disable-line react/no-array-index-key
                        ))}
                      </div>
                    </Scrollbars>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </a>
    );
  }
}

export default EntityCard;
