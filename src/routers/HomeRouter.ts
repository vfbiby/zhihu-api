import Router from "koa-router";
const router = new Router();
import HomeController from "../Controllers/HomeController";

router.get("/", HomeController.index);

module.exports = router;
