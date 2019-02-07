import { toJS, action } from 'mobx';
import set from 'lodash/set';
import debugNamespace from 'debug';
import StudioModel from '../../models/Studio';
import { ApolloClient } from '../../lib/modules';

const debug = debugNamespace('akigami:client:studio:create:store');

class AddStudioStore extends StudioModel {
  constructor(app) {
    super(app);
    if (app) this.app = app;
  }

  setField(field, value) {
    set(this, field, value);
  }

  async create() {
    const res = await ApolloClient.mutate({
      mutation: `mutation {
          addStudio(
            title: "${this.title}"
            about: "${this.about}"
            createdAt: "${this.createdAt}"
            image: "${this.image}"
          ) {
            id
          }
        }
      `,
    });
    return res.data.addStudio;
  }

  async edit() {
    const res = await ApolloClient.mutate({
      mutation: `mutation {
          editStudio(
            id: "${this.id}"
            title: "${this.title}"
            about: "${this.about}"
            createdAt: "${this.createdAt}"
            image: "${this.image}"
          ) {
            id
          }
        }
      `,
    });
    return res.data.editStudio;
  }

  async submit(type) {
    debug(toJS(this));
    let res = null;
    res = await this[type]();
    debug('submit', type, res);
    if (res?.id) this.app.router.go(`/studios/${res.id}`);
  }

  @action
  async uploadImage(file) {
    if (typeof this.image !== 'string' && this.image) {
      URL.revokeObjectURL(this.image);
    }
    const formData = new FormData();
    formData.append('file', file);
    const hash = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    }).then(res => res.text());
    if (!hash) throw new Error('Hash not didn\'t come');
    const { data = null } = await ApolloClient.query({
      query: `{
        getFromCDN(hash: "${hash}")
      }`,
    });
    if (!data || !data.getFromCDN) throw new Error('Some error getFromCDN GQL');
    debug(data, data.getFromCDN);
    this.image = data.getFromCDN;
  }
}

export default AddStudioStore;
