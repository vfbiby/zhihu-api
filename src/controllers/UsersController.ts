import Koa from "koa";

const db = [{ name: "Leilei" }];

class UsersController {
  index(ctx: Koa.Context) {
    ctx.body = db;
  }

  create(ctx: Koa.Context) {
    db.push(ctx.request.body);
    ctx.body = ctx.request.body;
  }

  read(ctx: Koa.Context) {
    ctx.body = db[Number(ctx.params.id)];
  }

  update(ctx: Koa.Context) {
    db[Number(ctx.params.id)] = ctx.request.body;
    ctx.body = ctx.request.body;
  }

  destroy(ctx: Koa.Context) {
    db.splice(Number(ctx.params.id), 1);
    ctx.status = 204;
  }
}

export default new UsersController();
