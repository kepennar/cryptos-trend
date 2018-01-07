const Koa = require('koa');
const helmet = require('koa-helmet');
const accesslog = require('koa-morgan');
const bodyParser = require('koa-bodyparser');
const compress = require('koa-compress');

const config = require('./config');
const health = require('./health');
const api = require('./api');
const serverConfig = config.get('server');
const logConfig = config.get('log');

const app = new Koa();

app.use(helmet());
app.use(accesslog(logConfig.format));
app.use(compress());
app.use(bodyParser());

// Possibility to customize path and checks
//  app.use(health('/ping', [async () => { Check connectivity} ]));
app.use(api.routes(), api.allowedMethods());
app.use(health());

app.listen(serverConfig.port);
console.log(
  'HTTP server listening on',
  `http://localhost:${serverConfig.port}`
);
