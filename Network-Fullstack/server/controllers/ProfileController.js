import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'

export class ProfileController extends BaseController {
  constructor() {
    super('profiles')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id', this.getProfileById)
      .get('/:id/posts', this.getProfileById)
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
      const profile = await accountService.getPostsByProfileId(req.params.id)
      res.send(profile)
    } catch (error) {
      next(error)
    }
  }
}
