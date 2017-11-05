import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Grid as BsGrid, Row, Col } from 'react-bootstrap';

import Wrapper from '../../components/Wrapper';
import Entity from '../../components/Entity';
import {
    Content,
    Header,
    Title,
    Grid,
} from './Explore.styled';
import data from './Explore.mock';

class Explore extends PureComponent {
    static defaultProps = {
        type: null,
    }
    static propTypes = {
        type: PropTypes.string,
    }
    static getTitle(type) {
        switch (type) {
        case 'novel': return 'Обзор новелл';
        case 'manga': return 'Обзор манги';
        default: return 'Обзор аниме';
        }
    }
    render() {
        const { type } = this.props;
        return (
            <Wrapper opaque>
                <BsGrid>
                    <Row>
                        <Col xs={12}>
                            <Header>
                                <Title>
                                    {Explore.getTitle(type)}
                                </Title>
                            </Header>
                            <Content>
                                <Grid>
                                    {data.map((item, index) => (
                                        <div
                                            key={index}
                                            style={{ width: 140 }}
                                        >
                                            <Entity
                                                type={item.type}
                                                status={item.status}
                                                entity={item.entity}
                                            />
                                        </div>
                                    ))}
                                </Grid>
                            </Content>
                        </Col>
                    </Row>
                </BsGrid>
            </Wrapper>
        );
    }
}

export default Explore;
