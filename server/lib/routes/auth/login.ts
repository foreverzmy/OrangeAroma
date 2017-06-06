import * as Router from 'koa-router';
import * as jwt from 'jsonwebtoken';
import User from '../../controllers/user.sql';
import { secretKey } from '../../config';

const router = new Router();
const user = new User();

router.get('/login', async (ctx, next) => {
  const token = jwt.decode(ctx.req.headers.authorization);
  if (token) {
    const result = await user.findUserById(token._id);
    if (result === null) {
      ctx.status = 401;
      ctx.body = {
        success: false,
        message: 'login failed.'
      }
    } else {
      const date = new Date().getTime();
      const token = jwt.sign({
        _id: result._id,
        iat: date, // 签发时间
        exp: date + 604800000, // 过期时间  
      }, secretKey);
      ctx.status = 200;
      ctx.set('Authorization', token);
      ctx.body = {
        success: true,
        message: 'login success.'
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
  const result = await user.findUserByName(username);
  if (result === null) {
    ctx.status = 401;
    ctx.body = {
      success: false,
      message: 'username not exist.'
    }
  } else {
    const date = new Date().getTime();
    const token = jwt.sign({
      _id: result._id,
      iat: date, // 签发时间
      exp: date + 604800000, // 过期时间  
    }, secretKey);

    ctx.status = 200;
    ctx.set('Authorization', token);
    ctx.body = {
      success: true,
      message: 'login success.'
    }

  }
  await next();
})

export default router;