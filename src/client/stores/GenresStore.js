import { observable, action } from 'mobx';
import Genre from '../models/GenreModel';

class GenresStore {
  @observable list = [];

  @observable processing = false;

  @observable new = {
    id: '',
    title: '',
  };

  constructor(app, genres = this.list) {
    this.app = app;
    if (genres?.length) this.setData(genres);
  }

  @action
  setData(arr, cb) {
    this.list = arr.map(this.setModel);
    cb();
  }

  setModel = obj => (
    new Genre(this.app, this, obj)
  )

  initData = async () => {
    const response = await this.app.apolloClient.query({
      query: `
        {
          genres {
            id
            title
          }
        }
      `,
    });
    this.list = response.data.genres.map(this.setModel);
  }

  @action
  async create(isEdit, cb) {
    if (!this.canCreate) return;
    this.processing = true;
    try {
      let data = null;
      if (isEdit) {
        ({ data = null } = await this.app.apolloClient.mutate({
          mutation: `mutation {
            editGenre(
              id: ${this.new.id}
              title: "${this.new.title}"
            ) {
              id
              title
            }
          }`,
        }));
      } else {
        ({ data = null } = await this.app.apolloClient.mutate({
          mutation: `mutation {
            addGenre(title: "${this.new.title}") {
              id
              title
            }
          }`,
        }));
      }
      data = isEdit ? data.editGenre : data.addGenre;
      if (!data) throw new Error('Some error addGenre GQL');
      if (isEdit) {
        const el = this.list.find(e => (Number(e.id) === Number(data.id)));
        el.title = data.title;
      } else {
        this.list.unshift(this.setModel(data));
      }
      this.processing = false;
      cb();
      this.clearNew();
    } catch (err) {
      throw new Error(err);
    }
  }

  editNewField(field, value) {
    this.new[field] = value;
  }

  @action
  clearNew() {
    this.new = {
      id: '',
      title: '',
    };
  }

  get canCreate() {
    return !!this.new.title;
  }
}

export default GenresStore;
