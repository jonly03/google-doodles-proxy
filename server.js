// Simple Express Proxy Server to make request to google/doodles api
// This request in the browser causes Cross Origin Resource Sharing (CORS) error
// Hence the need to have a proxy server that directly fetches that information from google servers
let express = require('express');
let fetch = require('node-fetch');

let app = express();
let port = process.env.PORT || 8080;
let ip = process.env.IP

// Enable CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get("/doodles/date/:year/:month", function (req, res) {
  if (!Number(req.params.year) || !Number(req.params.month)) {
    return res.send({ status: 400, msg: 'Bad request /doodles/:year/:month expects a valid year and month' });
  }

  fetch(`https://www.google.com/doodles/json/${req.params.year}/${req.params.month}`)
    .then(response => response.json())
    .then(json => {
      return res.send(json);
    })

})

app.get('/doodles/country/:country/date/:year/:month/:day', (req, res) => {
  if (!Number(req.params.year) || !Number(req.params.month) && !Number(req.params.day)) {
    return res.send({ status: 400, msg: 'Bad request /doodles/country/:country/date/:year/:month expects a valid year and month' });
  }
  //TODO: Validate country
  const country = req.params.country;
  fetch(`https://www.google.com/doodles/search?q=${country}&s=0`)
    .then(response => response.json())
    .then(json => {
      const { doodles } = json; // const doodles = json.doodles

      const doodlesOfTheDay = doodles.filter((doodle) => {
        return doodle.run_date_array[0] === Number(req.params.year) && doodle.run_date_array[1] === Number(req.params.month) && doodle.run_date_array[2] === Number(req.params.day);
      })

      const finalDoodles = doodlesOfTheDay.map(doodle => {
        const { name, title, url, run_date_array } = doodle;
        return {
          name,
          title,
          url,
          run_date_array
        }
      })

      return res.json(finalDoodles);
    })
    .catch(err => res.status(500).send())
})


app.get('/doodles/country/:country', (req, res) => {
  //TODO: Validate country
  const country = req.params.country;
  fetch(`https://www.google.com/doodles/search?q=${country}&s=0`)
    .then(response => response.json())
    .then(json => res.send(json))
})


app.get("*", function (req, res) {
  return res.send({ status: 404, msg: 'Route does not exist. Only route available is /doodles/:year/:month' });
})

app.listen(port, ip);