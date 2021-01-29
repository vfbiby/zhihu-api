import Koa from "koa";
import bodyParser from "koa-bodyparser";
import registerRouters from "./Routers/IndexRouter";
import error from "koa-json-error";

const app = new Koa();

app.use(error());
app.use(bodyParser());
registerRouters(app);

export = app;
