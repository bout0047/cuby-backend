import { getCalendarEntries, createCalendarEntry, updateEntry, deleteEntry } from '../controllers/calendarController.mjs';
import CalendarEntry from '../models/CalendarEntry.mjs';
import pool from '../db/index.js';

describe('getCalendarEntries', () => {
  it('should fetch calendar entries for a given user', async () => {
    const poolSpy = jasmine.createSpyObj('pool', ['query']);
    
    // Replace the original pool with the spy
    spyOn(poolModule, 'default').and.returnValue(poolSpy);
    const userId = 1;
    const entries = await getCalendarEntries({ userId });
    expect(entries).toBeTruthy();
    expect(entries.length).toBeGreaterThan(0);
  });
});

describe('createCalendarEntry', () => {
  it('should create a new calendar entry with eventId', async () => {
    const userId = 2;
    const eventId = 3;
    const datetime = new Date();
    const newEntry = await createCalendarEntry({ userId, eventId, datetime });
    expect(newEntry).toBeTruthy();
    expect(newEntry.eventId).toBe(eventId);
    expect(newEntry.userId).toBe(userId);
    expect(newEntry.datetime).toEqual(datetime);
  });

  it('should create a new calendar entry with name', async () => {
    const userId = 3;
    const name = 'My Event';
    const datetime = new Date();
    const newEntry = await createCalendarEntry({ userId, name, datetime });
    expect(newEntry).toBeTruthy();
    expect(newEntry.name).toBe(name);
    expect(newEntry.userId).toBe(userId);
    expect(newEntry.datetime).toEqual(datetime);
  });
});

describe('updateEntry', () => {
  it('should update the datetime of a calendar entry', async () => {
    const eventId = 4;
    const userId = 4;
    const updatedDateTime = new Date();
    const updatedEntry = await updateEntry({ eventId, datetime: updatedDateTime });
    expect(updatedEntry).toBeTruthy();
    expect(updatedEntry.datetime).toEqual(updatedDateTime);
  });
});

describe('deleteEntry', () => {
  it('should delete a calendar entry with the given eventId and userId', async () => {
    const eventId = 5;
    const userId = 5;
    await deleteEntry({ eventId, userId });
    const result = await pool.query('SELECT * FROM calendar_entries WHERE userId = $1 AND eventId = $2', [userId, eventId]);
    expect(result.rows).toEqual([]);
  });
});
