import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Dimmer, Loader, Header, Icon, Divider, Segment, Button } from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import cx from 'classnames';

import Inline from '../Inline';

class ImageUploader extends PureComponent {
  static propTypes = {
    src: PropTypes.string,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    src: null,
    onChange: null,
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    this.handleDropImage = this.handleDropImage.bind(this);
  }

  async handleDropImage(files) {
    const { onChange } = this.props;
    this.setState({ loading: true });
    if (onChange) {
      await onChange(files[0]);
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading } = this.state;
    const { src } = this.props;
    return (
      <Segment className="segment-no-padding poster-upload" style={{ margin: 0 }}>
        <Dropzone
          className="dropzone"
          onDrop={this.handleDropImage}
          disableClick
        >
          {({ open, isDragActive, getRootProps, getInputProps }) => (
            <div {...getRootProps()} style={{ height: '100%', outline: 'none' }}>
              {isDragActive
                ? (
                  <Inline
                    align="center"
                    style={{
                      height: '100%',
                      justifyContent: 'center',
                      backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    }}
                  >
                    <Header as="h4" icon>
                      <Icon name="download" />
                      Переместите изображение сюда
                    </Header>
                  </Inline>
                ) : (
                  <Inline align="center">
                    <input {...getInputProps()} />
                    <div className="poster-upload-image image-upload-image">
                      <Dimmer active={loading} inverted>
                        <Loader inverted content="Загрузка" />
                      </Dimmer>
                      <div
                        className="poster"
                        style={{
                          backgroundImage: `url(${(src && src.preview) || src})`,
                        }}
                      />
                    </div>
                    <div className="poster-upload-content">
                      <Dimmer active={loading} inverted />
                      <Button
                        type="button"
                        animated="fade"
                        onClick={() => open()}
                      >
                        <Button.Content visible>Загрузите изображение</Button.Content>
                        <Button.Content hidden>Выбрать файл</Button.Content>
                      </Button>
                      <Divider horizontal>Или</Divider>
                      <p>переместите его сюда</p>
                    </div>
                  </Inline>
                )}
            </div>
          )}
        </Dropzone>
      </Segment>
    );
  }
}

export default ImageUploader;
