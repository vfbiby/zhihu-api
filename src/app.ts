import Koa from "koa";
import bodyParser from "koa-bodyparser";
import registerRouters from "./Routers/IndexRouter";
import error from "koa-json-error";
import parameter from "koa-parameter";

const app = new Koa();

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
