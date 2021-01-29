import Koa from "koa";
import Router from "koa-router";
const router = new Router({ prefix: "/errors" });

router.get("/412", async (ctx: Koa.Context) => {
  ctx.throw(412);
});

router.get("/500", async (ctx: Koa.Context) => {
  ctx.throw(500);
});

module.exports = router;
