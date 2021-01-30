import Router from 'koa-router';
import UsersController from '../Controllers/UsersController';
import Koa from 'koa';
import jwt from 'jsonwebtoken';
import config from '../config';

const router = new Router({ prefix: '/users' });
const { index, create, read, update, destroy, login } = UsersController;

const auth = async (ctx: Koa.Context, next: Koa.Next) => {
  const { authorization = '' } = ctx.request.header;
  const token = authorization.replace('Bearer ', '');
  const { secret } = config;
  try {
    const user = jwt.verify(token, secret);
    ctx.state.user = user;
    await next();
  } catch (err) {
    ctx.throw(401, err.message);
  }
};

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
