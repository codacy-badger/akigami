import React, { Component } from 'react';
import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import Cropper from 'react-cropper';
import { PreviewImage } from './ModalCropper.styled';

@inject('app')
@observer
export default class ModalCropper extends Component {
    static propTypes = {
        app: PropTypes.object.isRequired,
        id: PropTypes.string.isRequired,
        store: PropTypes.object.isRequired,
        data: PropTypes.object.isRequired,
    }
    constructor(props) {
        super(props);
        props.store.setData(props.app, props.id);
    }
    componentWillUnmount() {
        URL.revokeObjectURL(this.props.store.img);
    }
    render() {
        return (
            <div style={{
                padding: '60px 60px 60px',
            }}
            >
                <PreviewImage
                    className={'preview-img'}
                    type={this.props.data.type}
                />
                <Cropper
                    viewMode={1}
                    zoomable={false}
                    dragMode={'move'}
                    style={{
                        height: 400,
                        width: '100%',
                    }}
                    guides={false}
                    rotatable
                    aspectRatio={this.props.data.width / this.props.data.height}
                    preview={'.preview-img'}
                    src={this.props.store.img}
                    ref={this.props.store.setCropper}
                />
            </div>
        );
    }
}
