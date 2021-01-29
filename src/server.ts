import Koa from "koa";
import bodyParser from "koa-bodyparser";
import Router from "koa-router";
const app = new Koa();
const router = new Router();
const usersRouter = new Router({ prefix: "/users" });

const auth = async (ctx: any, next: Koa.Next) => {
  if (ctx.url !== "/users") {
    ctx.throw(401);
  }
  await next();
};

router.get("/", (ctx: any) => {
  ctx.body = "Homepage";
});

usersRouter.get("/", (ctx: any) => {
  ctx.body = [{ name: "Lilei" }, { name: "Hanmeimei" }];
});

usersRouter.post("/", (ctx: any) => {
  console.log(ctx.request.body);
  ctx.body = { name: "Lilei" };
});

usersRouter.get("/:id", (ctx) => {
  ctx.body = { name: "Lilei" };
});

usersRouter.put("/:id", (ctx) => {
  ctx.body = { name: "Lilei2" };
});

usersRouter.delete("/:id", (ctx) => {
  ctx.status = 204;
});

app.use(bodyParser());
app.use(router.routes());
app.use(usersRouter.routes());
app.use(usersRouter.allowedMethods());

app.listen(3333);
