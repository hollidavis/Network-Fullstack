import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { PostSchema } from '../models/Post'

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Posts = mongoose.model('Post', PostSchema);
}

export const dbContext = new DbContext()
