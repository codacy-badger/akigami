import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Icon from '../../components/Icon';

import {
    Block,
    Grid,
    Row,
    Col,
    Footer,
    Title,
    Meta,
    MetaItem,
    Stats,
    Rating,
    Column,
    Score,
    Members,
    List,
} from './EntityHeader.styled';

class EntityHeader extends PureComponent {
    static propTypes = {
        data: PropTypes.object.isRequired,
        type: PropTypes.oneOf(['anime', 'manga', 'novel']).isRequired,
    }
    static detectSizeTitle(title) {
        if (title.length > 25) {
            return 'medium';
        } else if (title.length > 85) {
            return 'small';
        }
        return 'large';
    }
    render() {
        const { data, type } = this.props;
        return (
            <Block image={data.cover.large}>
                <Grid>
                    <Row>
                        <Col xs={12}>
                            <Footer>
                                <Title size={this.constructor.detectSizeTitle(data.title.romaji)}>
                                    {data.title.romaji}
                                </Title>
                                <Meta>
                                    {data.genres.map(genre => (
                                        <MetaItem key={genre.id} href={`/explore/${type}?genre=${genre.id}`}>
                                            {genre.title}
                                        </MetaItem>
                                    ))}
                                </Meta>
                                <Stats>
                                    <Rating>
                                        <Icon type="star-outline" />
                                        <Column>
                                            <Score>{data.stats.score}</Score>
                                            <Members>{data.stats.members}</Members>
                                        </Column>
                                    </Rating>
                                    <List>
                                        <Icon type="playlist-plus" />
                                    </List>
                                </Stats>
                            </Footer>
                        </Col>
                    </Row>
                </Grid>
            </Block>
        );
    }
}

export default EntityHeader;
