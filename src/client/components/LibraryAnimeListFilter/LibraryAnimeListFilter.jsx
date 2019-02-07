import React, { PureComponent } from 'react';
import { Menu } from 'semantic-ui-react';

class LibraryAnimeListFilter extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      active: 'all',
    };
    this.handleItemClick = this.handleItemClick.bind(this);
  }
  handleItemClick(e, { name }) {
    this.setState({ active: name });
  }
  render() {
    const { active } = this.state;
    return (
      <Menu size="small" secondary vertical style={{ width: '100%', margin: 0 }}>
        <Menu.Item
          name="all"
          active={active === 'all'}
          onClick={this.handleItemClick}
        >
          Все
        </Menu.Item>
        <Menu.Item
          name="planned"
          active={active === 'planned'}
          className="field-planned"
          onClick={this.handleItemClick}
        >
          Запланировано
        </Menu.Item>
        <Menu.Item
          name="current"
          active={active === 'current'}
          className="field-current"
          onClick={this.handleItemClick}
        >
          Смотрю
        </Menu.Item>
        <Menu.Item
          name="completed"
          active={active === 'completed'}
          className="field-completed"
          onClick={this.handleItemClick}
        >
          Просмотрено
        </Menu.Item>
        <Menu.Item
          name="paused"
          active={active === 'paused'}
          className="field-paused"
          onClick={this.handleItemClick}
        >
          Отложено
        </Menu.Item>
        <Menu.Item
          name="dropped"
          active={active === 'dropped'}
          className="field-dropped"
          onClick={this.handleItemClick}
        >
          Брошено
        </Menu.Item>
      </Menu>
    );
  }
}

export default LibraryAnimeListFilter;
