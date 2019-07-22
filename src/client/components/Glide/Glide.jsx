import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { Wrapper, Scroll, Inner, Item, Shade, Control } from './Glide.styles';
import Button from '../Button';
import { Container } from '../Grid';

class Glide extends Component {
  static propTypes = {
    speed: PropTypes.number,
    reach: PropTypes.number,
    effect: PropTypes.bool,
    controls: PropTypes.bool,
    lockScroll: PropTypes.bool,
    effectColor: PropTypes.string,
    horizontalScroll: PropTypes.bool,
    ItemComponent: PropTypes.func,
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    })),
  }

  static defaultProps = {
    speed: 50,
    reach: 30,
    lockScroll: false,
    effect: false,
    controls: false,
    effectColor: '',
    horizontalScroll: false,
    ItemComponent: ({ children }) => <div>{children}</div>,
    items: [],
  }

  constructor(props) {
    super(props);
    this.state = {
      canScrollNext: false,
      canScrollPrev: false,
      ...(props.controls ? {
        itemsSize: [],
        controlIndex: 0,
      } : {}),
    };
    this.scroll = React.createRef();
    this.prepareItemSizes = this.prepareItemSizes.bind(this);
    this.controlRightHandler = this.controlRightHandler.bind(this);
    this.controlLeftHandler = this.controlLeftHandler.bind(this);
    this.controlManager = this.controlManager.bind(this);
    this.scrollManager = this.scrollManager.bind(this);
    this.scrollHandler = this.scrollHandler.bind(this);
    this.enableHorizontalScroll = this.enableHorizontalScroll.bind(this);
    this.disableHorizontalScroll = this.disableHorizontalScroll.bind(this);
    this.listenerHorizontalScroll = this.listenerHorizontalScroll.bind(this);
    props.items.forEach((item, index) => {
      this[`item${index}`] = React.createRef();
    });
  }

  componentDidMount() {
    const { effect, horizontalScroll, controls } = this.props;
    if (effect || controls) {
      const { left: percent } = this.scroll.current.getValues();
      this.scrollManager(percent);
    }
    if (controls) {
      this.prepareItemSizes();
    }
    if (horizontalScroll) {
      this.enableHorizontalScroll();
    }
  }

  componentWillUnmount() {
    const { horizontalScroll } = this.props;
    if (horizontalScroll) {
      this.disableHorizontalScroll();
    }
  }

  prepareItemSizes() {
    const { items } = this.props;
    const itemsSize = [];
    items.forEach((item, index) => {
      const el = this[`item${index}`].current;
      if (el) itemsSize.push(el.offsetWidth);
    });
    this.setState({ itemsSize });
  }

  enableHorizontalScroll() {
    if (this.scroll.current) {
      const el = this.scroll.current.container.childNodes[0];
      el.addEventListener('mousewheel', this.listenerHorizontalScroll, false);
      el.addEventListener('DOMMouseScroll', this.listenerHorizontalScroll, false);
    }
  }

  disableHorizontalScroll() {
    if (this.scroll.current) {
      const el = this.scroll.current.container.childNodes[0];
      el.removeEventListener('mousewheel', this.listenerHorizontalScroll, false);
      el.removeEventListener('DOMMouseScroll', this.listenerHorizontalScroll, false);
    }
  }

  listenerHorizontalScroll(e) {
    const { speed, lockScroll } = this.props;
    const el = this.scroll.current.container.childNodes[0];
    const delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    const prevScroll = el.scrollLeft;
    el.scrollLeft -= (delta * speed);
    if (prevScroll !== el.scrollLeft) {
      e.preventDefault();
    } else if (lockScroll) {
      e.preventDefault();
    }
  }

  scrollHandler(values) {
    this.scrollManager(values.left);
  }

  scrollManager(percent) {
    console.log(percent);
    this.setState({
      canScrollNext: percent < 0.99,
      canScrollPrev: percent > 0,
    });
  }

  controlRightHandler() {
    this.controlManager('right');
  }

  controlLeftHandler() {
    this.controlManager('left');
  }

  controlManager(position) {
    const { controlIndex, itemsSize } = this.state;
    let index = controlIndex;
    const { scrollLeft } = this.scroll.current.getValues();
    const setScrollLeft = this.scroll.current.scrollLeft;
    const item = itemsSize[index];
    console.log(this.scroll);
  }

  render() {
    const { itemsSize, canScrollPrev, canScrollNext } = this.state;
    const { items, effect, controls, effectColor, reach, ItemComponent, ...props } = this.props;
    const shadeProps = {
      color: effect ? effectColor : null,
      reach,
    };
    console.log(itemsSize);
    return (
      <Wrapper>
        {effect && (
          <Shade
            position="left"
            visible={canScrollPrev}
            {...shadeProps}
          />
        )}
        {controls && (
          <Control
            position="left"
            visible={canScrollPrev}
            onClick={this.controlLeftHandler}
          >
            <Button icon={<FaArrowLeft />} />
          </Control>
        )}
        <Scroll
          autoHide
          universal
          autoWidth
          autoHeight
          autoHeightMax="100%"
          {...props}
          ref={this.scroll}
          onScrollFrame={this.scrollHandler}
        >
          <Container style={{ paddingBottom: 0, paddingTop: 0 }}>
            <Inner>
              {items.map((item, index) => (
                <Item ref={this[`item${index}`]} key={item.id}>
                  <ItemComponent item={item} />
                </Item>
              ))}
            </Inner>
          </Container>
        </Scroll>
        {controls && (
          <Control
            position="right"
            visible={canScrollNext}
            onClick={this.controlRightHandler}
          >
            <Button icon={<FaArrowRight />} />
          </Control>
        )}
        {effect && (
          <Shade
            position="right"
            visible={canScrollNext}
            {...shadeProps}
          />
        )}
      </Wrapper>
    );
  }
}

export default Glide;
