import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
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

  async editProfile(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const account = await accountService.editProfile(req.body)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }
}
