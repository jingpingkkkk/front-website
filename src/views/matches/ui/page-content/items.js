import { nanoid } from 'nanoid';

const matchItems = [
  {
    _id: nanoid(),
    name: 'Match Odds',
    eventName: 'Northern Superchargers Women v Welsh Fire Women',
    runners: [
      {
        _id: nanoid(),
        name: 'Northern Superchargers Women',
        priority: 0,
        back: [
          { level: 2, price: 2.12, size: 76 },
          { level: 1, price: 2.1, size: 242 },
          { level: 0, price: 2.08, size: 107 },
        ],
        lay: [
          { level: 0, price: 2.16, size: 32 },
          { level: 1, price: 2.18, size: 105 },
          { level: 2, price: 2.2, size: 46 },
        ],
      },
      {
        _id: nanoid(),
        name: 'Welsh Fire Women',
        priority: 1,
        back: [
          { level: 2, price: 1.87, size: 37 },
          { level: 1, price: 1.86, size: 45 },
          { level: 0, price: 1.85, size: 79 },
        ],
        lay: [
          { level: 0, price: 1.89, size: 64 },
          { level: 1, price: 1.9, size: 80 },
          { level: 2, price: 1.91, size: 244 },
        ],
      },
    ],
  },
];
export default matchItems;
