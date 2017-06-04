import React, { Children, PureComponent } from 'react';
import { Grid } from 'semantic-ui-react';
import Responsive from 'react-responsive';
import PropTypes from 'prop-types';

import LeftColumn from './LeftColumn';
import RightColumn from './RightColumn';
import CenterColumn from './CenterColumn';

class ThreeGrid extends PureComponent {
    static Left = LeftColumn;
    static Center = CenterColumn;
    static Right = RightColumn;

    static defaultProps = {
        children: null,
    }

    static propTypes = {
        children: PropTypes.any,
    }

    makeComponents = () => {
        const render = {};
        Children.forEach(this.props.children, (item) => {
            if (item.type.name === 'LeftColumn') render.left = item;
            if (item.type.name === 'RightColumn') render.right = item;
            if (item.type.name === 'CenterColumn') render.center = item;
        });
        return render;
    }

    render() {
        const { left, center, right } = this.makeComponents();
        return (
            <Grid container stackable columns={3}>
                <Grid.Column tablet={5} computer={4}>
                    {left}
                    <Responsive maxWidth={991}>
                        {right}
                    </Responsive>
                </Grid.Column>
                <Grid.Column tablet={11} computer={8}>
                    {center}
                </Grid.Column>
                <Responsive minWidth={992}>
                    <Grid.Column computer={4}>
                        {right}
                    </Grid.Column>
                </Responsive>
            </Grid>
        );
    }
}

export default ThreeGrid;
