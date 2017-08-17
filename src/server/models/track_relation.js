import MongooseClass from '../utils/mongooseClass';

class TrackRelation extends MongooseClass {
    track = { type: Number, required: true };
    artist = { type: Number, required: true };
    number = { type: Number };
    album = { type: Number };
    anime = { type: Number };
}

export default TrackRelation.schema();
