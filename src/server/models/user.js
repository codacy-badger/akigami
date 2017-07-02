import MongooseClass from '../utils/mongooseClass';

class User extends MongooseClass {
    username = { type: String, required: true };
    email = { type: String, required: true };
}

export default User.schema();
