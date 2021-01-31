import Koa from 'koa';
import { File } from 'formidable';
import path from "path";

class HomeController {
  index(ctx: Koa.Context) {
    ctx.body = '<h1>Homepage</h1>';
  }
  upload(ctx: Koa.Context) {
    const file = ctx.request.files?.file as File;
    const basename = path.basename(file.path);
    ctx.body = { path: `${ctx.origin}/uploads/${basename}` };
  }
}

export default new HomeController();
