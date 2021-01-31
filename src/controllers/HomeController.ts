import Koa from 'koa';
import { File } from 'formidable';

class HomeController {
  index(ctx: Koa.Context) {
    ctx.body = '<h1>Homepage</h1>';
  }
  upload(ctx: Koa.Context) {
    const file = ctx.request.files?.file as File;
    ctx.body = { path: file.path };
  }
}

export default new HomeController();
