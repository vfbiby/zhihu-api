import fs from "fs";
import Koa from "koa";
import Router from "koa-router";
import path from "path";

export default (app: Koa) => {
  fs.readdirSync(__dirname).forEach((file) => {
    if (path.basename(__filename) === file) {
      return;
    }
    const router: Router = require(`./${file}`);
    app.use(router.routes()).use(router.allowedMethods());
  });
};
