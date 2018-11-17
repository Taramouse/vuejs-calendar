require('dotenv').config({ silent: true });

const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const http = require('http');
const moment = require('moment-timezone')
moment.tz.setDefault('UTC')
const serialize = require('serialize-javascript')

app.use('/public', express.static(path.join(__dirname, 'public')));

// --- Inject Events ---
let events = [
  {description: 'Example Event 1', date: moment('2018-11-15', 'YYYY-MM-DD') },
  {description: 'Example Event 2', date: moment('2018-11-16', 'YYYY-MM-DD') },
  {description: 'Example Event 3', date: moment('2018-11-27', 'YYYY-MM-DD') }
];

app.get('/', (req, res) => {
  let template = fs.readFileSync(path.resolve('./index.html'), 'utf-8');
  // Inject events into html
  let contentMarker = '<!-- APP -->'
  res.send(template.replace(contentMarker, `<script>var __INITIAL_STATE__ = ${serialize(events)}</script>`));
});

app.use(require('body-parser').json())
app.post('/add-event', (req, res) => {
  events.push(req.body);
  res.sendStatus(200);
});
// --- /Inject Events ---

const server = http.createServer(app);

if (process.env.NODE_ENV === 'development') {
  const reload = require('reload');
  const reloadServer = reload(server, app);
  require('./webpack-dev-middleware').init(app);
  require('./webpack-server-compiler').init(function(bundle) {
    console.log('Node bundle built')
  });
}

server.listen(process.env.PORT, function () {
  console.log(`Example app listening on port ${process.env.PORT}!`);
  if (process.env.NODE_ENV === 'development') {
    require("open")(`http://localhost:${process.env.PORT}`);
  }
});
