import { AppState } from '../AppState'
import { api, blank } from './AxiosService'

class PostsService {
  async getAllPosts() {
    const res = await api.get('api/posts')
    AppState.posts = res.data
  }

  async getPostsByProfileId(id) {
    const res = await api.get('api/profiles/' + id + '/posts')
    AppState.posts = res.data
  }

  async getOlder(older) {
    const res = await blank.get(older)
    AppState.posts = res.data
  }

  async getNewer(newer) {
    const res = await blank.get(newer)
    AppState.posts = res.data
  }

  async createPost(newPost) {
    await api.post('api/posts', newPost)
    await this.getAllPosts()
  }

  async likePost(id) {
    await api.post('api/posts/' + id + '/like')
    await this.getAllPosts()
  }

  async destroyPost(id) {
    await api.delete('api/posts/' + id)
    await this.getAllPosts()
  }
}

export const postsService = new PostsService()
