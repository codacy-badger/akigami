import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
    Block,
    Grid,
    Row,
    Col,
    Content,
    Left,
    Title,
    Meta,
    MetaItem,
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
                            <Content>
                                <Left>
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
                                </Left>
                            </Content>
                        </Col>
                    </Row>
                </Grid>
            </Block>
        );
    }
}

export default EntityHeader;
