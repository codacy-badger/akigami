import { toJS, action } from 'mobx';
import set from 'lodash/set';
import AnimeModel from '../../models/Anime';
import { ApolloClient } from '../../lib/modules';

class AddAnimeEntityStore extends AnimeModel {
  setField(field, value) {
    set(this, field, value);
  }

  submit() {
    console.log(toJS(this));
  }

  @action
  async uploadImage(file, type) {
    if (typeof this[type].original !== 'string' && this[type].original) {
      URL.revokeObjectURL(this[type].original);
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
        this[type][key] = data.getFromCDN[key];
      });
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default AddAnimeEntityStore;
