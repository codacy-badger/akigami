import uuid from 'uuid';
import MongooseClass from '../utils/mongooseClass';

class EmailToken extends MongooseClass {
  email = { type: String, required: true };
  token = { type: String, required: true, default: uuid.v4 };
  listenToken = { type: String, required: true, default: uuid.v4 };
  createdAt = { type: Date, expires: 60 * 15, default: Date.now };

  async isLogin() {
    const user = await this.model('User').findOne({ email: this.email });
    if (user) {
      return true;
    }
    return false;
  }
}

export default EmailToken.schema();
