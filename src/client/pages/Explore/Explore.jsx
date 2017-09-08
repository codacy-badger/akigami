import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import Responsive from 'react-responsive';

import Filter from '../../containers/Filter';
import Icon from '../../components/Icon';
import Wrapper from '../../components/Wrapper';
import {
    Content,
    Header,
    Switch,
    Title,
} from './Explore.styled';

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
                <Grid>
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
                                456
                            </Content>
                        </Col>
                    </Row>
                </Grid>
            </Wrapper>
        );
    }
}

export default Explore;
