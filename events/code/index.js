// scraper.js
import puppeteer from 'puppeteer';
import { pool } from './db/index.js';

const getPage = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  await page.goto('https://allevents.in/events?ref=cpt', {
    waitUntil: 'domcontentloaded',
  });

  // get page data
  const eventsScraped = await page.evaluate(() => {
    const eventDivs = document.querySelectorAll('.event-item');

    return Array.from(eventDivs).map((eventDiv) => {
      const eventMetaScraped = eventDiv.querySelector('.meta');
      const eventMetaIScraped = eventMetaScraped.querySelector('.meta-right');
      const eventMetaIIScraped = eventMetaIScraped.querySelector('.title');
      const eventDateDisplayScraped = eventMetaIScraped.querySelector('.up-time-display');
      const eventPlaceScraped = eventMetaIScraped.querySelector('.up-venue').innerText.trim();
      const eventDateScrapedRaw = eventDateDisplayScraped ? eventDateDisplayScraped.innerText : '';

      // Extract date without surrounding letters and whitespace
      const eventDateScraped = eventDateScrapedRaw.replace(/\s+/g, ' ').trim();

      return {
        eventTitleScraped: eventMetaIIScraped.innerText,
        eventDateScraped,
        eventPlaceScraped,
      };
    });
  });

  console.log(eventsScraped);

  //Insert data into PostgreSQL database
  eventsScraped.forEach(async (event) => {
    const query = {
      text: 'INSERT INTO events (name, datetime, location) VALUES ($1, $2, $3)',
      values: [event.eventTitleScraped, event.eventDateScraped, event.eventPlaceScraped],
    };

    try {
      const res = await pool.query(query);
      console.log(`Inserted row with id`);
    } catch (err) {
      console.error(err.stack);
    }
  });

  await browser.close();
};

getPage();
