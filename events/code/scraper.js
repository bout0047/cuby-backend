import express from "express";
import cheerio from "cheerio";
import axios from "axios";
import isOnline from "is-online";

const scrapeEvents = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const online = await isOnline();
      if (!online) {
        console.log("No internet connection. Skipping scraping.");
        return resolve([]);
      }

      const url = "https://allevents.in/events?ref=cpt";
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      const eventsScraped = [];

      $('.event-item').each((index, element) => {
        const eventMetaScraped = $(element).find('.meta');
        const eventMetaIScraped = eventMetaScraped.find('.meta-right');
        const eventMetaIIScraped = eventMetaIScraped.find('.title');
        const eventDateDisplayScraped = eventMetaIScraped.find('.up-time-display');
        const eventPlaceScraped = eventMetaIScraped.find('.up-venue').text().trim();
        const eventDateScrapedRaw = eventDateDisplayScraped ? eventDateDisplayScraped.text() : '';

        const eventDateScraped = eventDateScrapedRaw.replace(/\s+/g, ' ').trim();

        const eventTitleScraped = eventMetaIIScraped.text().replace(/\s+/g, ' ').trim();

        const eventData = {
          eventTitleScraped,
          eventDateScraped,
          eventPlaceScraped,
        };

        eventsScraped.push(eventData);
      });
      resolve(eventsScraped);

    } catch (error) {
      reject(error);
    }
  });
}

const startScrapingWithInterval = () => {
  // Function to call scrapeEvents every 3 hours
  const scrapeEvery3Hours = async () => {
    try {
      const online = await isOnline();
      if (!online) {
        console.log("No internet connection. Skipping scraping.");
        return;
      }

      const events = await scrapeEvents();
      console.log("Scraped Events:", events);
      // Now you can do whatever you want with the events array
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // Initial call
  scrapeEvery3Hours();

  // Set up interval to call the function every 3 hours (in milliseconds)
  const interval = 3 * 60 * 60 * 1000; // 3 hours
  setInterval(scrapeEvery3Hours, interval);
}

// Start scraping with interval
startScrapingWithInterval();

export default scrapeEvents;
