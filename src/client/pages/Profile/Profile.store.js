import { computed, observable } from 'mobx';
import superagent from 'superagent';
import set from 'lodash/set';
import { socket } from '../../lib/modules';

const defaultAvatar = '/no-photo.jpg';
const defaultCover = '/no-cover.jpg';

class Profile {
    @observable id = null;
    @observable username = null;
    @observable displayName = null;
    @observable avatar = defaultAvatar;
    @observable cover = defaultCover;

    constructor(app, data) {
        this.app = app;
        Object.keys(data).forEach((key) => {
            set(this, key, data[key]);
        });
        if (typeof window !== 'undefined') {
            socket.on(`profile:${this.id}`, (newData) => {
                Object.keys(newData).forEach((key) => {
                    set(this, key, newData[key]);
                });
            });
        }
    }

    @computed get getAvatar() {
        return !this.avatar ? defaultAvatar : this.avatar;
    }

    @computed get getCover() {
        return !this.cover ? defaultCover : this.cover;
    }

    callUploader = (type) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = () => {
            if (input.files.length > 0) {
                console.log(input.files);
                const params = {
                    width: type === 'avatar' ? 200 : 1905,
                    height: type === 'avatar' ? 200 : 448,
                    type,
                };
                import(/* webpackChunkName: "modal_cropper" */ '../../containers/ModalCropper').then((module) => {
                    this.app.modal.show(module.default(input.files[0], params, (data) => this.upload(input.files[0], data, type)));
                });
            }
        };
        input.click();
    }

    upload = async (file, data, type) => {
        data.type = type;
        const { text } = await superagent.post('/api/upload').field('data', JSON.stringify(data)).attach('file', file);
        return new Promise((res) => {
            socket.emit('profile:image', {
                action: 'update',
                data: {
                    hash: text,
                },
            }, res);
        });
    }

    removeImage = (type) => {
        socket.emit('profile:image', {
            action: 'remove',
            data: {
                type,
            },
        });
    }
}

export default Profile;
