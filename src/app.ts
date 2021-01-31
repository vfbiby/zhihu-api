import Koa from 'koa';
import koaBody from 'koa-body';
import registerRouters from './Routers/IndexRouter';
import error from 'koa-json-error';
import parameter from 'koa-parameter';
import path from "path";
import mongoose from 'mongoose';
import config from './config';

const app = new Koa();
const { connectionUrl } = config;
mongoose.connect(
  connectionUrl,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('Mongodb connect success!');
  }
);
mongoose.connection.on('error', console.error);

app.use(
  error({
    postFormat: (_, { stack, ...rest }) =>
      process.env.NODE_ENV === 'production' ? rest : { stack, ...rest },
  })
);
app.use(
  koaBody({
    multipart: true,
    formidable: {
      uploadDir: path.join(__dirname, '../public/uploads/'),
    },
  })
);
app.use(parameter(app));
registerRouters(app);

export = app;
