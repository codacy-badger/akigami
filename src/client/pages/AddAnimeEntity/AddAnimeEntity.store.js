import { observable, toJS, action } from 'mobx';
import set from 'lodash/set';
import debugNamespace from 'debug';

import AnimeModel from '../../models/Anime';

const debug = debugNamespace('akigami:client:anime:create:store');

class AddAnimeEntityStore extends AnimeModel {
  @observable studioId = null;

  @observable genresList = [];

  @observable studiosList = [];

  setField(field, value) {
    set(this, field, value);
  }

  async create() {
    const res = await this.app.apolloClient.mutate({
      mutation: `mutation (
        $title: AnimeTitleInput!
        $status: String!
        $rating: String!
        ) {
          addAnime(
            title: $title
            rating: $rating
            status: $status
          ) {
            id
          }
        }
      `,
      variables: {
        title: {
          romaji: this.title.romaji,
        },
        rating: this.rating,
        status: this.status,
      },
    });
    return res.data.addAnime;
  }

  async edit() {
    // const res = await this.app.apolloClient.mutate({
    //   mutation: `mutation {
    //       editAnime(
    //         ${Object.keys(toJS(this)).map(i => `${i}: "${this[i]}"`).join(',')}
    //       ) {
    //         id
    //       }
    //     }
    //   `,
    // });
    // return res.data.editAnime;
  }

  async initData() {
    const response = await this.app.apolloClient.query({
      query: `{
        studios {
          id
          title
        }
        genres {
          id
          title
        }
      }`,
    });
    this.studiosList = response.data.studios;
    this.genresList = response.data.genres;
  }

  async submit(type) {
    if (!this.title.romaji) return false;
    debug(toJS(this));
    const res = await this[type]();
    debug('submit', type, res);
    if (res?.id) this.app.router.go(`/anime/${res.id}`);
  }

  @action
  async uploadImage(file, type) {
    if (this[type] && typeof this[type] !== 'string') {
      URL.revokeObjectURL(this[type]);
    }
    const formData = new FormData();
    formData.append('file', file);
    const hash = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    }).then(res => res.text());
    if (!hash) throw new Error('Hash not didn\'t come');
    const { data = null } = await this.app.apolloClient.query({
      query: `{
        getFromCDN(hash: "${hash}")
      }`,
    });
    if (!data?.getFromCDN) throw new Error('Some error getFromCDN GQL');
    this[type] = data.getFromCDN;
  }
}

export default AddAnimeEntityStore;
