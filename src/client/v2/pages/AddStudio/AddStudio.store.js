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

  async submit() {
    debug(toJS(this));
    const res = await ApolloClient.mutate({
      mutation: `mutation {
          addStudio(
            title: "${this.title}"
            about: "${this.about}"
            createdAt: "${this.createdAt}"
          ) {
            id
          }
        }
      `,
    });
    debug('submit', res);
    const { id } = res.data.addStudio;
    if (id) this.app.router.go(`/studios/${id}`);
  }

  @action
  async uploadImage(file) {
    if (typeof this.image.original !== 'string' && this.image.original) {
      URL.revokeObjectURL(this.image.original);
    }
    try {
      const formData = new FormData();
      formData.append('file', file);
      const hash = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      }).then(res => res.text());
      if (!hash) throw new Error('Hash not didn\'t come');
      const { data = null } = await ApolloClient.query({
        query: `{
          getFromCDN(hash: "${hash}") {
            small
            medium
            large
            original
          }
        }`,
      });
      if (!data || !data.getFromCDN) throw new Error('Some error getFromCDN GQL');
      Object.keys(data.getFromCDN).forEach((key) => {
        this.image[key] = data.getFromCDN[key];
      });
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default AddStudioStore;
