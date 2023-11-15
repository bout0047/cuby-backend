import data from './events.json' assert { type: 'json' };

function getToDay() {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  // This arrangement can be altered based on how we want the date's format to appear.
  let currentDate = `${day}-${month}-${year}`;
  console.log(currentDate); // "17-6-2022"
  return currentDate;
}

const tempResponse = {
  meta: {
    date: getToDay(),
  },
  data: {
    message: 'this route is not implemented yet',
  },
};

export async function getEvents(req, res) {
  try {
    // set header before response
    res.status(200).send(tempResponse);
  } catch (err) {
    next(err);
  }
}

export function getEventsForAYear(req, res) {
  try {
    // set header before response
    res.status(200).send(tempResponse);
  } catch (err) {
    next(err);
  }
}

export function getEventsForAYearAndMonth(req, res) {
  try {
    // set header before response
    res.status(200).send(tempResponse);
  } catch (err) {
    next(err);
  }
}

export function getEventsForAYearAndMonthAndADay(req, res) {
  try {
    // set header before response
    res.status(200).send(data);
  } catch (err) {
    next(err);
  }
}

export async function setEventsForAYearAndMonthAndADay(req, res) {
  let body = req.body;
  let url = req.url;
  var url_parts = url.replace(/\/\s*$/, '').split('/');
  url_parts.shift();
  if (req.body.starttime && req.body.id && req.body.name) {
    res
      .status(200)
      .send(
        `Nice`
      );
  } else {
    res
      .status(200)
      .send('Cool');
  }
}
