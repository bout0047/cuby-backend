import axios from 'axios';
import * as cheerio from 'cheerio';
import scrapeEvents from '../scraper.js';

describe('scrapeEvents', () => {
  let axiosGetSpy;
  let cheerioLoadSpy;

  beforeEach(() => {
    // Create spies for the imported modules and reset them before each test
    axiosGetSpy = spyOn(axios, 'get');
    cheerioLoadSpy = spyOn(cheerio, 'load');

    axiosGetSpy.and.returnValue(Promise.resolve({ data: '<html><body><div class="event-item">Mocked Event</div></body></html>' }));

    // Mock cheerio.load to return an object with a map function
    cheerioLoadSpy.and.returnValue({
      map: jasmine.createSpy(),
      find: jasmine.createSpy().and.returnValue({
        text: jasmine.createSpy().and.returnValue('Mocked Event'),
        find: jasmine.createSpy().and.returnValue({
          text: jasmine.createSpy().and.returnValue('Mocked Place')
        })
      }),
      text: jasmine.createSpy().and.returnValue('Mocked Date'),
      data: jasmine.createSpy().and.returnValue('<div class="event-description-html">Mocked Description</div>'),
    });
  });

  it('should scrape events successfully', async () => {
    // Mock the Cheerio functions to return the expected values
    cheerioLoadSpy().find.and.returnValue({ text: jasmine.createSpy() });
    cheerioLoadSpy().text.and.returnValue('Mocked Date');
    cheerioLoadSpy().data.and.returnValue('<div class="event-description-html">Mocked Description</div>');
    cheerioLoadSpy().find().text.and.returnValue('Mocked Event');
    cheerioLoadSpy().find().find().text.and.returnValue('Mocked Place');
    axiosGetSpy.and.returnValue(Promise.resolve({ data: '<html><body><div class="event-banner-image" src="Mocked Image URL"></div></body></html>' }));

    const result = await scrapeEvents();

    // Assert that the result matches the expected data
    expect(result).toEqual([mockedEventData]);
  });

  // Add more tests as needed

  afterEach(() => {
    // Restore the original functions after each test
    axiosGetSpy.and.callThrough();
    cheerioLoadSpy.and.callThrough();
  });
});
