import axios from 'axios';
import * as cheerio from 'cheerio';
import * as scrapeEvents from '../scraper.js';

describe('scrapeEvents', () => {
  let axiosGetSpy;
  let cheerioLoadSpy;

  beforeEach(() => {
    axiosGetSpy = spyOn(axios, 'get');
    cheerioLoadSpy = spyOn(cheerio, 'load');

    axiosGetSpy.and.returnValue(Promise.resolve({
      data: '<html><body><div class="event-item">Mocked Event</div></body></html>'
    }));

    cheerioLoadSpy.and.returnValue({
      find: jasmine.createSpy().and.callFake((selector) => {
        if (selector === '.event-item') {
          return {
            map: (callback) => callback(0, '<div class="event-item">Mocked Event</div>'),
          };
        } else if (selector === '.up-time-display') {
          return {
            text: () => 'Mocked Date',
          };
        } else if (selector === '.up-venue') {
          return {
            text: () => 'Mocked Place',
          };
        }
        return {};
      }),
    });
  });

  // Increase the timeout for the test
  it('should scrape events successfully', async () => {
    const mockedEventData = {
      eventTitleScraped: 'JAQUAR IPA NEERATHON 2024, DELHI',
      eventDateScraped: 'Sun Feb 04 2024 at 06:00 am',
      eventPlaceScraped: 'MAJOR DHYAN CHAND NATIONAL STADIUM',
      eventImage: 'https://cdn2.allevents.in/thumbs/thumb65769f49cc33c.jpg',
    };

    // Use async/await to wait for the scrapeEvents function
    const result = await scrapeEvents;
    console.log(result);

    expect(result[0].eventTitleScraped).toEqual(mockedEventData.eventTitleScraped);
    expect(result[0].eventDateScraped).toEqual(mockedEventData.eventDateScraped);
    expect(result[0].eventPlaceScraped).toEqual(mockedEventData.eventPlaceScraped);
    expect(result[0].eventImage).toEqual(mockedEventData.eventImage);
  }, 10000); // Set a timeout of 10 seconds

  afterEach(() => {
    axiosGetSpy.and.callThrough();
    cheerioLoadSpy.and.callThrough();
  });
});
