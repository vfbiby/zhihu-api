import Router from "koa-router";
const router = new Router();
import HomeController from "../Controllers/HomeController";

const { index, upload } = HomeController;

router.get("/", index);
router.post("/upload", upload);

module.exports = router;
