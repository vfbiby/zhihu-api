import Router from 'koa-router';
import TopicController from '../Controllers/TopicController';
import jwt from 'koa-jwt';
import config from '../config';

const router = new Router({ prefix: '/topics' });
const {
  index,
  create,
  read,
  update,
} = TopicController;
const { secret } = config;
const auth = jwt({ secret });

router.get('/', index);
router.post('/', auth, create);
router.get('/:id', read);
router.patch('/:id', auth, update);

module.exports = router;
