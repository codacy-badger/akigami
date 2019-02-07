import gql from 'graphql-tag';

export const typeDef = gql`
  extend type Query {
    anime(id: ID!): Anime
    animes(limit: Int): [Anime]
  }

  extend type Mutation {
    addAnime(
      title: AnimeTitle,
      description: AnimeDesc,
      type: String!,
      episodes: Int,
      status: String!,
      airing: AnimeAir,
      season: String!,
      source: String,
      genres: [Int],
      duration: Int,
      rating: String!,
      stats: AnimeStats,
      videos: [AnimeVideo],
      poster: String,
      cover: String,
      externalLinks: [AnimeExtLinks],
      studioId: ID
    ): Anime
    editAnime(
      id: ID!,
      title: AnimeTitle,
      description: AnimeDesc,
      type: String!,
      episodes: Int,
      status: String!,
      airing: AnimeAir,
      season: String!,
      source: String,
      genres: [Int],
      duration: Int,
      rating: String!,
      stats: AnimeStats,
      videos: [AnimeVideo],
      poster: String,
      cover: String,
      studioId: ID,
      externalLinks: [AnimeExtLinks]
    ): Anime
  }

  type AnimeTitle {
    russian: String
    romaji: String!
    english: String
    japanese: String
    other: [String]
  }

  type AnimeDesc {
    russian: String
    english: String
  }

  type AnimeAir {
    start: String
    finish: String
  }

  type AnimeStats {
    score: Int
    ranked: Int
    members: Int
  }

  type AnimeVideo {
    title: String
    url: String
    thumbnail: String
  }

  type AnimeExtLinks {
    title: String
    url: String
    type: String
  }

  type Anime {
    id: ID!
    title: AnimeTitle
    description: AnimeDesc
    type: String!
    episodes: Int
    status: String!
    airing: AnimeAir
    season: String!
    source: String
    genres: [Int]
    duration: Int
    rating: String!
    stats: AnimeStats
    videos: [AnimeVideo]
    poster: String
    cover: String
    externalLinks: [AnimeExtLinks]
  }
`;

export const resolvers = {
  Query: {
    animes: async (parent, { limit = 0 }, ctx) => {
      const { Anime } = ctx.models;
      const anime = await Anime.find({}).limit(limit);
      return anime;
    },
    anime: async (parent, { id }, ctx) => {
      const { Anime } = ctx.models;
      const anime = await Anime.findOne({ id });
      return anime;
    },
  },
  Mutation: {
    addAnime: async (parent, args, ctx) => {
      const { Anime, StudioRelation } = ctx.models;
      const { studioId, ...animeArgs } = args;
      const anime = new Anime(animeArgs);
      const newAnime = await anime.save();
      const studioRelation = new StudioRelation({ studio: studioId, anime: newAnime.id });
      await studioRelation.save();
      return newAnime;
    },
    editAnime: async (parent, { id, ...args }, ctx) => {
      const { Anime, StudioRelation } = ctx.models;
      const { studioId, ...animeArgs } = args;
      const anime = await Anime.findOneAndUpdate({ id }, animeArgs, { new: true });
      if (studioId) {
        await StudioRelation.findOneAndUpdate({ anime: anime.id }, { studio: studioId }, { new: true });
      }
      return anime;
    },
  },
};
