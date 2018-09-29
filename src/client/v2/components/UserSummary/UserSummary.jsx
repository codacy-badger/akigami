import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Header } from 'semantic-ui-react';
import { inject, observer } from 'mobx-react';
import chunk from 'lodash/chunk';

@inject('store')
@observer
class UserSummary extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
  }
  render() {
    const { store } = this.props;
    const summaryInfo = [
      {
        key: 'registerDate',
        title: 'Дата регистрации',
        value: store.registerDate,
        show: store.createdAt,
      },
      {
        key: 'birthday',
        title: 'День рождения',
        value: store.birthdayDate,
        show: store.birthday,
      },
      {
        key: 'gender',
        title: 'Пол',
        value: store.genderTitle,
        show: store.gender !== 'none',
      },
      {
        key: 'name',
        title: 'Имя',
        value: store.name,
        show: store.name,
      },
      {
        key: 'city',
        title: 'Город',
        value: store.city,
        show: store.city,
      },
      {
        key: 'website',
        title: 'Сайт',
        value: (
          <a
            href={store.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            {store.website}
          </a>
        ),
        show: store.website,
      },
    ].filter(e => !!e.show);
    return (
      <Grid celled="internally">
        {chunk(summaryInfo, 3).map((row, i) => (
          <Grid.Row columns={3} key={i}> {/* eslint-disable-line react/no-array-index-key */}
            {row.map(item => (
              <Grid.Column key={item.key}>
                <Header sub>{item.title}</Header>
                <span>{item.value}</span>
              </Grid.Column>
            ))}
          </Grid.Row>
        ))}
      </Grid>
    );
  }
}

export default UserSummary;
