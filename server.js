// Simple Express Proxy Server to make request to google/doodles api
// This request in the browser causes Cross Origin Resource Sharing (CORS) error
// Hence the need to have a proxy server that directly fetches that information from google servers
let express = require('express');
let fetch = require('node-fetch');

let app = express();
let port = process.env.PORT || 8080;
let ip = process.env.IP

// Enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get("/doodles/:year/:month", function(req, res){
  if (!Number(req.params.year) || !Number(req.params.month)){
    return res.send({status:400, msg:'Bad request /doodles/:year/:month expects a valid year and month'});
  }
  
  fetch(`https://www.google.com/doodles/json/${req.params.year}/${req.params.month}`)
    .then(response => response.json())
    .then(json => {
      return res.send(json);
    })
  
})

app.get("*", function(req,res){
  return res.send({status: 404, msg:'Route does not exist. Only route available is /doodles/:year/:month'});
})

app.listen(port, ip);