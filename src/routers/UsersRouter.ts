import Router from 'koa-router';
import UsersController from '../Controllers/UsersController';
import Koa from 'koa';
import jwt from 'koa-jwt';
import config from '../config';
import User from '../Models/User';

const router = new Router({ prefix: '/users' });
const {
  index,
  create,
  read,
  update,
  destroy,
  login,
  listFollowing,
  follow,
  unfollow,
} = UsersController;
const { secret } = config;
const auth = jwt({ secret });

const checkOwner = async (ctx: Koa.Context, next: Koa.Next) => {
  if (ctx.params.id !== ctx.state.user._id) {
    ctx.throw(403);
  }
  await next();
};

const checkUserExists = async (ctx: Koa.Context, next: Koa.Next) => {
  if (!ctx.params.id) {
    ctx.throw(404, 'User ID is needed!');
  }
  const user = await User.findById(ctx.params.id);
  if (!user) {
    ctx.throw(404, 'User is not exists!');
  }
  await next();
};

router.get('/', index);
router.post('/', create);
router.get('/:id', read);
router.patch('/:id', auth, checkOwner, update);
router.delete('/:id', auth, checkOwner, destroy);
router.post('/login', login);
router.get('/:id/following', listFollowing);
router.put('/following/:id', auth, checkUserExists, follow);
router.delete('/following/:id', auth, checkUserExists, unfollow);

module.exports = router;
