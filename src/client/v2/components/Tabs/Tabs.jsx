import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { inject, observer } from 'mobx-react';
import { Grid, Menu, Dropdown, Label, Icon, Container } from 'semantic-ui-react';
import DropdownElement from '../Dropdown';

@inject('app')
@observer
class Tabs extends Component {
  static propTypes = {
    active: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      icon: PropTypes.string,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      type: PropTypes.oneOf(['dropdown']),
      render: PropTypes.func,
      items: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        icon: PropTypes.string,
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        render: PropTypes.func.isRequired,
      })),
    })).isRequired,
    onChange: PropTypes.func,
    app: PropTypes.object.isRequired,
  }

  static defaultProps = {
    onChange: null,
    active: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      active: props.active || props.data[0].key,
    };
    this.handleChangeTab = this.handleChangeTab.bind(this);
  }

  componentWillReceiveProps(next) {
    if (this.props.active !== next.active) {
      this.setState({ active: next.active });
    }
  }

  handleChangeTab(active, item, parent) {
    const topBarActive = this.state.active !== active;
    this.setState({ active }, () => {
      if (this.props.onChange) {
        this.props.onChange(active, item, parent);
      }
      if (topBarActive) {
        this.props.app.topBar.finish();
      }
    });
  }

  findActiveTab(arr, key) {
    for (const value of arr) {
      if (value.type === 'dropdown') {
        const item = this.findActiveTab(value.items, key);
        if (item) return item;
      }
      if (value.key === key) {
        return value;
      }
    }
    return null;
  }

  render() {
    const { active } = this.state;
    const { data } = this.props;
    const current = this.findActiveTab(data, active);
    return (
      <React.Fragment>
        <Menu className="flat-menu">
          <Container>
            {data.map((item) => {
              if (item.type === 'dropdown') {
                return (
                  <DropdownElement
                    key={item.key}
                    item
                    text={item.title}
                    className={cx({
                      'dropdown-active': item.items.map(e => e.key).includes(active),
                    })}
                  >
                    <Dropdown.Menu>
                      {item.items.map(dropItem => {
                        const changeDropdownTab = () => this.handleChangeTab(dropItem.key, dropItem, item);
                        return (
                          <Dropdown.Item
                            key={dropItem.key}
                            onClick={changeDropdownTab}
                            active={dropItem.key === active}
                          >
                            {dropItem.icon && <Icon name={dropItem.icon} />}
                            {dropItem.title}
                            {dropItem.label && <Label>{dropItem.label}</Label>}
                          </Dropdown.Item>
                        );
                      })}
                    </Dropdown.Menu>
                  </DropdownElement>
                );
              }
              const changeTab = () => this.handleChangeTab(item.key, item);
              return (
                <Menu.Item
                  key={item.key}
                  name={item.key}
                  active={active === item.key}
                  onClick={changeTab}
                >
                  {item.icon && <Icon name={item.icon} />}
                  {item.title}
                  {item.label && <Label>{item.label}</Label>}
                </Menu.Item>
              );
            })}
          </Container>
        </Menu>
        <Container>
          <Grid>
            {current.render()}
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}

export default Tabs;
