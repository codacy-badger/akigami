import { observable } from 'mobx';

class AnimeModel {
  @observable title = {
    russian: undefined,
    romaji: undefined,
    english: undefined,
    japanese: undefined,
    other: [],
  };
  @observable description = {
    russian: undefined,
    english: undefined,
  };
  @observable type = undefined;
  @observable episodes = undefined;
  @observable status = 'announced';
  @observable airing = {
    start: undefined,
    finish: undefined,
  };
  @observable season = undefined;
  @observable source = 'original';
  @observable genres = [];
  @observable duration = undefined;
  @observable rating = 'g';
  @observable stats = {
    score: undefined,
    ranked: undefined,
    members: undefined,
  };
  @observable videos = [];
  @observable poster = {
    small: '/images/no-poster.jpg',
    medium: '/images/no-poster.jpg',
    large: '/images/no-poster.jpg',
    original: '/images/no-poster.jpg',
  };
  @observable cover = {
    small: undefined,
    medium: undefined,
    large: undefined,
    original: undefined,
  };
  @observable externalLinks = [];

  constructor(app) {
    this.app = app;
  }
}

export default AnimeModel;
