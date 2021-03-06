import { AppState } from '../AppState'
import { api } from './AxiosService'
class ProfilesService {
  async getAllProfiles() {
    const res = await api.get('api/profiles')
    AppState.profiles = res.data
  }

  async getProfileById(id) {
    const res = await api.get('api/profiles/' + id)
    AppState.activeProfile = res.data
  }
}

export const profilesService = new ProfilesService()
