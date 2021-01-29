import Koa from "koa";
import bodyParser from "koa-bodyparser";
import registerRouters from "./routers";

const app = new Koa();

app.use(bodyParser());
registerRouters(app);

app.listen(3333, () => console.log("port: 3333"));
