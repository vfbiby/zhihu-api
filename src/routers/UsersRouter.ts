import Router from 'koa-router';
import UsersController from '../Controllers/UsersController';
import Koa from 'koa';
import jwt from 'koa-jwt';
import config from '../config';

const router = new Router({ prefix: '/users' });
const { index, create, read, update, destroy, login } = UsersController;
const { secret } = config;
const auth = jwt({ secret });

const checkOwner = async (ctx: Koa.Context, next: Koa.Next) => {
  if (ctx.params.id !== ctx.state.user._id) {
    ctx.throw(403);
  }
  await next();
};

router.get('/', index);
router.post('/', create);
router.get('/:id', read);
router.patch('/:id', auth, checkOwner, update);
router.delete('/:id', auth, checkOwner, destroy);
router.post('/login', login);

module.exports = router;
