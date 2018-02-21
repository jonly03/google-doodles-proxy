## Simple Google Doodles Proxy Server

This is a simple google doodles proxy server that was motivated by the `No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'null' is therefore not allowed access.` error.

When I made the ##[Today in Google Doodles history](https://jonly03.github.io/today-in-google-doodles-history/), I was making requests to the `https://www.google.com/doodles/json/:year/:month` Google api. 

After observing the networks requests that `https://www.google.com/doodles` makes to fetch their doodles, I figured out that that's where they were sending their requests. As it turns out, for some reason, the `https://www.google.com/doodles/json/:year/:month` api is not 'public'. It is publicly accessible because anyone can make a request to it with no credentials and retrieve google doodles for a specific month in any given year. But making browser client requests failed. Since Google didn't make that api with the intent of making it public, they didn't specify the `Access-Control-Allow-Origin` header on their servers to allow any browser requests. In other words, browsers block any ajax requests to it because those requests are not coming from the same origin that the api is on. I found this [MDN page](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) to be helpful to understand more about Cross-Origin Resource Sharing (CORS).

One way of getting around the CORS violation error (in Google Chrome) is adding [the Allow-Control-Allow-Origin: * extension](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en) to Chrome and enabling it.

But telling people to checkout your new cool page and telling them to first install an extension was an overkill. So I just created a simple `node.js` & `ExpressJS` proxy server that my page sends the requests to. My proxy server enables cross-origin resource sharing, so any browser request can reach it with no problems. Then my proxy server makes `fetch` requests to the good 'ole `https://www.google.com/doodles/json/:year/:month` api and returns the result back to the client.

I learned how to enable CORS on a `node.js` & `expressJS` server from [here](https://enable-cors.org/server_expressjs.html)

Easy Day!