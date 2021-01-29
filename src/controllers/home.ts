import Koa from "koa";

class HomeController {
  index(ctx: Koa.Context) {
    ctx.body = "<h1>Homepage</h1>";
  }
}

export default new HomeController();
