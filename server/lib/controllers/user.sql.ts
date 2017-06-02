import UserDB from '../models/user.model';
import * as bcrypt from 'bcryptjs';

class User {
  public username: string;
  public password: string;
  public salt: string;
  public avatar: string;

  constructor() {
  }

  // 对密码进行加盐加密
  async hashPwd() {
    this.salt = '';
    try {
      this.salt = await bcrypt.genSalt(12);
    } catch (err) {
      throw err;
    }
    let hash = '';
    try {
      hash = await bcrypt.hash(this.password, this.salt);
    } catch (err) {
      throw err;
    }
    return hash;
  }

  // 保存新用户
  async save(obj) {
    this.username = obj.username;
    this.password = obj.password;
    this.avatar = obj.avatar;

    this.password = await this.hashPwd();
    const newUser = new UserDB({
      username: this.username,
      password: this.password,
      avata: this.avatar
    })
    let saveUser;
    try {
      saveUser = await newUser.save();
    } catch (err) {
      throw err;
    }
    return saveUser;
  }

  // 根据用户名查找用户信息
  async findUserByName(username) {
    let user;
    try {
      user = await UserDB.findOne({
        username: username
      })
    } catch (err) {
      throw err;
    }
    return user;
  }

  // 根据_id查找用户信息
  async findUserById(_id) {
    let user;
    try {
      user = await UserDB.findById(_id);
    } catch (err) {
      throw err;
    }
    return user;
  }

}

export default User;