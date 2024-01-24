// Import dependencies
import * as eventsController from '../controllers/eventsController.mjs';
import pool from '../db/index.js';
import Event from '../models/Event.mjs';

describe('Event Controller', () => {
  let mockPool;
  let mockRes;

  beforeEach(() => {
    mockPool = jasmine.createSpyObj('pool', ['query']);
    mockRes = {
      json: jasmine.createSpy('json'),
      status: jasmine.createSpy('status').and.returnValue({ json: jasmine.createSpy('json') }),
    };

    spyOn(pool, 'query').and.returnValue(mockPool);
  });

  const sampleEvent = {
    id: 1,
    name: 'Sample Event',
    datetime: '2024-01-01T12:00:00Z',
    location: 'Sample Location',
    description: 'Sample Description',
    link: 'https://sample-link.com',
  };

  afterEach(() => {
    // Reset spies after each test
    mockPool.query.calls.reset();
    mockRes.json.calls.reset();
    mockRes.status.calls.reset();
  });

  describe('getAllEvents', () => {
    it('should get all events', async () => {
      // Set up the mock response from the database
      mockPool.query.and.returnValue({ rows: [sampleEvent] });

      // Call the controller function
      await eventsController.getAllEvents({}, mockRes);

      // Check if the controller behaves as expected
      expect(mockRes.json).toHaveBeenCalledWith([jasmine.any(Event)]);
    });

    it('should handle errors when fetching all events', async () => {
      const errorMessage = 'Database error';
      mockPool.query.and.throwError(errorMessage);

      // Call the controller function
      await eventsController.getAllEvents({}, mockRes);

      // Check if the controller handles errors correctly
      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({ error: 'Internal server fetch error' });
    });
  });

  describe('getEventById', () => {
    // Similar setup for getEventById
    // ...

    // Adjust the queries based on your needs
  });

  describe('createEvent', () => {
    // Similar setup for createEvent
    // ...

    // Adjust the queries based on your needs
  });

  describe('updateEvent', () => {
    // Similar setup for updateEvent
    // ...

    // Adjust the queries based on your needs
  });

  describe('deleteEvent', () => {
    // Similar setup for deleteEvent
    // ...

    // Adjust the queries based on your needs
  });
});
