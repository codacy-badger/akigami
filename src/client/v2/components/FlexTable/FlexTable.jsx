import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';

import FlexHeader from './parts/FlexHeader';
import FlexEntry from './parts/FlexEntry';
import FlexEntries from './parts/FlexEntries';

class FlexTable extends PureComponent {
  static Header = FlexHeader;
  static Entry = FlexEntry;
  static Entries = FlexEntries;
  static propTypes = {
    children: PropTypes.any.isRequired,
  }
  render() {
    const { children } = this.props;
    return (
      <Segment className="flex-table">
        {children}
      </Segment>
    );
  }
}

export default FlexTable;
