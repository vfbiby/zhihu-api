import Koa from "koa";
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

usersRouter.get("/", auth, (ctx: any) => {
  ctx.body = "User lists";
});

usersRouter.post("/", auth, (ctx: any) => {
  ctx.body = "Create user";
});

usersRouter.get("/:id", auth, (ctx) => {
  ctx.body = `This is user ${ctx.params.id}`;
});

app.use(router.routes());
app.use(usersRouter.routes());

app.listen(3333);
