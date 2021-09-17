import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class PostsService {
  async getAll() {
    const posts = await dbContext.Posts.find().populate('creator', 'name picture')
    return posts
  }

  async getById(id) {
    const post = await dbContext.Posts.findById(id).populate('creator', 'name picture')
    if (!post) {
      throw new BadRequest('Invalid Id')
    }
    return post
  }

  async create(body) {
    const post = await dbContext.Posts.create(body)
    return await dbContext.Posts.findById(post._id).populate('creator', 'name picture')
  }

  async edit(id, body) {
    const post = await this.getById(id)
    if (!post) {
      throw new BadRequest('Invalid Id')
    }
    if (post.creatorId.toString() !== body.creatorId) {
      throw new Forbidden('This is not your post')
    }
    const updated = await dbContext.Posts.findByIdAndUpdate(id, body, { new: true }).populate('creator', 'name picture')
    return updated
  }

  async destroy(id, body) {
    const post = await this.getById(id)
    if (!post) {
      throw new BadRequest('Invalid Id')
    }
    if (post.creatorId.toString() !== body.creatorId) {
      throw new Forbidden('This is not your post')
    }
    const updated = await dbContext.Posts.findByIdAndDelete(id)
    return updated
  }
}

export const postsService = new PostsService()
