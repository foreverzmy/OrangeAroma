import * as Router from 'koa-router';
import * as jwt from 'jsonwebtoken';
import User from '../../controllers/user.sql';
import { secretKey } from '../../config';

const router = new Router();

router.get('/login', async (ctx, next) => {
  const token = jwt.decode(ctx.request.query.token);
  if (token) {
    const user = new User();
    const result = await user.findUserById(token._id);
    if (result === null) {
      ctx.status = 401;
      ctx.body = {
        success: false,
        message: 'login failed.'
      }
    } else {
      ctx.status = 200;
      ctx.body = {
        success: true,
        message: 'login success.',
        expires: new Date().getTime() + 604800000,
      }
    }
  } else {
    ctx.status = 401;
    ctx.body = {
      success: false,
      message: 'login failed.'
    }
  }
  await next();
});

router.post('/login', async (ctx, next) => {
  const { username, password } = ctx.request.body;

  const user = new User();
  const result = await user.findUserByName(username);
  if (result === null) {
    ctx.status = 401;
    ctx.body = {
      success: false,
      message: 'username not exist.'
    }
  } else {
    const token = jwt.sign({ _id: result._id }, secretKey);
    console.log(token);
    ctx.status = 200;
    ctx.body = {
      success: true,
      message: 'login success.',
      token: token,
      expires: new Date().getTime() + 604800000,
    }
  }
  await next();
})

export default router;