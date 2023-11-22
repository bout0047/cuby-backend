import { Event } from '../models/Event.js';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const eventsData = [
      {
        name: 'Event 1',
        description: 'Description for Event 1',
        location: 'Location 1',
        date: '2023-12-01',
        time: '18:00',
        duration: 120,
        link: 'https://example.com/event1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Event 2',
        description: 'Description for Event 2',
        location: 'Location 2',
        date: '2023-12-10',
        time: '19:30',
        duration: 90,
        link: 'https://example.com/event2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Event 3',
        description: 'Description for Event 3',
        location: 'Location 3',
        date: '2023-12-15',
        time: '14:00',
        duration: 180,
        link: 'https://example.com/event3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Event 4',
        description: 'Description for Event 4',
        location: 'Location 4',
        date: '2023-12-20',
        time: '20:45',
        duration: 150,
        link: 'https://example.com/event4',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    return queryInterface.bulkInsert('Events', eventsData);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Events', null, {});
  },
};
