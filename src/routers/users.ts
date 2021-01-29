import Router from "koa-router";
const router = new Router({ prefix: "/users" });

const db = [{ name: "Leilei" }];

router.get("/", (ctx: any) => {
  //ctx.set("Allow", "GET, POST");
  ctx.body = db;
});

router.post("/", (ctx: any) => {
  db.push(ctx.request.body);
  ctx.body = ctx.request.body;
});

router.get("/:id", (ctx) => {
  ctx.body = db[Number(ctx.params.id)];
});

router.put("/:id", (ctx) => {
  db[Number(ctx.params.id)] = ctx.request.body;
  ctx.body = ctx.request.body;
});

router.delete("/:id", (ctx) => {
  db.splice(Number(ctx.params.id), 1);
  ctx.status = 204;
});

module.exports = router;
