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
      other: [],
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
  {
    title: {
      romaji: 'Kono Subarashii Sekai ni Shukufuku wo! 2',
      russian: 'Этот замечательный мир! 2',
      english: 'KonoSuba: God\'s Blessing on This Wonderful World! 2',
      japanese: 'この素晴らしい世界に祝福を！ 2',
      other: [
        'Да благословят боги сей расчудесный мир! 2',
        'Give Blessings to This Wonderful World! 2',
      ],
    },
    description: {
      english: formatDescription(`
        Following a tragic accident, the game-loving shut-in Kazuma Satou was reborn in a parallel world. Though his dream of enjoying a new life as an adventurer in an RPG-inspired world and striving to be a hero didn't come true, he managed to get by in his new world. He was joined by Aqua, the goddess who accompanied him to the parallel world; Megumin, an arch wizard who can only use her magic once a day; and Darkness, a crusader whose attacks always miss. And so, along with his party of girls who have extremely advanced powers but unfortunately can't take full advantage of them, he managed to complete some quests here and there.

        Then, one day, after Kazuma's party saved the town of Axel from the mobile fortress Destroyer, a messenger from the capital came to tell Kazuma that he was suspected of the crime of subversion to the state! Where will the ordinary adventurer Kazuma's life in a parallel world lead him tomorrow?!
      `),
      russian: formatDescription(`
        Второй сезон аниме будет продолжать историю приключений неудачливого Казумы Сато в фэнтезийном RPG-мире с тремя бесполезными девушками в группе: Аквой — бывшей богиней, а ныне протоиереем, Мэгумин — волшебницей, которая может использовать одно заклинание в день, и Даркнесс — мазохисткой до мозга костей, мечтающей о наказаниях и избиениях. Получится ли у этой команды добиться успеха и свергнуть Короля демонов или нет? Поживём — увидим.
      `),
    },
    type: 'tv',
    episodes: 10,
    status: 'aired',
    season: 'spring',
    source: 'novel',
    genres: [2, 4, 20, 37, 16, 10].map(id => find(genres, { id })),
    duration: 23,
    rating: 'pg-13',
    stats: {
      score: 8.37,
      ranked: 189,
      members: 564521,
    },
    videos: [
      {
        title: 'PV',
        url: 'https://www.youtube.com/embed/9jVxMt845AY?enablejsapi=1&wmode=opaque&autoplay=1',
        thumbnail: 'https://i.ytimg.com/vi/9jVxMt845AY/mqdefault.jpg',
      },
      {
        title: 'CM',
        url: 'https://www.youtube.com/embed/8bZPaKDmg5o?enablejsapi=1&wmode=opaque&autoplay=1',
        thumbnail: 'https://i.ytimg.com/vi/8bZPaKDmg5o/mqdefault.jpg',
      },
    ],
    poster: 'https://cdn.myanimelist.net/images/anime/2/83188l.jpg',
    cover: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/21699-XOn3cvDFszZ3.jpg',
    externalLinks: [],
  },
  {
    title: {
      romaji: 'Mob Psycho 100 II',
      russian: 'Моб Психо 100 2',
      english: 'Mob Psycho 100',
      japanese: 'モブサイコ100 II',
      other: [
        'Mob Psycho 100 2nd Season',
        'Mob Psycho Hyaku',
        'Mob Psycho One Hundred',
      ],
    },
    description: {
      english: formatDescription(`
        The second season of Mob Psycho 100.

        Kageyama is an ordinary 8th grader who just wants to live a normal life. Although he can disappear in the crowd in a flash, he was actually the most powerful psychic. The lives of those around Mob and his numerous feelings that softly piles up for the eventual explosion. The mysterious group "Claw" stands before him once again. In the midst of his youthful days, where will his roaring heart take him!?
      `),
      russian: formatDescription(`
        Казалось бы, иметь сверхспособности — мечта едва ли не каждого человека на Земле, однако главный герой этой истории такой ход мыслей не поддерживает. Ах да, знакомьтесь, это Шигэо Кагэяма, он же Моб, всего лишь восьмиклассник, с детства обладающий экстрасенсорными способностями.

        С большой силой приходит большая ответственность, и Моб, как никто другой, это понимает, ведь когда шкала его раздражённости достигнет отметки в 100, он впадает в неконтролируемое состояние, в котором способен разрушить всё, что находится поблизости. Но в мире, полном различных раздражителей, есть и любовь. У Шигэо её зовут Цубоми. И она, пожалуй, самая красивая девушка не только в классе, но и во всей школе. Пытаясь привлечь внимание одноклассницы, Моб постоянно использует различные трюки, которые скоро надоедают девушке из-за своей однообразности.

        Юный Моб примыкает к Аратаке Рэйгэну, экстрасенсу-мошеннику, который пообещал добиться контроля над способностями. Теперь изгнание злых духов стало частью повседневной, монотонной жизни Моба. Однако вся та энергия, которую он скрывает, едва ли является верхушкой айсберга: если его огромный потенциал и безудержные эмоции будут высвобождены, произойдёт катастрофическое событие, способное сделать Шигэо Кагэяму неузнаваемо опасным экстрасенсом. Прогрессия к взрыву Моба возрастает, и попытка остановить его становится невыполнимой миссией.

        Новый сезон, а Моб вместе с наставником всё так же продолжают ловить злых духов и различного рода нечисть. В этот раз им предстоит встретиться с куда более опасными противниками. Не стоит забывать и о клубе по улучшению физического здоровья, в котором состоит Моб и который получит ещё больше экранного времени.
      `),
    },
    type: 'tv',
    episodes: 13,
    status: 'aired',
    season: 'spring',
    source: 'manga',
    genres: [1, 36, 4, 37].map(id => find(genres, { id })),
    duration: 24,
    rating: 'pg-13',
    stats: {
      score: 8.97,
      ranked: 18,
      members: 311183,
    },
    videos: [
      {
        title: 'PV 2',
        url: 'https://www.youtube.com/embed/Pr43Sayk37s?enablejsapi=1&wmode=opaque&autoplay=1',
        thumbnail: 'https://i.ytimg.com/vi/Pr43Sayk37s/mqdefault.jpg',
      },
      {
        title: 'PV 1',
        url: 'https://www.youtube.com/embed/7tlC1ugqdkY?enablejsapi=1&wmode=opaque&autoplay=1',
        thumbnail: 'https://i.ytimg.com/vi/7tlC1ugqdkY/mqdefault.jpg',
      },
    ],
    poster: 'https://cdn.myanimelist.net/images/anime/1918/96303l.jpg',
    cover: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/101338-OT16VrOj0KuS.jpg',
    externalLinks: [],
  },
  {
    title: {
      romaji: 'Sarazanmai',
      russian: 'Сарадзаммай',
      english: 'Sarazanmai',
      japanese: 'さらざんまい',
      other: [],
    },
    description: {
      english: formatDescription(`
        Kazuki Yasaka, an 8th grader living in Asakusa, is turned into a Kappa along with his classmates Toi and Enta by a mysterious creature named Keppi, after they break inadvertently a statue of a Kappa, the guardian god of the city.

        They are then ordered by Keppi, who claims to be the first heir to the throne of Kappa Kingdom, to fight against the Kapa-zombies, bioarms created by his enemies, if they want to return to their human form. In order to kill them, they have to make a specific sound called "Sarazanmai" which is produced only when the three of them are united, but the three boys cannot connect at first.

        In addition, one of their secrets is revealed to each other every time they emit the sound!

        They finally accept to take risks to collect the "Plates of Hope," given by Keppi when they defeat the Kapa-zombies, and which can make their wishes come true. However, some trouble occurs over the plates...! Along the course of the fights against the Kapa-zombies, their fierce past and inner conflicts keep getting revealed. This is the sarcastic fantasy of three boys who don't feel connected to their important ones, getting to realize the real meaning of bonds.
      `),
      russian: formatDescription(`
        Место действия этой истории — Асакуса, один из кварталов Токио.
        Однажды трое учеников второго года средней школы — Кадзуки Ясака, Той Кудзи и Энта Дзиннай — встречают Кэппи, странное существо, очень похожее на каппу, и по совместительству самопровозглашённого наследника трона королевства Каппа. Кэппи забирает у ребят сирикодама (яп. 尻子玉, шарик из плоти, мифический орган, который каппа крадёт у людей через анус), тем самым превращая их в капп. Теперь, чтобы вернуть прежний облик, мальчики должны соединиться «неким способом» и принести Кэппи сирикодама зомби. Смогут ли ребята соединиться и забрать сирикодама у зомби? Тем временем двое полицейских, Рэо Нибоси и Мабу Акуцу, что-то замышляют в своей будке.
      `),
    },
    type: 'tv',
    episodes: 11,
    status: 'airing',
    season: 'summer',
    source: 'original',
    genres: [1, 10, 37].map(id => find(genres, { id })),
    duration: 22,
    rating: 'pg-13',
    stats: {
      score: 7.25,
      ranked: 2708,
      members: 44120,
    },
    videos: [
      {
        title: 'Teaser 3',
        url: 'https://www.youtube.com/embed/_QPnvGdkbnc?enablejsapi=1&wmode=opaque&autoplay=1',
        thumbnail: 'https://i.ytimg.com/vi/_QPnvGdkbnc/mqdefault.jpg',
      },
      {
        title: 'Teaser 2',
        url: 'https://www.youtube.com/embed/mZK_2m1YFXQ?enablejsapi=1&wmode=opaque&autoplay=1',
        thumbnail: 'https://i.ytimg.com/vi/mZK_2m1YFXQ/mqdefault.jpg',
      },
      {
        title: 'Teaser 1',
        url: 'https://www.youtube.com/embed/05j6ZeDt7uE?enablejsapi=1&wmode=opaque&autoplay=1',
        thumbnail: 'https://i.ytimg.com/vi/05j6ZeDt7uE/mqdefault.jpg',
      },
      {
        title: 'Short PV (OP ver.)',
        url: 'https://www.youtube.com/embed/hIi_qkhPALQ?enablejsapi=1&wmode=opaque&autoplay=1',
        thumbnail: 'https://i.ytimg.com/vi/hIi_qkhPALQ/mqdefault.jpg',
      },
      {
        title: 'Short PV (ED ver.)',
        url: 'https://www.youtube.com/embed/oUb-lMzzTVg?enablejsapi=1&wmode=opaque&autoplay=1',
        thumbnail: 'https://i.ytimg.com/vi/oUb-lMzzTVg/mqdefault.jpg',
      },
      {
        title: 'PV 6',
        url: 'https://www.youtube.com/embed/MbQHJA_QT1g?enablejsapi=1&wmode=opaque&autoplay=1',
        thumbnail: 'https://i.ytimg.com/vi/MbQHJA_QT1g/mqdefault.jpg',
      },
      {
        title: 'PV 5',
        url: 'https://www.youtube.com/embed/p_1QGHXyK14?enablejsapi=1&wmode=opaque&autoplay=1',
        thumbnail: 'https://i.ytimg.com/vi/p_1QGHXyK14/mqdefault.jpg',
      },
      {
        title: 'PV 4',
        url: 'https://www.youtube.com/embed/HyymMW7k1hc?enablejsapi=1&wmode=opaque&autoplay=1',
        thumbnail: 'https://i.ytimg.com/vi/HyymMW7k1hc/mqdefault.jpg',
      },
      {
        title: 'PV 3',
        url: 'https://www.youtube.com/embed/ieiiW_CtaA0?enablejsapi=1&wmode=opaque&autoplay=1',
        thumbnail: 'https://i.ytimg.com/vi/ieiiW_CtaA0/mqdefault.jpg',
      },
      {
        title: 'PV 2',
        url: 'https://www.youtube.com/embed/plHqlAczz7w?enablejsapi=1&wmode=opaque&autoplay=1',
        thumbnail: 'https://i.ytimg.com/vi/plHqlAczz7w/mqdefault.jpg',
      },
      {
        title: 'PV 1',
        url: 'https://www.youtube.com/embed/lIY81qVw5Zo?enablejsapi=1&wmode=opaque&autoplay=1',
        thumbnail: 'https://i.ytimg.com/vi/lIY81qVw5Zo/mqdefault.jpg',
      },
    ],
    poster: 'https://cdn.myanimelist.net/images/anime/1159/100455l.jpg',
    cover: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/101261-B4K4ZVf3X9oY.jpg',
    externalLinks: [],
  },
  {
    title: {
      romaji: 'Midara na Ao-chan wa Benkyou ga Dekinai',
      russian: 'Похотливая Ао не может учиться',
      english: 'Ao-chan Can\'t Study!',
      japanese: '淫らな青ちゃんは勉強ができない',
      other: [],
    },
    description: {
      english: formatDescription(`
        When Ao was in kindergarten, she smiled ear-to-ear as she told her classmates how her father, a bestselling erotic author, chose her name: "A as in apple and O as in orgy!" That day still haunts her ten years later as she studies with a single goal in mind: to get into an elite university and achieve independence from her father once and for all. She has no youth to misspend and no time to think about boys...until her classmate, "King Normie" Kijima, approaches her with a shocking confession of love. She tries to lose Kijima, but he just can't take a hint...and as her mind runs wild with dirty thoughts, she realizes her father has totally influenced her!
      `),
      russian: formatDescription(`
        Когда Ао ещё ходила в детский сад, она без тени сомнений поделилась с друзьями, как её отец, популярный автор эротики, выбрал ей имя: «А — как в "яблоке" и О — как в "оргии"».
        События этого дня преследуют её даже через десять лет, когда она, одержимая желанием получить от отца независимость, упорно учится, чтобы поступить в элитный университет.
        Девушка совсем не думает о парнях... до тех пор, пока её одноклассник Кидзима по прозвищу «Король Норми» не шокирует её признанием в любви. Ао некоторое время пытается вежливо отказать Кидзиме, но он не понимает намёков. Постепенно мысли Ао наполняются пошлыми фантазиями, и она однажды осознаёт, что не так уж далеко ушла от своего отца.
      `),
    },
    type: 'tv',
    episodes: null,
    status: 'airing',
    season: 'summer',
    source: 'manga',
    genres: [4, 22, 9, 27].map(id => find(genres, { id })),
    duration: 12,
    rating: null,
    stats: {
      score: 6.79,
      ranked: 4584,
      members: 59307,
    },
    videos: [
      {
        title: 'PV 2',
        url: 'https://www.youtube.com/embed/IFJnE3XgeCs?enablejsapi=1&wmode=opaque&autoplay=1',
        thumbnail: 'https://i.ytimg.com/vi/IFJnE3XgeCs/mqdefault.jpg',
      },
      {
        title: 'PV 1',
        url: 'https://www.youtube.com/embed/3Tw3U7cayic?enablejsapi=1&wmode=opaque&autoplay=1',
        thumbnail: 'https://i.ytimg.com/vi/3Tw3U7cayic/mqdefault.jpg',
      },
    ],
    poster: 'https://cdn.myanimelist.net/images/anime/1718/98214l.jpg',
    cover: 'https://s4.anilist.co/file/anilistcdn/media/anime/banner/105989-t9vIfvSf8TkI.jpg',
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
