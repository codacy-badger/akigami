import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

import {
    Wrapper,
    Rating,
    Line,
} from './FilterRating.styled';

class FilterRating extends PureComponent {
    static defaultProps = {
        onSelect: () => {},
        selected: {},
    }
    static propTypes = {
        onSelect: PropTypes.func,
        selected: PropTypes.object,
    }
    handleSelect = (rating) => {
        const { onSelect } = this.props;
        if (onSelect) {
            onSelect(rating);
        }
    }
    render() {
        const { selected } = this.props;
        const tooltipG = (
            <Tooltip id="tooltipG">
                Без возрастных ограничений
            </Tooltip>
        );
        const tooltipPG = (
            <Tooltip id="tooltipPG">
                Рекомендуется присутствие родителей
            </Tooltip>
        );
        const tooltipPG13 = (
            <Tooltip id="tooltipPG13">
                Детям до 13 лет просмотр не желателен
            </Tooltip>
        );
        const tooltipR17 = (
            <Tooltip id="tooltipRPlus">
                Лицам до 17 лет обязательно присутствие взрослого
            </Tooltip>
        );
        const tooltipRPlus = (
            <Tooltip id="tooltipRPlus">
                Лицам до 17 лет просмотр запрещён
            </Tooltip>
        );
        const tooltipRx = (
            <Tooltip id="tooltipRx">
                Хентай
            </Tooltip>
        );
        return (
            <Wrapper>
                <Line>
                    <OverlayTrigger placement="top" overlay={tooltipG}>
                        <Rating
                            active={selected.ratingG}
                            onClick={() => this.handleSelect('ratingG')}
                        >
                            G
                        </Rating>
                    </OverlayTrigger>
                    <OverlayTrigger placement="top" overlay={tooltipPG}>
                        <Rating
                            active={selected.ratingPG}
                            onClick={() => this.handleSelect('ratingPG')}
                        >
                            PG
                        </Rating>
                    </OverlayTrigger>
                    <OverlayTrigger placement="top" overlay={tooltipPG13}>
                        <Rating
                            active={selected.ratingPG13}
                            onClick={() => this.handleSelect('ratingPG13')}
                        >
                            PG-13
                        </Rating>
                    </OverlayTrigger>
                </Line>
                <Line>
                    <OverlayTrigger placement="top" overlay={tooltipR17}>
                        <Rating
                            active={selected.ratingR17}
                            onClick={() => this.handleSelect('ratingR17')}
                        >
                            R-17
                        </Rating>
                    </OverlayTrigger>
                    <OverlayTrigger placement="top" overlay={tooltipRPlus}>
                        <Rating
                            active={selected.ratingRPlus}
                            onClick={() => this.handleSelect('ratingRPlus')}
                        >
                            R+
                        </Rating>
                    </OverlayTrigger>
                    <OverlayTrigger placement="top" overlay={tooltipRx}>
                        <Rating
                            active={selected.ratingRx}
                            onClick={() => this.handleSelect('ratingRx')}
                        >
                            Rx
                        </Rating>
                    </OverlayTrigger>
                </Line>
            </Wrapper>
        );
    }
}

export default FilterRating;
