const Koa = require("koa");
const app = new Koa();

app.use((ctx) => {
  ctx.body = "Hello James!";
});

app.listen(3333);
