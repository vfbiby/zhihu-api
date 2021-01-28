import Koa from "koa";
const app = new Koa();

app.use(async (ctx: any) => {
  ctx.body = "Hello James Zhang!";
});

app.listen(3333);
