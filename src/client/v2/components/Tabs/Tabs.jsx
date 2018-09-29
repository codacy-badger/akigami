import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Grid, Menu, Dropdown, Label, Icon } from 'semantic-ui-react';

class Tabs extends PureComponent {
  static propTypes = {
    active: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      icon: PropTypes.string,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      type: PropTypes.oneOf(['dropdown']),
      items: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        icon: PropTypes.string,
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      })),
    })).isRequired,
    onChange: PropTypes.func,
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
  handleChangeTab(active) {
    this.setState({ active }, () => {
      if (this.props.onChange) {
        this.props.onChange(active);
      }
    });
  }
  findActiveTab(arr, key) {
    for (const value of arr) {
      if (value.type === 'dropdown') {
        return this.findActiveTab(value.items, key);
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
      <Grid>
        <Grid.Row columns={1}>
          <Grid.Column>
            <Menu>
              {data.map((item) => {
                if (item.type === 'dropdown') {
                  return (
                    <Dropdown
                      key={item.key}
                      item
                      simple
                      text={item.title}
                      className={cx({
                        'dropdown-active': item.items.map(e => e.key).includes(active),
                      })}
                    >
                      <Dropdown.Menu>
                        {item.items.map(dropItem => {
                          const changeDropdownTab = () => this.handleChangeTab(dropItem.key);
                          return (
                            <Dropdown.Item
                              key={dropItem.key}
                              onClick={changeDropdownTab}
                            >
                              {dropItem.icon && <Icon name={dropItem.icon} />}
                              {dropItem.title}
                              {dropItem.label && <Label>{dropItem.label}</Label>}
                            </Dropdown.Item>
                          );
                        })}
                      </Dropdown.Menu>
                    </Dropdown>
                  );
                }
                const changeTab = () => this.handleChangeTab(item.key);
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
            </Menu>
          </Grid.Column>
        </Grid.Row>
        {current.render()}
      </Grid>
    );
  }
}

export default Tabs;
