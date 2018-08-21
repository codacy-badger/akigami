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
  }
  static defaultProps = {
    onCollapse: null,
    showDrawerTrigger: false,
  }
  render() {
    const { onCollapse, showDrawerTrigger } = this.props;
    return (
      <ThemedTopAppBar fixed>
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
                  Главная
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
