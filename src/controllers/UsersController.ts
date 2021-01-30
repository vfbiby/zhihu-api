import Koa from 'koa';
import User from '../Models/User';

class UsersController {
  async index(ctx: Koa.Context) {
    ctx.body = await User.find();
  }

  async create(ctx: Koa.Context) {
    ctx.verifyParams({
      name: { type: 'string', required: true },
      password: { type: 'string', required: true },
    });
    const { name } = ctx.request.body;
    const existsUser = await User.findOne({ name });
    existsUser && ctx.throw(409, 'User exists!');
    const user = await new User(ctx.request.body).save();
    ctx.body = user;
  }

  async read(ctx: Koa.Context) {
    const user = await User.findById(ctx.params.id);
    if (!user) {
      ctx.throw(404, 'user is not exists!');
    }
    ctx.body = user;
  }

  async update(ctx: Koa.Context) {
    ctx.verifyParams({
      name: { type: 'string', required: false },
      password: { type: 'string', required: false },
    });
    const user = await User.findByIdAndUpdate(ctx.params.id, ctx.request.body);
    if (!user) {
      ctx.throw(404, 'user is not exists!');
    }
    ctx.body = user;
  }

  async destroy(ctx: Koa.Context) {
    const user = await User.findByIdAndRemove(ctx.params.id);
    if (!user) {
      ctx.throw(404, 'user is not exists!');
    }
    ctx.status = 204;
  }
}

export default new UsersController();
