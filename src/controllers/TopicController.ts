import Koa from 'koa';
import Topic from '../Models/Topic';

class TopicController {
  async index(ctx: Koa.Context) {
    const { per_page = 10 } = ctx.query;
    const page = Math.max(ctx.query.page * 1, 1) - 1;
    const perPage = Math.max(per_page * 1, 1);
    ctx.body = await Topic.find({ name: new RegExp(ctx.query.q) })
      .limit(perPage)
      .skip(page * perPage);
  }

  async read(ctx: Koa.Context) {
    const { fields = '' }: { fields: string } = ctx.query;
    const selectedFields = fields
      .split(';')
      .filter((f) => f)
      .map((f) => ' +' + f)
      .join('');
    const topic = await Topic.findById(ctx.params.id).select(selectedFields);
    ctx.body = topic;
  }

  async create(ctx: Koa.Context) {
    ctx.verifyParams({
      name: { type: 'string', required: true },
      avatar_url: { type: 'string', required: false },
      introduction: { type: 'string', required: false },
    });
    const topic = await new Topic(ctx.request.body).save();
    ctx.body = topic;
  }

  async update(ctx: Koa.Context) {
    ctx.verifyParams({
      name: { type: 'string', required: false },
      avatar_url: { type: 'string', required: false },
      introduction: { type: 'string', required: false },
    });
    const topic = await Topic.findByIdAndUpdate(
      ctx.params.id,
      ctx.request.body
    );
    ctx.body = topic;
  }
}

export default new TopicController();
