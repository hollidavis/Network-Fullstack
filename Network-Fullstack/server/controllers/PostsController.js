import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { postsService } from '../services/PostsService'

export class PostsController extends BaseController {
  constructor() {
    super('api/posts')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.edit)
      .delete('/:id', this.destroy)
  }

  async getAll(req, res, next) {
    try {
      const page = Math.abs(Math.floor(req.query.page)) || 1
      const searchTerm = req.query.query || ''
      delete req.query.page
      delete req.query.query
      const data = await postsService.find(req.query, page, searchTerm)
      res.send(data)
    } catch (error) { next(error) }
  }

  // async getAll(req, res, next) {
  //   try {
  //     const posts = await postsService.getAll()
  //     res.send(posts)
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  async getById(req, res, next) {
    try {
      const post = await postsService.getById(req.params.id)
      res.send(post)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const post = await postsService.create(req.body)
      res.send(post)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      delete req.body.closed
      req.body.creatorId = req.userInfo.id
      const post = await postsService.edit(req.params.id, req.body)
      res.send(post)
    } catch (error) {
      next(error)
    }
  }

  async destroy(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const post = await postsService.destroy(req.params.id, req.body)
      res.send(post)
    } catch (error) {
      next(error)
    }
  }
}
