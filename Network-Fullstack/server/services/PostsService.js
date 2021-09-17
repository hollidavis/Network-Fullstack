import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'

class PostsService {
  async find(query = {}, page = 1, searchTerm = '') {
    const q = { ...query, body: { $regex: new RegExp(searchTerm, 'ig') } }
    const total = await dbContext.Posts.countDocuments(q)
    const limit = 20
    const pages = Math.ceil(total / limit)
    if (total === 0) {
      return { page: '0 of 0', newer: null, older: null, posts: [] }
    }
    if (page > pages) {
      throw new BadRequest('Invalid Page Number')
    }
    const posts = await dbContext.Posts.find(q)
      .populate('creator', 'name picture')
      .populate('likes', 'name picture')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
    return {
      page: `${page} of ${pages}`,
      newer: page > 1 ? `https://the-net-work.herokuapp.com/api/posts?page=${page - 1}` : null,
      older: page < pages ? `https://the-net-work.herokuapp.com/api/posts?page=${page + 1}` : null,
      posts
    }
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

  async like(postId, userId) {
    const post = await dbContext.Posts.findById(postId)
    const liked = post.likeIds.find(id => id === userId)
    if (!liked) {
      post.likeIds.push(userId)
    } else {
      post.likeIds = post.likeIds.filter(id => id !== userId)
    }
    await post.save()
    return post
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
