// 处理客户端未授权问题
import * as Koa from 'koa';
import * as jwt from 'jsonwebtoken';

import { secretKey } from '../config';
import User from './user.sql';

const user = new User();

export default async (ctx: Koa.Context, next: any) => {
  const token = ctx.req.headers.authorization;
  if (/^\/api\/auth\//.test(ctx.url)) {
    await next()
  } else if (token === void 0) {
    ctx.status = 401;
    ctx.body = {
      success: false,
      message: 'User authentication failed.'
    };
  } else {
    // token 不为空，验证_id，exp 正确可以访问所有接口，不正确只能访问auth接口
    try {
      const data = jwt.verify(token, secretKey);
      const result = await checkToken(data);
      switch (result) {
        case true:
          await next();
        case false:
          ctx.status = 401;
          ctx.body = {
            success: false,
            message: 'User authentication failed.'
          };
        default:
          ctx.status = 401;
          ctx.body = {
            success: false,
            message: result
          };
      }
    } catch (err) {
      ctx.status = 401;
      ctx.body = {
        success: false,
        message: 'User authentication failed.'
      };
      throw err;
    }
  }
}

async function checkToken(token) {
  const { _id, iat, exp } = token;
  if (_id !== void 0 && iat !== void 0 && exp !== void 0) {
    if (exp < new Date().getTime()) {
      return 'User login has timed out.'
    } else {
      const result = await user.findUserById(_id);
      if (result === null) {
        return false;
      } else {
        return true;
      }
    }
  } else {
    return false;
  }
}