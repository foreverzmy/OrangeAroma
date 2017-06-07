import * as Router from 'koa-router';
import * as jwt from 'jsonwebtoken';
import User from '../../controllers/user.sql';
import { secretKey } from '../../config';

const router = new Router();
const user = new User();

router.post('/register', async (ctx, next) => {

  const { username, password } = ctx.request.body;
  if (username === void 0 && password === void 0) {
    ctx.status = 401;
    ctx.body = {
      success: false,
      message: 'Illegal params.'
    }
  } else {
    const result = await user.findUserByName(username);

    if (result === null) {
      const newUser = await user.save({
        username: username,
        password: password
      });
      const date = new Date().getTime();
      const token = jwt.sign({
        _id: newUser._id,
        iat: date, // 签发时间
        exp: date + 604800000, // 过期时间  
      }, secretKey);

      ctx.status = 200;
      ctx.set('Authorization', token);
      ctx.body = {
        success: true,
        message: 'register success.',
      }
    } else {
      ctx.status = 401;
      ctx.body = {
        success: false,
        message: 'username already exist.'
      }
    }
  }
  await next();
})

export default router;