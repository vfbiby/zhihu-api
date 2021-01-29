import Router from "koa-router";
import UsersController from "../Controllers/UsersController";
const router = new Router({ prefix: "/users" });
const { index, create, read, update, destroy } = UsersController;

router.get("/", index);
router.post("/", create);
router.get("/:id", read);
router.put("/:id", update);
router.delete("/:id", destroy);

module.exports = router;
