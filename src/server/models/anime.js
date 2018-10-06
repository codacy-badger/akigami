import MongooseClass from '../utils/mongooseClass';

class Anime extends MongooseClass {
  title = {
    russian: { type: String },
    romaji: { type: String, required: true },
    english: { type: String },
    japanese: { type: String },
    other: { type: Array, default: [] },
  };
  description = {
    russian: { type: String },
    english: { type: String },
  };
  type = {
    type: String,
    required: true,
    enum: ['tv', 'movie', 'ova', 'ona', 'special'],
  };
  episodes = { type: Number };
  status = {
    type: String,
    default: 'announced',
    enum: ['announced', 'not aried', 'airing', 'aired'],
  };
  airing = {
    start: { type: Date },
    finish: { type: Date },
  };
  season = {
    type: String,
    required: true,
    enum: ['winter', 'spring', 'summer', 'fall'],
  };
  source = {
    type: String,
    default: 'original',
    enum: ['original', 'manga', 'novel', 'game'],
  };
  genres = [Number];
  duration = { type: Number };
  rating = {
    type: String,
    default: 'g',
    enum: ['g', 'pg', 'pg-13', 'r', 'rplus', 'rx'],
  };
  stats = {
    score: { type: Number },
    ranked: { type: Number },
    members: { type: Number },
  };
  videos = [
    {
      title: { type: String },
      url: { type: String, required: true },
      thumbnail: { type: String, required: true },
    },
  ];
  poster = {
    small: { type: String },
    medium: { type: String },
    large: { type: String },
    original: { type: String },
  };
  cover = {
    small: { type: String },
    medium: { type: String },
    large: { type: String },
    original: { type: String },
  };
  externalLinks = [
    {
      title: { type: String, required: true },
      url: { type: String, required: true },
      type: {
        type: String,
        required: true,
        enum: ['mal', 'shiki', 'official', 'other'],
      },
    },
  ];
}

export default Anime.schema();
