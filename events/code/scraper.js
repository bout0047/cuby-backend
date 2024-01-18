import cheerio from 'cheerio';
import axios from 'axios';
import isOnline from 'is-online';
import striptags from 'striptags';

const cleanHTML = (html) => striptags(html);

const scrapeEvents = async () => new Promise(async (resolve, reject) => {
  try {
    const online = await isOnline();
    if (!online) {
      console.log('No internet connection. Skipping scraping.');
      return resolve([]);
    }

    const url = 'https://allevents.in/events?ref=cpt';
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const eventPromises = $('.event-item').map(async (index, element) => {
      const eventMetaScraped = $(element).find('.meta');
      const eventMetaIScraped = eventMetaScraped.find('.meta-right');
      const eventMetaIIScraped = eventMetaIScraped.find('.title');
      const eventDateDisplayScraped = eventMetaIScraped.find('.up-time-display');
      const eventPlaceScraped = eventMetaIScraped.find('.up-venue').text().trim();
      const eventDateScrapedRaw = eventDateDisplayScraped ? eventDateDisplayScraped.text() : '';
      const eventDateScraped = eventDateScrapedRaw.replace(/\s+/g, ' ').trim();

      const eventTitleScraped = eventMetaIIScraped.text().replace(/\s+/g, ' ').trim();

      // Scrape event description and image
      const eventLink = $(element).data('link');
      const eventResponse = await axios.get(eventLink);
      const $event = cheerio.load(eventResponse.data);
      const eventDescription = cleanHTML($event('.event-description').find('.event-description-html').html());
      const eventImage = $event('.event-banner-image').attr('src');
      const eventData = {
        eventTitleScraped: eventTitleScraped.trim(),
        eventDateScraped: eventDateScraped.trim(),
        eventPlaceScraped: eventPlaceScraped.trim(),
        eventDescription: eventDescription.trim(),
        eventImage: eventImage ? eventImage.trim() : undefined,
      };

      return eventData;
    }).get();

    const events = await Promise.all(eventPromises);
    resolve(events);
  } catch (error) {
    reject(error);
  }
});

const startScrapingWithInterval = () => {
  const scrapeEvery3Hours = async () => {
    try {
      const online = await isOnline();
      if (!online) {
        console.log('No internet connection. Skipping scraping.');
        return;
      }

      const events = await scrapeEvents();
      // Now you can do whatever you want with the events array
    } catch (error) {
      console.error('Error:', error);
    }
  };

  scrapeEvery3Hours();

  const interval = 3 * 60 * 60 * 1000; // 3 hours
  setInterval(scrapeEvery3Hours, interval);
};

startScrapingWithInterval();

export default scrapeEvents;
