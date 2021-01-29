import Koa from "koa";
import bodyParser from "koa-bodyparser";
import registerRouters from "./Routers/IndexRouter";

const app = new Koa();

app.use(bodyParser());
registerRouters(app);

export = app;
