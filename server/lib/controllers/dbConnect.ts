import * as mongoose from 'mongoose';
import { datebase } from '../config'

(<any>mongoose).Promise = global.Promise;

mongoose.connect(`mongodb://localhost/${datebase}`);

export default mongoose;