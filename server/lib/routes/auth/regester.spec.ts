import 'mocha';
import * as request from 'supertest';
import * as jwt from 'jsonwebtoken';

import User from '../../controllers/user.sql';
import { secretKey } from '../../config';

const user = new User();

const server = request('http://localhost:9000');

describe('POST regester with username & password.', () => {
  it('returen a singn', async () => {
    return server
      .post('/api/auth/login')
      .set('Accept', 'application/json')
      .send({ username: 'zkk', password: '123456' })
      .expect(200, {
        success: true,
        message: 'register success.',
      })
  })
})
