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
      if (data._id !== void 0 && data.exp !== void 0) {
        if (data.exp < new Date().getTime()) { // 判断token是否过期
          ctx.status = 401;
          ctx.body = {
            success: false,
            message: 'User login has timed out.'
          }
        } else {
          // 判断token是否正确
          const result = await user.findUserById(data._id);
          if (result === null) {
            ctx.status = 401;
            ctx.body = {
              success: false,
              message: 'User authentication failed.'
            }
          } else {
            ctx.state._id = result._id;
            await next();
          }
        }
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

function checkToken(token: string) {
  const { _id, iat, exp } = jwt.verify(token, secretKey);
  


}