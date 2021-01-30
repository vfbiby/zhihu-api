import Koa from "koa";
import bodyParser from "koa-bodyparser";
import registerRouters from "./Routers/IndexRouter";
import error from "koa-json-error";
import parameter from "koa-parameter";
import mongoose from "mongoose";
import config from "./config";

const app = new Koa();
const { connectionUrl } = config;
mongoose.connect(
  connectionUrl,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Mongodb connect success!");
  }
);
mongoose.connection.on("error", console.error);

app.use(
  error({
    postFormat: (_, { stack, ...rest }) =>
      process.env.NODE_ENV === "production" ? rest : { stack, ...rest },
  })
);
app.use(bodyParser());
app.use(parameter(app));
registerRouters(app);

export = app;
