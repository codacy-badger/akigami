import React, { PureComponent } from 'react';

class FlexHeader extends PureComponent {
  render() {
    return (
      <div className="list-header">
        <div className="list-cover" />
        <div className="list-title">Название</div>
        <div className="list-format">Формат</div>
        <div className="list-score">Оценка</div>
        <div className="list-progress">Прогресс</div>
      </div>
    );
  }
}

export default FlexHeader;
