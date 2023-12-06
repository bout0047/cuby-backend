import express from 'express';
import { pool } from './db/index.js';
import eventsRouter from './routes/events.mjs';
import puppeteer from 'puppeteer'

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/', eventsRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

const getPage = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  await page.goto("https://allevents.in/events?ref=cpt", {
    waitUntil: "domcontentloaded",
  });

  // get page data
  const eventsScraped = await page.evaluate(() => {
    const eventDivs = document.querySelectorAll(".event-item");

    const events = [];

    eventDivs.forEach((eventDiv) => {
      const eventMetaScraped = eventDiv.querySelector(".meta");
      const eventMetaIScraped = eventMetaScraped.querySelector(".meta-right");
      const eventMetaIIScraped = eventMetaIScraped.querySelector(".title");
      const eventTitleScraped = eventMetaIIScraped.innerText;

      events.push({ eventTitleScraped });
    });

    return events;
  });

  console.log(eventsScraped);

  await browser.close();
};

getPage();


