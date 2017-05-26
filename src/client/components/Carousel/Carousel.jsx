import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import omit from 'lodash/omit';

class Carousel extends PureComponent {
    static defaultProps = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    static propTypes = {
        children: PropTypes.any.isRequired,
    }
    componentDidMount() {
        this.initWidthFix();
    }
    initWidthFix = () => {
        setTimeout(() => this.slider.innerSlider.onWindowResized(), 0);
    }
    render() {
        const settings = omit(this.props, 'children');
        return (
            <Slider ref={(e) => { this.slider = e; }} {...settings}>
                {this.props.children}
            </Slider>
        );
    }
}

export default Carousel;
