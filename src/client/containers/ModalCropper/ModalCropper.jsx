import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import Cropper from 'react-cropper';
import { PreviewImage, Title, Wrapper, Sub, Help } from './ModalCropper.styled';

@inject('app')
@observer
export default class ModalCropper extends Component {
  static propTypes = {
    app: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    store: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    props.store.setData(props.app, props.id);
  }
  componentWillUnmount() {
    URL.revokeObjectURL(this.props.store.img);
  }
  static getTitle(type) {
    switch (type) {
    case 'cover':
      return 'обложки';
    case 'avatar':
      return 'аватара';
    default:
      return '';
    }
  }
  render() {
    const { data, store } = this.props;
    return (
      <Wrapper>
        <Title>{`Изменение ${ModalCropper.getTitle(data.type)}`}</Title>

        <Sub>Предпросмотр</Sub>
        <Help>Так будет выглядеть готовый результат</Help>
        <PreviewImage className="preview-img" type={data.type} />

        <Sub>Выберите область</Sub>
        <Help>Укажите нужные размеры изображения</Help>
        <Cropper
          viewMode={1}
          zoomable={false}
          dragMode={'move'}
          style={{
            height: 300,
            width: 'calc(100% + 64px)',
            margin: '0 -32px',
          }}
          guides={false}
          rotatable
          aspectRatio={data.width / data.height}
          preview=".preview-img"
          src={store.img}
          ref={store.setCropper}
        />
      </Wrapper>
    );
  }
}
