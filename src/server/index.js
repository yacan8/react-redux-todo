import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import assets from './client/assets.json';
import routers from './routers';
const isDebug = process.env.NODE_ENV !== 'production';

function renderView(conf) {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <title>react-redux-todo</title>
      <meta charset="utf-8>
      <meta http-equiv="content-type" content="text/html;charset=utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" type="text/css" href="${conf['react-redux-todo'].css}">
    </head>
    <body>
      <div id="app"></div>
      <script src="/dll/vendor.js"></script>
      <script src="${conf['react-redux-todo'].js}"></script>
    </body>
  </html>
  `;
}

const port = process.env.port || 3000; // 默认端口

async function run() {
  const app = express();
  app.printSuccess = (res, msg, data = {}) => { res.json({success: true, msg, data}) };
  app.printFailure = (res, msg, data = {}) => { res.json({success: false, msg, data}) };
  process.on('unCatchedException', (e) => {
    app.logger.error(e);
  });
  app.use(express.static(path.resolve(__dirname, 'client')));
  app.use('/dll', express.static(path.resolve(__dirname, '..', isDebug ? 'dll-dev' : 'dll')));
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(morgan());
  // service
  // app.use(sourceMapService);
  routers.forEach(route => {
    app.get(route, (req, res) => {
      res.send(renderView({
        ...assets
      }));
    });
  });

  app.listen(port, () => {
    if (isDebug) {
      console.info(`The server is running at http://localhost:${port}/`);
    }
  });
}

run();
