import { Event } from '../db/models/Event.js';

const tempResponse = {
  meta: {
    message: 'this route is not implemented yet',
  },
  data: {},
};

export async function getEvents(req, res, next) {
  try {
    const events = await Event.findAll();
    const eventsData = {
      events: events.map(event => event.toJSON()),
    };

    const response = { ...tempResponse, data: eventsData };

    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
}

export async function createEvent(req, res, next) {
  try {
    const body = req.body;

    if (body.name && body.date) {
      const newEvent = await Event.create({
        name: body.name,
        description: body.description,
        location: body.location,
        date: body.date,
        time: body.time,
        duration: body.duration,
        link: body.link,
      });

      res.status(200).send(`Event created: ${newEvent.name}`);
    } else {
      res.status(400).send('Name and date are required to create an event');
    }
  } catch (err) {
    next(err);
  }
}
