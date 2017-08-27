import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Row, Col } from 'react-bootstrap';
import Responsive from 'react-responsive';

import Filter from '../../containers/Filter';
import Icon from '../../components/Icon';

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
            <div className="opaque">
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
                            <div className="explore-header">
                                <Responsive maxWidth={991}>
                                    <Button
                                        bsStyle="link"
                                        className="explore-filter"
                                        onClick={() => this.changeVisibilityFilter(true)}
                                    >
                                        <Icon type="tune" />
                                    </Button>
                                </Responsive>
                                <h1
                                    className="block-title"
                                    style={{ margin: '32px 0' }}
                                >
                                    {Explore.getTitle(type)}
                                </h1>
                            </div>
                            <div className="explore-wrapper">
                                456
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Explore;
