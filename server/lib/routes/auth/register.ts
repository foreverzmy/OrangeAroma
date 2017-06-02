import * as Router from 'koa-router';
import * as jwt from 'jsonwebtoken';
import User from '../../controllers/user.sql';
import { secretKey } from '../../config';

const router = new Router();
const user = new User();

router.post('/register', async (ctx, next) => {
  const { username, password } = ctx.request.body;

  const result = await user.findUserByName(username);

  if (result === null) {
    const newUser = await user.save({
      username: username,
      password: password
    });
    const token = jwt.sign({ username: username }, secretKey);
    ctx.status = 200;
    ctx.body = {
      success: true,
      message: 'register success.',
      token: token,
      expires: new Date().getTime() + 604800000,
    }
  } else {
    ctx.status = 401;
    ctx.body = {
      success: false,
      message: 'username already exist.'
    }
  }
  await next();
})

export default router;