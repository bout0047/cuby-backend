import * as cheerio from 'cheerio';
import axios from 'axios';
import striptags from 'striptags';

const cleanHTML = (html) => striptags(html);

const scrapeEvents = async () => new Promise(async (resolve, reject) => {
  try {
    const url = 'https://allevents.in/events?ref=cpt';
    const response = await axios.get(url);
    
    // Make sure that '$' is assigned to the Cheerio function
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

      // Log the working status
      console.log("It's working");

      return eventData;
    }).get();

    const events = await Promise.all(eventPromises);
    resolve(events);
  } catch (error) {
    reject(error);
  }
});

export default scrapeEvents;
