import * as Router from 'koa-router';
import * as jwt from 'jsonwebtoken';

import User from '../../controllers/user.sql';

const router = new Router();
const user = new User();

router.get('/setting', async (ctx, next) => {
  ctx.status = 200;
  ctx.body = ctx.state._id;


})

export default router;