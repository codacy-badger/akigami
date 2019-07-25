import React, { Component } from 'react';
import get from 'lodash/get';
import merge from 'lodash/merge';
import PropTypes from 'prop-types';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import Flickity from '../../externals/react-flickity-component';
import Button from '../Button';
import { Wrapper, Item, Control } from './Slider.styles';

const defaultOptions = {
  initialIndex: 0,
  pageDots: false,
  prevNextButtons: false,
  cellAlign: 'left',
  contain: true,
};

class Slider extends Component {
  static propTypes = {
    itemHeight: PropTypes.number,
    options: PropTypes.object,
    ItemComponent: PropTypes.any,
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    })),
  }

  static defaultProps = {
    itemHeight: null,
    options: {},
    ItemComponent: props => <div {...props} />,
    items: [],
  }

  constructor(props) {
    super(props);
    this.state = {
      canPrev: false,
      canNext: false,
    };
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.stateManager = this.stateManager.bind(this);
  }

  componentDidMount() {
    if (typeof window !== 'undefined') {
      this.stateManager();
      this.flkty.on('change', () => {
        this.stateManager();
      });
    }
  }

  stateManager() {
    const { canNext: prevCanNext, canPrev: prevCanPrev } = this.state;
    const newState = {};
    const canPrev = (
      get(this.flkty, 'slides.0.target')
      !== get(this.flkty, 'selectedSlide.target')
    );
    const canNext = (
      get(this.flkty, `slides.${get(this.flkty, 'slides.length', 1) - 1}.target`)
      !== get(this.flkty, 'selectedSlide.target')
    );
    if (prevCanNext !== canNext) {
      newState.canNext = canNext;
    }
    if (prevCanPrev !== canPrev) {
      newState.canPrev = canPrev;
    }
    if (Object.keys(newState).length) {
      this.setState(newState);
    }
  }

  handleNext() {
    this.flkty.next();
  }

  handlePrev() {
    this.flkty.previous();
  }

  render() {
    const { canNext, canPrev } = this.state;
    const { items, ItemComponent, options, itemHeight, ...props } = this.props;
    if (typeof window === 'undefined') return <Wrapper height={itemHeight} />;
    return (
      <Wrapper height={itemHeight} {...props}>
        <Flickity
          static
          options={merge(defaultOptions, options)}
          flickityRef={(e) => {
            this.flkty = e;
          }}
        >
          {items.map(item => (
            <Item key={item.id} height={itemHeight}>
              <ItemComponent item={item} />
            </Item>
          ))}
        </Flickity>
        <Control
          visible={canPrev}
          position="left"
        >
          <Button icon={<FaArrowLeft />} onClick={this.handlePrev} />
        </Control>
        <Control
          visible={canNext}
          position="right"
        >
          <Button icon={<FaArrowRight />} onClick={this.handleNext} />
        </Control>
      </Wrapper>
    );
  }
}

export default Slider;
