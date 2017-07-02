import React, { PureComponent } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

import { Button } from 'semantic-ui-react';

@inject('app')
@observer
export default class Footer extends PureComponent {
    static propTypes = {
        id: PropTypes.string.isRequired,
        app: PropTypes.object.isRequired,
    }
    constructor(props) {
        super(props);
        this.timer = setInterval(this.handleClose, 2000);
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    handleClose = () => {
        this.props.app.modal.close(this.props.id);
    }
    render() {
        return (
            <Button onClick={this.handleClose}>Close</Button>
        );
    }
}