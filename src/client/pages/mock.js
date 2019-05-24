import find from 'lodash/find';

const formatDescription = str => str.replace(/^\s*[\r\n]/gm, '');

export const genres = [
  { id: 1, key: 'action' },
  { id: 2, key: 'adventure' },
  { id: 3, key: 'cars' },
  { id: 4, key: 'comedy' },
  { id: 5, key: 'dementia' },
  { id: 6, key: 'demons' },
  { id: 7, key: 'mystery' },
  { id: 8, key: 'drama' },
  { id: 9, key: 'ecchi' },
  { id: 10, key: 'fantasy' },
  { id: 11, key: 'game' },
  { id: 12, key: 'hentai' },
  { id: 13, key: 'historical' },
  { id: 14, key: 'horror' },
  { id: 15, key: 'kids' },
  { id: 16, key: 'magic' },
  { id: 17, key: 'martialArts' },
  { id: 18, key: 'mecha' },
  { id: 19, key: 'music' },
  { id: 20, key: 'parody' },
  { id: 21, key: 'samurai' },
  { id: 22, key: 'romance' },
  { id: 23, key: 'school' },
  { id: 24, key: 'sciFi' },
  { id: 25, key: 'shoujo' },
  { id: 26, key: 'shoujoAi' },
  { id: 27, key: 'shounen' },
  { id: 28, key: 'shounenAi' },
  { id: 29, key: 'space' },
  { id: 30, key: 'sports' },
  { id: 31, key: 'superPower' },
  { id: 32, key: 'vampire' },
  { id: 33, key: 'yaoi' },
  { id: 34, key: 'yuri' },
  { id: 35, key: 'harem' },
  { id: 36, key: 'sliceOfLife' },
  { id: 37, key: 'supernatural' },
  { id: 38, key: 'military' },
  { id: 39, key: 'police' },
  { id: 40, key: 'psychological' },
  { id: 41, key: 'thriller' },
  { id: 42, key: 'seinen' },
  { id: 43, key: 'josei' },
];

const rawAnimes = [
  {
    title: {
      romaji: 'Carole & Tuesday',
      russian: 'Кэрол и Тьюсдей',
      english: 'Carole & Tuesday',
      japanese: 'キャロル&チューズデイ',
    },
    description: {
      english: formatDescription(`
        Fifty years have passed since mankind began migrating to the new frontier: Mars. It's an age where most culture is produced by AI, and people are content to be passive consumers.

        There's a girl. Scrapping a living in the metropolis of Alba City, she's working part time while trying to become a musician. She's always felt like something is missing. Her name is Carole.

        There's a girl. Born to a wealthy family in the provincial town of Herschel City, she dreams of becoming a musician, but nobody around her understands. She feels like the loneliest person in the world. Her name is Tuesday.

        A chance meeting brings them together. They want to sing. They want to make music. Together, they feel like they just might have a chance. The two of them may only create a tiny wave. But that wave will eventually grow into something larger...
      `),
      russian: formatDescription(`
        Прошло уже пятьдесят лет с тех пор, как человечество начало эмигрировать на Марс. В это время люди превратились в пассивных потребителей, ведь все их нужды теперь обеспечивал ИИ.
        Там, на Марсе, в центре города Альба-Сити выживает девушка по имени Кэрол. Она усердно трудится неполный рабочий день в надежде однажды стать музыкантом, но ей чего-то не хватает.
        В провинциальном марсианском городке Хершел-Сити живёт другая девушка — Тьюсдей. Она из обеспеченной семьи и тоже мечтает стать музыкантом, однако никто не понимает её, ведь музыку теперь пишет ИИ, а не люди. Тьюсдей чувствует себя самым одиноким человеком в мире.
        Случайная встреча сводит девушек вместе. Они обе хотят петь. Обе мечтают создавать музыку. И вместе у них наконец-то появляется шанс.
        Двое могут создать лишь крохотную волну, но эта волна в конце концов может перерасти в нечто большее...
      `),
    },
    type: 'tv',
    episodes: 24,
    status: 'airing',
    season: 'summer',
    source: 'original',
    genres: [24, 19, 8, 22].map(id => find(genres, { id })),
    duration: 22,
    rating: null,
    stats: {
      score: 8.31,
      ranked: 228,
      members: 74679,
    },
    videos: [
      {
        title: 'PV',
        url: 'https://www.youtube.com/embed/CBak9m0bcB0?enablejsapi=1&wmode=opaque&autoplay=1',
        thumbnail: 'https://i.ytimg.com/vi/CBak9m0bcB0/mqdefault.jpg',
      },
      {
        title: 'CM',
        url: 'https://www.youtube.com/embed/9fScj6XLilI?enablejsapi=1&wmode=opaque&autoplay=1',
        thumbnail: 'https://i.ytimg.com/vi/9fScj6XLilI/mqdefault.jpg',
      },
      {
        title: 'Announcement',
        url: 'https://www.youtube.com/embed/YuXya_0K4jQ?enablejsapi=1&wmode=opaque&autoplay=1',
        thumbnail: 'https://i.ytimg.com/vi/YuXya_0K4jQ/mqdefault.jpg',
      },
    ],
    poster: 'https://cdn.myanimelist.net/images/anime/1611/96157l.jpg',
    cover: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/101281-omdu2Vio02xt.jpg',
    externalLinks: [],
  },
];

export const animes = rawAnimes.map((e, i) => {
  const id = i + 1;
  return {
    id,
    ...e,
    link: `/anime/${id}`, // computed field
  };
});
