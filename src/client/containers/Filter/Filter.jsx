import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Button from 'react-bootstrap/lib/Button';
import { Scrollbars } from 'react-custom-scrollbars';
import Responsive from 'react-responsive';
import uniqBy from 'lodash/uniqBy';

import FilterBlock from '../../components/FilterBlock';
import FilterCheckbox from '../../components/FilterCheckbox';
import FilterRating from '../../components/FilterRating';
import Icon from '../../components/Icon';
import InputRange from '../../components/InputRange';
import {
    Wrapper,
    Title,
    Header,
    Close,
} from './Filter.styled';

class Filter extends PureComponent {
    static defaultProps = {
        open: false,
        onClose: () => {},
    }
    static propTypes = {
        onClose: PropTypes.func,
        open: PropTypes.bool,
    }
    state = {
        status: [],
        type: [],
        genre: [],
        startYear: null,
        finishYear: null,
        sort: { value: 'rating', label: 'По рейтингу' },
        season: null,

        ratingG: false,
        ratingPG: false,
        ratingPG13: false,
        ratingR17: false,
        ratingRPlus: false,
        ratingRx: false,
    }
    changeStatus = (obj) => {
        const status = this.state.status;
        status.push(obj);
        const merged = uniqBy(status, 'value');
        const output = merged.map((e) => {
            if (e.value === obj.value) {
                e.active = obj.active;
            }
            return e;
        });
        this.setState({ status: output });
    }
    changeType = (obj) => {
        const type = this.state.type;
        type.push(obj);
        const merged = uniqBy(type, 'value');
        const output = merged.map((e) => {
            if (e.value === obj.value) {
                e.active = obj.active;
            }
            return e;
        });
        this.setState({ type: output });
    }
    changeGenre = (obj) => {
        const genre = this.state.genre;
        genre.push(obj);
        const merged = uniqBy(genre, 'value');
        const output = merged.map((e) => {
            if (e.value === obj.value) {
                e.active = obj.active;
            }
            return e;
        });
        this.setState({ genre: output });
    }
    changeYear = (o) => {
        this.setState({
            startYear: o.from,
            finishYear: o.to,
        });
    }
    changeSort = (sort) => {
        this.setState({ sort });
    }
    changeSeason = (season) => {
        this.setState({ season });
    }
    changeRating = (rating) => {
        this.setState({ [rating]: !this.state[rating] });
    }
    clearGenres = () => {
        this.setState({ genre: [] });
    }
    blankScroll = () => {
        return (
            <div />
        );
    }
    render() {
        const {
            status,
            type,
            genre,
            startYear,
            finishYear,
            sort,
            season,
            ratingG,
            ratingPG,
            ratingPG13,
            ratingR17,
            ratingRPlus,
            ratingRx,
        } = this.state;
        const { open, onClose } = this.props;
        return (
            <Wrapper open={open}>
                <Scrollbars
                    universal
                    autoHide
                    className="filter-scroll"
                    renderTrackHorizontal={this.blankScroll}
                >
                    <Header>
                        <Title
                            style={{ padding: '44px 0 32px' }}
                        >
                            Фильтр
                        </Title>
                        <Responsive maxWidth={991}>
                            <Close
                                bsStyle="link"
                                onClick={onClose}
                            >
                                <Icon type="close" />
                            </Close>
                        </Responsive>
                    </Header>
                    <FilterBlock title="Статус">
                        <FilterCheckbox
                            negative
                            options={[
                                { value: 'announced', label: 'Анонсированно' },
                                { value: 'airing', label: 'Сейчас в эфире' },
                                { value: 'aired', label: 'Уже вышло' },
                            ]}
                            onChange={this.changeStatus}
                            value={status}
                        />
                    </FilterBlock>
                    <FilterBlock title="Тип">
                        <FilterCheckbox
                            negative
                            options={[
                                { value: 'tv', label: 'ТВ сериал' },
                                { value: 'movie', label: 'Фильм' },
                                { value: 'ova', label: 'OVA' },
                                { value: 'ona', label: 'ONA' },
                                { value: 'special', label: 'Спешл' },
                                { value: 'clip', label: 'Клип' },
                            ]}
                            onChange={this.changeType}
                            value={type}
                        />
                    </FilterBlock>
                    <FilterBlock title="Год">
                        <InputRange
                            from={startYear}
                            to={finishYear}
                            onChange={this.changeYear}
                        />
                    </FilterBlock>
                    <FilterBlock title="Сезон">
                        <Select
                            name="filter-sorting-selector"
                            className="filter-sorting-selector"
                            options={[
                                { value: 'winter', label: 'Зимний' },
                                { value: 'spring', label: 'Весенний' },
                                { value: 'summer', label: 'Летний' },
                                { value: 'fall', label: 'Осенний' },
                            ]}
                            placeholder="Выберите сезон"
                            clearValueText="Сбросить сезон"
                            value={season}
                            onChange={this.changeSeason}
                            searchable={false}
                        />
                    </FilterBlock>
                    <FilterBlock title="Сортировка">
                        <Select
                            name="filter-sorting-selector"
                            className="filter-sorting-selector"
                            options={[
                                { value: 'rating', label: 'По рейтингу' },
                                { value: 'popular', label: 'По популярности' },
                                { value: 'alphabet', label: 'По алфавиту' },
                                { value: 'date', label: 'По дате выхода' },
                            ]}
                            value={sort}
                            onChange={this.changeSort}
                            searchable={false}
                            clearable={false}
                        />
                    </FilterBlock>
                    <FilterBlock title="Рейтинг">
                        <FilterRating
                            selected={{
                                ratingG,
                                ratingPG,
                                ratingPG13,
                                ratingR17,
                                ratingRPlus,
                                ratingRx,
                            }}
                            onSelect={this.changeRating}
                        />
                    </FilterBlock>
                    <FilterBlock
                        title="Жанры"
                        action={genre.length > 0 && (
                            <Button
                                bsSize="xs"
                                onClick={this.clearGenres}
                            >
                                Сброс
                            </Button>
                        )}
                    >
                        <FilterCheckbox
                            negative
                            options={[
                                { value: 'shounen', label: 'Сёнен' },
                                { value: 'shounen-ai', label: 'Сёнен Ай' },
                                { value: 'seinen', label: 'Сейнен' },
                                { value: 'shoujo', label: 'Сёздё' },
                                { value: 'shoujo-ai', label: 'Сёздё Ай' },
                                { value: 'josei', label: 'Дзёсей' },
                                { value: 'comedy', label: 'Комедия' },
                                { value: 'romance', label: 'Романтика' },
                                { value: 'school', label: 'Школа' },
                                { value: 'dementia', label: 'Безумие' },
                                { value: 'martial-arts', label: 'Боевые искусства' },
                                { value: 'vampire', label: 'Вампиры' },
                                { value: 'military', label: 'Военное' },
                                { value: 'harem', label: 'Гарем' },
                                { value: 'demons', label: 'Демоны' },
                                { value: 'mystery', label: 'Детектив' },
                                { value: 'kids', label: 'Детское' },
                                { value: 'drama', label: 'Драма' },
                                { value: 'game', label: 'Игры' },
                                { value: 'historical', label: 'Исторический' },
                                { value: 'space', label: 'Космос' },
                                { value: 'magic', label: 'Магия' },
                                { value: 'cars', label: 'Машины' },
                                { value: 'mecha', label: 'Меха' },
                                { value: 'music', label: 'Музыка' },
                                { value: 'parody', label: 'Пародия' },
                                { value: 'slice-of-life', label: 'Повседневность' },
                                { value: 'police', label: 'Полиция' },
                                { value: 'adventure', label: 'Приключения' },
                                { value: 'psychological', label: 'Психологическое' },
                                { value: 'samurai', label: 'Самураи' },
                                { value: 'supernatural', label: 'Сверхъестественное' },
                                { value: 'sport', label: 'Спорт' },
                                { value: 'super-power', label: 'Супер сила' },
                                { value: 'sci-fi', label: 'Научная фантастика' },
                                { value: 'fantasy', label: 'Фэнтези' },
                                { value: 'action', label: 'Экшен' },
                                { value: 'ecchi', label: 'Этти' },
                                { value: 'thriller', label: 'Триллер' },
                                { value: 'hentai', label: 'Хентай' },
                                { value: 'yaoi', label: 'Яой' },
                                { value: 'yuri', label: 'Юри' },
                            ]}
                            onChange={this.changeGenre}
                            value={genre}
                        />
                    </FilterBlock>
                </Scrollbars>
            </Wrapper>
        );
    }
}

export default Filter;
