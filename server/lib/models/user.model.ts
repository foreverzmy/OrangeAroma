import mongoose from '../controllers/dbConnect';

const Schema = mongoose.Schema;

const UserScema = new Schema({
  createTime: {
    type: Date,
    default: Date.now(),
  },
  username: {
    type: String,
    trim: true,
  },
  password: String,
  salt: String,
  avatar: String,
});

const User = mongoose.model('User', UserScema);

export default User;