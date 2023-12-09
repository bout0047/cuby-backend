import express from 'express';
import puppeteer from 'puppeteer';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

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

    return Array.from(eventDivs).map((eventDiv) => {
      const eventMetaScraped = eventDiv.querySelector(".meta");
      const eventMetaIScraped = eventMetaScraped.querySelector(".meta-right");
      const eventMetaIIScraped = eventMetaIScraped.querySelector(".title");
      const eventDateDisplayScraped = eventMetaIScraped.querySelector(".up-time-display");
      const eventPlaceScraped = eventMetaIScraped.querySelector(".up-venue").innerText.trim();
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

  await browser.close();
};

getPage();
