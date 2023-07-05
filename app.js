const express = require("express");
require('dotenv').config()
const app = express();
const router = require('./server/api/index');
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
Sentry.init({
  dsn: process.env.SENTRY_DSN, integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({
      app,
    })
  ], tracesSampleRate: 1.0,
});
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(Sentry.Handlers.errorHandler());
var cors = require('cors')
app.use(cors());
app.use(router);
require("./models/db");
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(process.env.PORT, (err) => {
  console.log("Server is running http://localhost:" + process.env.PORT);
});

app.get("/", (req, res) => {
  res.send("Hello everyone");
});