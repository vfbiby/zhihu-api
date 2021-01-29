import Koa from "koa";
const app = new Koa();

app.use(async (ctx: any, next: Koa.Next) => {
  if (ctx.url === "/") {
    ctx.body = "this is homepage";
  } else if (ctx.url === "/users") {
    ctx.body = "this is user page";
  } else if (ctx.url.match(/\/users\/\w+/)) {
    const userId = ctx.url.match(/\/users\/(\w+)/)[1];
    ctx.body = `this is user ${userId}`;
  } else {
    ctx.status = 404;
  }
});

app.listen(3333);
