import MongooseClass from '../utils/mongooseClass';

class PostRelation extends MongooseClass {
    post: { type: Number, required: true };
    comment: { type: Number };
}

export default PostRelation.schema();
