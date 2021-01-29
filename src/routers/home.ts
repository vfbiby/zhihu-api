import Router from "koa-router";
const router = new Router();
import HomeController from "../controllers/home";

router.get("/", HomeController.index);

module.exports = router;
