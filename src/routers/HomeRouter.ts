import Router from "koa-router";
const router = new Router();
import HomeController from "../controllers/HomeController";

router.get("/", HomeController.index);

module.exports = router;
