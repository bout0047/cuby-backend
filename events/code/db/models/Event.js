import { Sequelize } from 'sequelize';
import { sequelize } from '../db.js';

const Event = sequelize.define('Event', {
  eventid: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
  location: {
    type: Sequelize.STRING,
  },
  date: {
    type: Sequelize.STRING,
  },
  time: {
    type: Sequelize.STRING,
  },
  duration: {
    type: Sequelize.INTEGER,
  },
  link: {
    type: Sequelize.STRING,
  },
});

sequelize.sync();

export { Event };
