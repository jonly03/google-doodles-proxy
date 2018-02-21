## Simple Google Doodles CORS-Enabled `node.js` & `ExpressJS` Proxy Server

This is a simple google doodles proxy server that was motivated by the `No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'null' is therefore not allowed access.` error.

When I made the [Today in Google Doodles history](https://jonly03.github.io/today-in-google-doodles-history/), I was making `ajax` requests to the `https://www.google.com/doodles/json/:year/:month` Google API. 

After observing the networks requests that `https://www.google.com/doodles` makes to fetch their doodles, I figured out that that's where they were sending their requests. 

![Google Doodles Request](/images/google-doodles-request.png)

As it turns out, for some reason, the `https://www.google.com/doodles/json/:year/:month` api is not 'public'. It is publicly accessible because anyone can make a request to it with no credentials and retrieve google doodles for a specific month in any given year. 

![Google Doodles Request Direct in Browser](/images/google-doodles-request-direct.png)

But making browser client ajax requests failed (I used JQuery `.ajax()` and the `fetch()` JS API). Since Google didn't make that api with the intent of making it public, they didn't specify the `Access-Control-Allow-Origin` header on their servers to allow any browser requests. In other words, browsers block any ajax requests to it because those requests are not coming from the same origin that the api is on. 

![CORS Error](/images/CORS-error.png)

I found this [MDN page](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) to be helpful to understand more about Cross-Origin Resource Sharing (CORS).

One way of getting around the CORS violation error (in Google Chrome) is adding [the Allow-Control-Allow-Origin: * extension](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?hl=en) to Chrome and enabling it.

But telling people to check out your new cool page and telling them to first install an extension was an overkill. So I just created a simple CORS-enabled `node.js` & `ExpressJS` proxy server `https://google-doodles.herokuapp.com` hosted on Heroku. My [Today in Google Doodles history](https://jonly03.github.io/today-in-google-doodles-history/) page sends its `GET` doodles requests to the proxy server via `/doodles/:year/:month` route. Then the proxy server makes `fetch` requests to the good 'ole `https://www.google.com/doodles/json/:year/:month` API and returns the result back to the client.

I learned how to enable CORS on a `node.js` & `expressJS` server from [here](https://enable-cors.org/server_expressjs.html)

Easy Day!
