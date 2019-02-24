import { observable, action } from 'mobx';

class Studio {
  @observable title = '';

  @observable image = '';

  @observable about = '';

  @observable createdAt = null;

  @observable entities = [];

  constructor(app, item) {
    this.init({ app, item });
  }

  init({ app, item }) {
    if (app) this.app = app;
    if (item) this.setData(item);
  }

  @action
  setData({
    id = this.id,
    title = this.title,
    image = this.image,
    entities = this.entities,
    about = this.about,
    createdAt = this.createdAt,
  }) {
    this.id = id;
    this.title = title;
    this.image = image;
    this.entities = entities;
    this.about = about;
    this.createdAt = createdAt;
  }

  initData = async ({ id, type }) => {
    const response = await this.app.apolloClient.query({
      query: `{
        studio(id: "${id}") {
          id
          title
          image
          about
        }
      }`,
    });
    this.setData(response.data.studio);
  }
}

export default Studio;
