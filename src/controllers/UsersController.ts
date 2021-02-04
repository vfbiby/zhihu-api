import Koa from 'koa';
import User from '../Models/User';
import jsonwebtoken from 'jsonwebtoken';
import config from '../config';

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
    const { fields = '' }: { fields: string } = ctx.query;
    const selectedFields = fields
      .split(';')
      .filter((f: string) => f)
      .map((f: string) => ' +' + f)
      .join('');
    const user = await User.findById(ctx.params.id).select(selectedFields);
    if (!user) {
      ctx.throw(404, 'user is not exists!');
    }
    ctx.body = user;
  }

  async update(ctx: Koa.Context) {
    ctx.verifyParams({
      name: { type: 'string', required: false },
      password: { type: 'string', required: false },
      avatar_url: { type: 'string', required: false },
      gender: { type: 'string', required: false },
      headline: { type: 'string', required: false },
      locations: { type: 'array', itemType: 'string', required: false },
      business: { type: 'string', required: false },
      employments: { type: 'array', itemType: 'object', required: false },
      educations: { type: 'array', itemType: 'object', required: false },
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

  async login(ctx: Koa.Context) {
    ctx.verifyParams({
      name: { type: 'string', required: true },
      password: { type: 'string', required: true },
    });
    const user = await User.findOne(ctx.request.body);
    if (!user) {
      ctx.throw(401, 'Username or password is wrong!');
    }
    const { name, _id } = user;
    const { secret } = config;
    const token = jsonwebtoken.sign({ _id, name }, secret, { expiresIn: '1d' });
    ctx.body = { token };
  }

  async listFollowing(ctx: Koa.Context) {
    const user = await User.findById(ctx.params.id)
      .select('+following')
      .populate('following');
    if (!user) {
      ctx.throw(404);
    }
    ctx.body = user.following;
  }

  async follow(ctx: Koa.Context) {
    const me = await User.findById(ctx.state.user._id).select('+following');
    if (!me?.following.map((id) => id.toString()).includes(ctx.params.id)) {
      me?.following.push(ctx.params.id);
      me?.save();
    }
    ctx.status = 204;
  }

  async unfollow(ctx: Koa.Context) {
    const me = await User.findById(ctx.state.user._id).select('+following');
    const index = me?.following
      .map((id) => id.toString())
      .indexOf(ctx.params.id);
    if ( index !== undefined && index > -1) {
      me?.following.splice(index, 1);
      me?.save();
    }
    ctx.status = 204;
  }
}

export default new UsersController();
