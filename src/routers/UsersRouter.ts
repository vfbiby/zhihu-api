import Router from 'koa-router';
import UsersController from '../Controllers/UsersController';
const router = new Router({ prefix: '/users' });
const { index, create, read, update, destroy, login } = UsersController;

router.get('/', index);
router.post('/', create);
router.get('/:id', read);
router.patch('/:id', update);
router.delete('/:id', destroy);
router.post('/login', login);

module.exports = router;
