import { AppState } from '../AppState'
import { convertToQuery } from '../utils/Query'
import { api } from './AxiosService'
class ProfilesService {
  async getAllProfiles(query = {}) {
    const res = await api.get('api/profiles' + convertToQuery(query))
    AppState.profiles = res.data
  }

  async getProfileById(id) {
    const res = await api.get('api/profiles/' + id)
    AppState.activeProfile = res.data
  }
}

export const profilesService = new ProfilesService()
