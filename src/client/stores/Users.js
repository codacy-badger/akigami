import { observable, action } from 'mobx';
import UserModel from '../models/User';

class Users {
  @observable list = [];

  constructor(app, array) {
    this.init({ app, array });
  }

  @action
  init({ app, array }) {
    if (app) this.app = app;
    if (array?.length) this.setUsers(array);
  }

  @action
  setData(array, cb) {
    this.list = array.map(this.wrapModel);
    cb();
  }

  initData = async () => {
    const response = await this.app.apolloClient.query({
      query: `
        {
          users {
            id
            displayName
            username
            email
            gender
            avatar
            cover
            status
            birthday
            name
            city
            online
            createdAt
            visitedAt
          }
        }
      `,
    });
    this.list = response.data.users.map(this.wrapModel);
  }

  wrapModel = (item) => (
    new UserModel(this.app, item)
  )
}

export default Users;
