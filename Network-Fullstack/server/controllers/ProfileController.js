import { accountService } from '../services/AccountService'
import { postsService } from '../services/PostsService'
import BaseController from '../utils/BaseController'

export class ProfileController extends BaseController {
  constructor() {
    super('api/profiles')
    this.router
      .get('', this.getAllProfiles)
      .get('/:id', this.getProfileById)
      .get('/:id/posts', this.getPostsByProfileId)
  }

  async getAllProfiles(req, res, next) {
    try {
      const profiles = await accountService.getAllProfiles()
      res.send(profiles)
    } catch (error) {
      next(error)
    }
  }

  async getProfileById(req, res, next) {
    try {
      const profile = await accountService.getProfileById(req.params.id)
      res.send(profile)
    } catch (error) {
      next(error)
    }
  }

  async getPostsByProfileId(req, res, next) {
    try {
      const posts = await postsService.find({ creatorId: req.params.id })
      res.send(posts)
    } catch (error) {
      next(error)
    }
  }
}
