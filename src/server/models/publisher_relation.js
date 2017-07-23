import MongooseClass from '../utils/mongooseClass';

class PublisherRelation extends MongooseClass {
    manga: { type: Number, required: true };
    publisher: { type: Number, required: true };
}

export default PublisherRelation.schema();
