import User from './user.sql';
import { expect } from 'chai';
import 'mocha';

describe('user controllers', () => {
  it('hash password', async () => {
    const user = new User();
    user.password = '123456';
    const hashPwd = await user.hashPwd();
    expect(hashPwd).to.be.string;
  });

  //   it('should return save user info', async () => {
  //     const user = new User();
  //     const newUser = await user.save({
  //       username: 'zmy',
  //       password: '123456',
  //       avatar: '6666',
  //     });
  //     console.log(newUser)
  //     expect(newUser).to.have.property('_id')
  //   });

  it('find user by name.', async () => {
    const user = new User();
    const userInfo = await user.findUserByName('zmy');
    expect(userInfo).to.have.property('_id');
  });

  it('find user by id.', async () => {
    const user = new User();
    const userInfo = await user.findUserById('592fc4357662e056307143e8');
    expect(userInfo).to.have.property('_id');
  });
});
