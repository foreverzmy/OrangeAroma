// 处理客户端未授权问题
import * as Koa from 'koa';
import * as jwt from 'jsonwebtoken';
import { secretKey } from '../config';

export default async (ctx: Koa.Context, next: any) => {
  const token = ctx.req.headers.authorization;

  if (token !== void 0 && /^\/api\//.test(ctx.url)) {
    try {
      const data = jwt.verify(token, secretKey);
      console.log(data);
      await next();
    } catch (err) {
      console.log(err)
      ctx.status = 401;
      ctx.body = {
        success: false,
        message: '用户验证失败'
      };
    }
  } else {
    await next();
  }
}
