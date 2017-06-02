import User from './user.sql';
import { expect } from 'chai';
import 'mocha';


const user = new User();

describe('user controllers', () => {
  it('hash password', async () => {
    user.password = '123456';
    const hashPwd = await user.hashPwd();
    expect(hashPwd).to.be.string;
  });

  // it('save new user', async () => {
  //   const newUser = await user.save({
  //     username: 'zmy',
  //     password: '123456',
  //     avatar: '6666',
  //   });
  //   expect(newUser).to.have.property('_id')
  // });

  it('find user by name.', async () => {
    const userInfo = await user.findUserByName('zmy');
    expect(userInfo).to.have.property('_id');
  });

  it('find user by id.', async () => {
    const userInfo = await user.findUserById('59312f66b3f7ca3dac5ec086');
    expect(userInfo).to.have.property('_id');
  });

  it('authenticate', async () => {
    const result = await user.authenticate({ username: 'zmy', password: '123456' });
    expect(result).to.have.property('_id');
  });
});
