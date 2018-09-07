import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarNavigationIcon,
  // TopAppBarActionItem,
  TopAppBarTitle,
} from 'rmwc/TopAppBar';

import { Grid, GridCell } from 'rmwc/Grid';

import { ThemedTopAppBar } from './Header.styled';

class Header extends PureComponent {
  static propTypes = {
    onCollapse: PropTypes.func,
    showDrawerTrigger: PropTypes.bool,
    transparent: PropTypes.bool,
    title: PropTypes.string,
  }
  static defaultProps = {
    onCollapse: null,
    showDrawerTrigger: false,
    transparent: false,
    title: '',
  }
  render() {
    const { title, onCollapse, showDrawerTrigger, transparent } = this.props;
    return (
      <ThemedTopAppBar fixed transparent={transparent}>
        <Grid fixedColumnWidth style={{ padding: 0 }}>
          <TopAppBarRow>
            <GridCell span={12}>
              <TopAppBarSection alignStart style={{ height: 48 }}>
                {showDrawerTrigger && (
                  <TopAppBarNavigationIcon
                    use="menu"
                    onClick={onCollapse}
                  />
                )}
                <TopAppBarTitle style={{ paddingLeft: showDrawerTrigger ? 20 : 8 }}>
                  {title}
                </TopAppBarTitle>
              </TopAppBarSection>
              {/* <TopAppBarSection alignEnd>
                <TopAppBarActionItem aria-label="Download" alt="Download">
                  file_download
                </TopAppBarActionItem>
                <TopAppBarActionItem
                  aria-label="Print this page"
                  alt="Print this page"
                >
                  print
                </TopAppBarActionItem>
                <TopAppBarActionItem
                  aria-label="Bookmark this page"
                  alt="Bookmark this page"
                >
                  bookmark
                </TopAppBarActionItem>
              </TopAppBarSection> */}
            </GridCell>
          </TopAppBarRow>
        </Grid>
      </ThemedTopAppBar>
    );
  }
}

export default Header;
