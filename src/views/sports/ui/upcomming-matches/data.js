import moment from 'moment';
import { nanoid } from 'nanoid';

const availableSports = [
  {
    id: nanoid(),
    name: 'InPlay',
    image: 'images/in-play.png',
    total: Math.floor(Math.random() * 100) + 50,
    outOf: Math.floor(Math.random() * 40) + 10,
    matches: [
      {
        eventOn: moment()
          .add(Math.random() * 10, 'days')
          .fromNow(),
        name: 'Hampshire vs Somerset',
        league: 'Championship League',
        odds: [
          { back: Math.random() * 2 + 1, lay: Math.random() * 2 + 2 },
          { back: Math.random() * 2 + 1, lay: Math.random() * 2 + 2 },
          { back: Math.random() * 2 + 1, lay: Math.random() * 2 + 2 },
        ],
      },
      {
        eventOn: moment()
          .add(Math.random() * 10, 'days')
          .fromNow(),
        name: 'Hampshire vs Somerset',
        league: 'Championship League',
        odds: [
          { back: Math.random() * 2 + 1, lay: Math.random() * 2 + 2 },
          { back: Math.random() * 2 + 1, lay: Math.random() * 2 + 2 },
          { back: Math.random() * 2 + 1, lay: Math.random() * 2 + 2 },
        ],
      },
      {
        eventOn: moment()
          .add(Math.random() * 10, 'days')
          .fromNow(),
        name: 'Hampshire vs Somerset',
        league: 'Championship League',
        odds: [
          { back: Math.random() * 2 + 1, lay: Math.random() * 2 + 2 },
          { back: Math.random() * 2 + 1, lay: Math.random() * 2 + 2 },
          { back: Math.random() * 2 + 1, lay: Math.random() * 2 + 2 },
        ],
      },
    ],
  },
  {
    id: nanoid(),
    name: 'Cricket',
    image: 'images/Cricketball.png',
    total: Math.floor(Math.random() * 100) + 50,
    outOf: Math.floor(Math.random() * 40) + 10,
    matches: [
      {
        eventOn: moment()
          .add(Math.random() * 10, 'days')
          .fromNow(),
        name: 'Hampshire vs Somerset',
        league: 'Championship League',
        odds: [
          { back: Math.random() * 2 + 1, lay: Math.random() * 2 + 2 },
          { back: Math.random() * 2 + 1, lay: Math.random() * 2 + 2 },
          { back: Math.random() * 2 + 1, lay: Math.random() * 2 + 2 },
        ],
      },
      {
        eventOn: moment()
          .add(Math.random() * 10, 'days')
          .fromNow(),
        name: 'Hampshire vs Somerset',
        league: 'Championship League',
        odds: [
          { back: Math.random() * 2 + 1, lay: Math.random() * 2 + 2 },
          { back: Math.random() * 2 + 1, lay: Math.random() * 2 + 2 },
          { back: Math.random() * 2 + 1, lay: Math.random() * 2 + 2 },
        ],
      },
      {
        eventOn: moment()
          .add(Math.random() * 10, 'days')
          .fromNow(),
        name: 'Hampshire vs Somerset',
        league: 'Championship League',
        odds: [
          { back: Math.random() * 2 + 1, lay: Math.random() * 2 + 2 },
          { back: Math.random() * 2 + 1, lay: Math.random() * 2 + 2 },
          { back: Math.random() * 2 + 1, lay: Math.random() * 2 + 2 },
        ],
      },
    ],
  },
  {
    id: nanoid(),
    name: 'Soccer',
    image: 'images/Football.png',
    total: 78,
    outOf: 23,
    matches: [
      {
        eventOn: 'Today 3:00 PM',
        name: 'Hampshire vs Somerset',
        league: 'Championship League',
        odds: [
          { back: 1.01, lay: 1.02 },
          { back: 1.01, lay: 1.02 },
          { back: 1.01, lay: 1.02 },
        ],
      },
    ],
  },
  {
    id: nanoid(),
    name: 'Tennis',
    image: 'images/Tennis.png',
    total: 78,
    outOf: 23,
    matches: [
      {
        eventOn: 'Today 3:00 PM',
        name: 'Hampshire vs Somerset',
        league: 'Championship League',
        odds: [
          { back: 1.01, lay: 1.02 },
          { back: 1.01, lay: 1.02 },
          { back: 1.01, lay: 1.02 },
        ],
      },
    ],
  },
  {
    id: nanoid(),
    name: 'Basketball',
    image: 'images/Basketball.png',
    total: 78,
    outOf: 23,
    matches: [
      {
        eventOn: 'Today 3:00 PM',
        name: 'Hampshire vs Somerset',
        league: 'Championship League',
        odds: [
          { back: 1.01, lay: 1.02 },
          { back: 1.01, lay: 1.02 },
          { back: 1.01, lay: 1.02 },
        ],
      },
    ],
  },
  {
    id: nanoid(),
    name: 'Rugby',
    image: 'images/Rugbyball.png',
    total: 78,
    outOf: 23,
    matches: [
      {
        eventOn: 'Today 3:00 PM',
        name: 'Hampshire vs Somerset',
        league: 'Championship League',
        odds: [
          { back: 1.01, lay: 1.02 },
          { back: 1.01, lay: 1.02 },
          { back: 1.01, lay: 1.02 },
        ],
      },
    ],
  },
  {
    id: nanoid(),
    name: 'Baseball',
    image: 'images/Baseball-01.png',
    total: 78,
    outOf: 23,
    matches: [
      {
        eventOn: 'Today 3:00 PM',
        name: 'Hampshire vs Somerset',
        league: 'Championship League',
        odds: [
          { back: 1.01, lay: 1.02 },
          { back: 1.01, lay: 1.02 },
          { back: 1.01, lay: 1.02 },
        ],
      },
    ],
  },
  {
    id: nanoid(),
    name: 'Horse Racing',
    image: 'images/hource-racing.png',
    total: 78,
    outOf: 23,
    matches: [
      {
        eventOn: 'Today 3:00 PM',
        name: 'Hampshire vs Somerset',
        league: 'Championship League',
        odds: [
          { back: 1.01, lay: 1.02 },
          { back: 1.01, lay: 1.02 },
          { back: 1.01, lay: 1.02 },
        ],
      },
    ],
  },
  {
    id: nanoid(),
    name: 'Greyhound Racing',
    image: 'images/greyhound-racing.png',
    total: 78,
    outOf: 23,
    matches: [
      {
        eventOn: 'Today 3:00 PM',
        name: 'Hampshire vs Somerset',
        league: 'Championship League',
        odds: [
          { back: 1.01, lay: 1.02 },
          { back: 2.01, lay: 2.02 },
          { back: 3.01, lay: 3.02 },
        ],
      },
    ],
  },
  {
    id: nanoid(),
    name: 'Volleyball',
    image: 'images/Valleyball-01 1.png',
    total: 78,
    outOf: 23,
    matches: [
      {
        eventOn: 'Today 3:00 PM',
        name: 'Volleyball vs Somerset',
        league: 'Championship League',
        odds: [
          { back: 1.01, lay: 1.02 },
          { back: 2.01, lay: 2.02 },
          { back: 3.01, lay: 3.02 },
        ],
      },
    ],
  },
  {
    id: nanoid(),
    name: 'Boxing',
    image: 'images/Boxing.png',
    total: 78,
    outOf: 23,
    matches: [
      {
        eventOn: 'Today 3:00 PM',
        name: 'Boxing vs Somerset',
        league: 'Championship League',
        odds: [
          { back: 1.01, lay: 1.02 },
          { back: 2.01, lay: 2.02 },
          { back: 3.01, lay: 3.02 },
        ],
      },
    ],
  },
  {
    id: nanoid(),
    name: 'Ice Hockey',
    image: 'images/ice-hocky.png',
    total: 78,
    outOf: 23,
    matches: [
      {
        eventOn: 'Today 3:00 PM',
        league: 'Championship League',
        name: 'Ice Hockey vs Somerset',
        odds: [
          { back: 1.01, lay: 1.02 },
          { back: 2.01, lay: 2.02 },
          { back: 3.01, lay: 3.02 },
        ],
      },
    ],
  },
  {
    id: nanoid(),
    name: 'Snooker',
    image: 'images/Snooker.png',
    total: 78,
    outOf: 23,
    matches: [
      {
        eventOn: 'Today 3:00 PM',
        league: 'Championship League',
        name: 'Snooker vs Somerset',
        odds: [
          { back: 1.01, lay: 1.02 },
          { back: 2.01, lay: 2.02 },
          { back: 3.01, lay: 3.02 },
        ],
      },
    ],
  },
  {
    id: nanoid(),
    name: 'Racing',
    image: 'images/Bike.png',
    total: 78,
    outOf: 23,
    matches: [
      {
        eventOn: 'Today 3:00 PM',
        league: 'Championship League',
        name: 'Racing vs Somerset',
        odds: [
          { back: 1.01, lay: 1.02 },
          { back: 2.01, lay: 2.02 },
          { back: 3.01, lay: 3.02 },
        ],
      },
    ],
  },
  {
    id: nanoid(),
    name: 'Chess',
    image: 'images/chess.png',
    total: 78,
    outOf: 23,
    matches: [
      {
        eventOn: 'Today 3:00 PM',
        league: 'Championship League',
        name: 'Chess vs Somerset',
        odds: [
          { back: 1.01, lay: 1.02 },
          { back: 2.01, lay: 2.02 },
          { back: 3.01, lay: 3.02 },
        ],
      },
    ],
  },
  {
    id: nanoid(),
    name: 'E Gaming',
    image: 'images/e-game.png',
    total: 78,
    outOf: 23,
    matches: [
      {
        eventOn: 'Today 3:00 PM',
        league: 'Championship League',
        name: 'E Gaming vs Somerset',
        odds: [
          { back: 1.01, lay: 1.02 },
          { back: 2.01, lay: 2.02 },
          { back: 3.01, lay: 3.02 },
        ],
      },
    ],
  },
];

export default availableSports;
