import Router from "koa-router";
const router = new Router();

router.get("/", (ctx: any) => {
  ctx.body = "<h1>Homepage</h1>";
});

module.exports = router;
