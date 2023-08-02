import { nanoid } from 'nanoid';

const sideMenuItems = [
  // Cricket
  {
    id: nanoid(10),
    path: '/',
    image: 'images/Cricketball.png',
    label: 'Cricket',
    active: true,
    subMenu: [
      {
        id: nanoid(10),
        path: '/',
        label: 'Cricket Team 1',
        subMenu: [
          {
            id: nanoid(10),
            path: '/',
            label: 'Match 1',
          },
        ],
      },
      {
        id: nanoid(10),
        path: '/',
        label: 'Cricket Team 2',
      },
      {
        id: nanoid(10),
        path: '/',
        label: 'Cricket Team 3',
      },
    ],
  },

  // Football
  {
    id: nanoid(10),
    path: '/',
    image: 'images/Football.png',
    label: 'Soccer',
    subMenu: [
      {
        id: nanoid(10),
        path: '/',
        label: 'Soccer Team 1',
      },
    ],
  },

  // Tennis
  {
    id: nanoid(10),
    path: '/',
    image: 'images/Tennis.png',
    label: 'Tennis',
    subMenu: [
      {
        id: nanoid(10),
        path: '/',
        label: 'Tennis Team 1',
      },
    ],
  },

  // Basketball
  {
    id: nanoid(10),
    path: '/',
    image: 'images/Basketball.png',
    label: 'Basketball',
    subMenu: [
      {
        id: nanoid(10),
        path: '/',
        label: 'Basketball Team 1',
      },
    ],
  },

  // Rugby
  {
    id: nanoid(10),
    path: '/',
    image: 'images/Rugbyball.png',
    label: 'Rugby',
    subMenu: [
      {
        id: nanoid(10),
        path: '/',
        label: 'Rugby Team 1',
      },
    ],
  },

  // Baseball
  {
    id: nanoid(10),
    path: '/',
    image: 'images/Baseball-01.png',
    label: 'Baseball',
    subMenu: [
      {
        id: nanoid(10),
        path: '/',
        label: 'Baseball Team 1',
      },
    ],
  },

  // Horse racing
  {
    id: nanoid(10),
    path: '/',
    image: 'images/hource-racing.png',
    label: 'Horse Racing',
  },

  // Greyhound racing
  {
    id: nanoid(10),
    path: '/',
    image: 'images/greyhound-racing.png',
    label: 'Greyhound Racing',
  },

  // Virtual sports
  {
    id: nanoid(10),
    path: '/',
    image: 'images/Valleyball-01 1.png',
    label: 'Volleyball',
  },

  // Boxing
  {
    id: nanoid(10),
    path: '/',
    image: 'images/Boxing.png',
    label: 'Boxing',
  },

  // Ice Hockey
  {
    id: nanoid(10),
    path: '/',
    image: 'images/ice-hocky.png',
    label: 'Ice Hockey',
  },

  // Snooker
  {
    id: nanoid(10),
    path: '/',
    image: 'images/Snooker.png',
    label: 'Snooker',
  },

  // Racing
  {
    id: nanoid(10),
    path: '/',
    image: 'images/Bike.png',
    label: 'Racing',
  },

  // Chess
  {
    id: nanoid(10),
    path: '/',
    image: 'images/chess.png',
    label: 'Chess',
  },

  // E Gaming
  {
    id: nanoid(10),
    path: '/',
    image: 'images/e-game.png',
    label: 'E Gaming',
  },
];

export default sideMenuItems;
