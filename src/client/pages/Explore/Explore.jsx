import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Grid as BsGrid, Row, Col } from 'react-bootstrap';
import Responsive from 'react-responsive';

import Filter from '../../containers/Filter';
import Icon from '../../components/Icon';
import Wrapper from '../../components/Wrapper';
import Entity from '../../components/Entity';
import EntityModal from '../../components/EntityModal';
import {
    Content,
    Header,
    Switch,
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
    state = {
        opennedFilter: false,
    }
    changeVisibilityFilter = (action) => {
        this.setState({ opennedFilter: action });
    }
    render() {
        const { opennedFilter } = this.state;
        const { type } = this.props;
        return (
            <Wrapper opaque>
                <BsGrid>
                    <Row>
                        <Responsive maxWidth={991}>
                            <Filter
                                open={opennedFilter}
                                onClose={() => this.changeVisibilityFilter(false)}
                            />
                        </Responsive>
                        <Responsive minWidth={992}>
                            <Col md={3}>
                                <Filter />
                            </Col>
                        </Responsive>
                        <Col md={9}>
                            <Header>
                                <Responsive maxWidth={991}>
                                    <Switch
                                        bsStyle="link"
                                        onClick={() => this.changeVisibilityFilter(true)}
                                    >
                                        <Icon type="tune" />
                                    </Switch>
                                </Responsive>
                                <Title>
                                    {Explore.getTitle(type)}
                                </Title>
                            </Header>
                            <Content>
                                <Grid>
                                    <EntityModal />
                                    {data.map((item, index) => (
                                        <div key={index} style={{ width: 140 }}>
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
