import { toJS, action, observable } from 'mobx';
import set from 'lodash/set';
import debugNamespace from 'debug';
import StudioModel from '../../models/Studio';

const debug = debugNamespace('akigami:client:studio:create:store');

class AddStudioStore extends StudioModel {
  @observable blob = null;

  constructor(app) {
    super(app);
    if (app) this.app = app;
  }

  setField(field, value) {
    set(this, field, value);
  }

  async create() {
    let hash = null;
    if (this.blob) {
      const blob = await fetch(this.blob).then(r => r.blob());
      const formData = new FormData();
      formData.append('file', blob);
      hash = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      }).then(res => res.text());
      if (!hash) throw new Error('Hash not didn\'t come');
    }
    const res = await this.app.apolloClient.mutate({
      mutation: `mutation {
          addStudio(
            title: "${this.title}"
            about: "${this.about}"
            image: ${hash ? `${hash}` : 'null'}
          ) {
            id
          }
        }
      `,
    });
    return res.data.addStudio;
  }

  async edit() {
    let hash = null;
    if (this.blob) {
      const blob = await fetch(this.blob).then(r => r.blob());
      const formData = new FormData();
      formData.append('file', blob);
      hash = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      }).then(res => res.text());
      if (!hash) throw new Error('Hash not didn\'t come');
    }
    const res = await this.app.apolloClient.mutate({
      mutation: `mutation {
          editStudio(
            id: "${this.id}"
            title: "${this.title}"
            about: "${this.about}"
            ${hash ? `image: "${hash}"` : ''}
            ${!this.image && !hash ? 'image: null' : ''}
          ) {
            id
          }
        }
      `,
    });
    return res.data.editStudio;
  }

  // checkImageIsBlob = () => this.image?.startsWith('blob')

  revokeImage = () => {
    if (this.blob) URL.revokeObjectURL(this.blob);
  }

  clearImage = () => {
    this.revokeImage();
    this.blob = null;
    this.image = null;
  }

  async submit(type) {
    debug(toJS(this));
    const res = await this[type]();
    debug('submit', type, res);
    if (res?.id) this.app.router.go(`/studios/${res.id}`);
  }

  @action
  uploadImage = async (file) => {
    if (file) {
      this.revokeImage();
      this.blob = URL.createObjectURL(file);
    }
    // if (this.image && typeof this.image !== 'string') {
    //   URL.revokeObjectURL(this.image);
    // }
    // const formData = new FormData();
    // formData.append('file', file);
    // const hash = await fetch('/api/upload', {
    //   method: 'POST',
    //   body: formData,
    // }).then(res => res.text());
    // if (!hash) throw new Error('Hash not didn\'t come');
    // const { data = null } = await this.app.apolloClient.query({
    //   query: `{
    //     getFromCDN(hash: "${hash}")
    //   }`,
    // });
    // if (!data?.getFromCDN) throw new Error('Some error getFromCDN GQL');
    // debug(data, data.getFromCDN);
    // this.image = data.getFromCDN;
  }
}

export default AddStudioStore;
