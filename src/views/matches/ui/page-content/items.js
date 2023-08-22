import { nanoid } from 'nanoid';

const matchItems = [
  {
    id: nanoid(),
    eventName: 'Northern Superchargers Women v Welsh Fire Women',
    matches: [
      {
        runner: 'Northern Superchargers Women',
        back: [
          {
            level: 0,
            price: 2.12,
            size: 76,
          },
          {
            level: 1,
            price: 2.1,
            size: 242,
          },
          {
            level: 2,
            price: 2.08,
            size: 107,
          },
        ],
        lay: [
          {
            level: 0,
            price: 2.16,
            size: 32,
          },
          {
            level: 1,
            price: 2.18,
            size: 105,
          },
          {
            level: 2,
            price: 2.2,
            size: 46,
          },
        ],
      },
      {
        runner: 'Welsh Fire Women',
        back: [
          {
            level: 0,
            price: 1.87,
            size: 37,
          },
          {
            level: 1,
            price: 1.86,
            size: 45,
          },
          {
            level: 2,
            price: 1.85,
            size: 79,
          },
        ],
        lay: [
          {
            level: 0,
            price: 1.89,
            size: 64,
          },
          {
            level: 1,
            price: 1.9,
            size: 80,
          },
          {
            level: 2,
            price: 1.91,
            size: 244,
          },
        ],
      },
    ],
  },
  {
    id: nanoid(),
    eventName: 'Northern Superchargers v Welsh Fire',
    matches: [
      {
        runner: 'Northern Superchargers',
        back: [
          {
            level: 0,
            price: 2.06,
            size: 60,
          },
          {
            level: 1,
            price: 2.04,
            size: 244,
          },
          {
            level: 2,
            price: 2.02,
            size: 870,
          },
        ],
        lay: [
          {
            level: 0,
            price: 2.08,
            size: 6,
          },
          {
            level: 1,
            price: 2.1,
            size: 103,
          },
          {
            level: 2,
            price: 2.12,
            size: 102,
          },
        ],
      },
      {
        runner: 'Welsh Fire',
        back: [
          {
            level: 0,
            price: 1.92,
            size: 45,
          },
          {
            level: 1,
            price: 1.91,
            size: 64,
          },
          {
            level: 2,
            price: 1.9,
            size: 114,
          },
        ],
        lay: [
          {
            level: 0,
            price: 1.93,
            size: 32,
          },
          {
            level: 1,
            price: 1.94,
            size: 32,
          },
          {
            level: 2,
            price: 1.96,
            size: 28,
          },
        ],
      },
    ],
  },
];
export default matchItems;
