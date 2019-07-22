import React from 'react';
import { Row, Col } from '../../../components/Grid';
import BlockTitle from '../../../components/BlockTitle';
import ResponsiveReverseGrid from '../../../components/ResponsiveReverseGrid';
import Block from '../../../components/Block';
import LineInfo from '../../../components/LineInfo';

const UserBrowse = () => (
  <React.Fragment>
    <Row>
      <Col>
        <BlockTitle>О себе</BlockTitle>
        <Block>
          123
        </Block>
      </Col>
    </Row>
    <ResponsiveReverseGrid
      left={(
        <div>
          <BlockTitle>Информация</BlockTitle>
          <Block>
            <LineInfo title="Последний онлайн">Сейчас</LineInfo>
            <LineInfo title="Пол">Мужской</LineInfo>
            <LineInfo title="День рождения">8 авг. 1995</LineInfo>
            <LineInfo title="Местоположение">Тольятти, Россия</LineInfo>
            <LineInfo title="Присоедиинился">22 июл. 2019</LineInfo>
          </Block>
        </div>
      )}
      center={(
        <div>
          center
        </div>
      )}
      right={(
        <div>
          <BlockTitle>Подписки</BlockTitle>
          <Block>
            follows
          </Block>
        </div>
      )}
    />
  </React.Fragment>
);

export default UserBrowse;
