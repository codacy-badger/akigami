import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Dimmer,
  Loader,
  Header,
  Icon,
  Divider,
  Segment,
  Button,
} from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import cx from 'classnames';

import Inline from '../Inline';

class CoverUploadCard extends PureComponent {
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
        >
          {({ open, isDragActive, getRootProps, getInputProps }) => (
            <div {...getRootProps({ onClick: evt => evt.preventDefault() })} style={{ height: '100%', outline: 'none' }}>
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
                  <React.Fragment>
                    <input {...getInputProps()} />
                    <div className="cover-upload-image">
                      <Dimmer active={loading} inverted>
                        <Loader inverted content="Загрузка" />
                      </Dimmer>
                      <div
                        className="cover"
                        style={{
                          backgroundImage: `url(${(src && src.preview) || src})`,
                        }}
                      />
                    </div>
                    <div className="cover-upload-content">
                      <Dimmer active={loading} inverted />
                      <Grid
                        columns={3}
                        style={{
                          height: 'calc(100% + 2rem)',
                          padding: '0 30px',
                        }}
                      >
                        <Grid.Row>
                          <Grid.Column
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              flex: 1,
                            }}
                          >
                            <Button type="button" animated="fade" onClick={() => open()}>
                              <Button.Content visible>Загрузите изображение</Button.Content>
                              <Button.Content hidden>Выбрать файл</Button.Content>
                            </Button>
                          </Grid.Column>
                          <Grid.Column width={3}>
                            <Divider vertical>Или</Divider>
                          </Grid.Column>
                          <Grid.Column
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              flex: 1,
                              justifyContent: 'center',
                            }}
                          >
                            <p>переместите его сюда</p>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </div>
                  </React.Fragment>
                )}
            </div>
          )}
        </Dropzone>
      </Segment>
    );
  }
}

export default CoverUploadCard;
