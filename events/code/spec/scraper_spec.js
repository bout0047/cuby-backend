import axios from 'axios';
import cheerio from 'cheerio';
import isOnline from 'is-online';
import scrapeEvents from '../scraper.js';

describe('scrapeEvents', () => {
  let isOnlineSpy;
  let axiosGetSpy;

  beforeEach(() => {
    // Create spies for the functions you want to mock
    isOnlineSpy = spyOn(isOnline, 'default');
    axiosGetSpy = spyOn(axios, 'get');
  });

  it('should resolve with empty array if not online', async () => {
    // Mock isOnline to return false
    isOnlineSpy.and.resolveTo(false);

    const result = await scrapeEvents();
    expect(result).toEqual([]);
  });

  it('should scrape events successfully when online', async () => {
    // Mock isOnline to return true
    isOnlineSpy.and.resolveTo(true);

    // Mock axios.get to return a response with mocked data
    const mockedResponse = {
      data: '<html><body><div class="event-item">Mocked Event</div></body></html>',
    };
    axiosGetSpy.and.resolveTo(mockedResponse);

    const result = await scrapeEvents();
    expect(result).toHaveLength(1);
    expect(result[0].eventTitleScraped).toEqual('Mocked Event');
  });

  it('should handle errors during scraping', async () => {
    // Mock isOnline to return true
    isOnlineSpy.and.resolveTo(true);

    // Mock axios.get to throw an error
    axiosGetSpy.and.rejectWith(new Error('Mocked error'));

    await expect(scrapeEvents()).rejects.toThrowError('Mocked error');
  });
});
