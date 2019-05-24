import React, { Component } from 'react';
import Slider from 'react-slick';
import { Global } from '@emotion/core';
import Paper from '../Paper';
import { Wrapper, Background, Foreground, globalSlick } from './Hero.styles';

class Hero extends Component {
  render() {
    const { items } = this.props;
    const settings = {
      className: 'akg-hero',
      infinite: true,
      centerPadding: 0,
      centerMode: true,
      slidesToShow: 3,
      speed: 500,
      rows: 2,
      slidesPerRow: 2,
      responsive: [
        {
          breakpoint: 1490,
          settings: {
            slidesPerRow: 1,
          },
        },
        {
          breakpoint: 992,
          settings: {
            rows: 1,
            slidesPerRow: 1,
          },
        },
        {
          breakpoint: 768,
          settings: {
            centerMode: false,
            slidesToShow: 1,
            rows: 1,
            slidesPerRow: 1,
          },
        },
      ],
    };
    return (
      <Wrapper>
        <Global styles={globalSlick} />
        <Slider {...settings}>
          {items.map(item => (
            <div key={item.id}>
              <div style={{ margin: '6px 8px' }}>
                <Paper overflow="hidden">
                  <Background src={item.cover} />
                  <Foreground>
                    {item.title.russian}
                  </Foreground>
                </Paper>
              </div>
            </div>
          ))}
        </Slider>
      </Wrapper>
    );
  }
}

export default Hero;
