import Koa from "koa";
import Router from "koa-router";
const app = new Koa();
const router = new Router();
const usersRouter = new Router({ prefix: "/users" });

router.get("/", (ctx: any) => {
  ctx.body = "Homepage";
});

usersRouter.get("/", (ctx: any) => {
  ctx.body = "User lists";
});

usersRouter.post("/", (ctx: any) => {
  ctx.body = "Create user";
});

usersRouter.get("/:id", (ctx) => {
  ctx.body = `This is user ${ctx.params.id}`;
});

app.use(router.routes());
app.use(usersRouter.routes());

app.listen(3333);
