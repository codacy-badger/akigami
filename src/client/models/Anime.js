import { observable } from 'mobx';

export const fallbackPoster = '/images/no-poster.jpg';
export const fallbackCover = '/images/no-cover.jpg';

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
    small: fallbackPoster,
    medium: fallbackPoster,
    large: fallbackPoster,
    original: fallbackPoster,
  };

  @observable cover = {
    small: fallbackCover,
    medium: fallbackCover,
    large: fallbackCover,
    original: fallbackCover,
  };

  @observable externalLinks = [];

  constructor(app) {
    this.app = app;
  }
}

export default AnimeModel;
