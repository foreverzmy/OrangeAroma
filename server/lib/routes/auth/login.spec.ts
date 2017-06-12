import 'mocha';
import * as request from 'supertest';
import * as jwt from 'jsonwebtoken';

import User from '../../controllers/user.sql';
import { secretKey } from '../../config';

const user = new User();

const server = request('http://localhost:9000');

describe('GET login with authorization.', () => {
  it('returen a singn', async () => {
    const date = new Date().getTime();
    const result = await user.findUserByName('zzz');
    const token = jwt.sign({
      _id: result._id,
      iat: date, // 签发时间
      exp: date + 604800000, // 过期时间  
    }, secretKey);

    return server
      .get('/api/auth/login')
      .set('Accept', 'application/json')
      .set('authorization', token)
      .expect(200, {
        success: true,
        message: 'login success.'
      })
  })
})

describe('GET login without authorization.', () => {
  it('returen a singn', () => {
    return server
      .get('/api/auth/login')
      .set('Accept', 'application/json')
      .expect(401, {
        success: false,
        message: 'login failed.'
      })
  })
})

describe('POST login with username & password.', () => {
  it('returen a singn', () => {
    return server
      .post('/api/auth/login')
      .send({ username: 'zzz', password: '123456' })
      .expect(200, {
        success: true,
        message: 'login success.'
      })
  })
})