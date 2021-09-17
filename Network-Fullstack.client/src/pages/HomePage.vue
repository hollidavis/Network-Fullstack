<template>
  <div class="row justify-content-center">
    <CreatePost :posts="posts" v-if="user.isAuthenticated" />
    <Thread :posts="posts" />
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { postsService } from '../services/PostsService'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
export default {
  name: 'Home',
  setup() {
    onMounted(async() => {
      try {
        await postsService.getAllPosts()
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      user: computed(() => AppState.user),
      posts: computed(() => AppState.posts)
    }
  }
}
</script>

<style scoped lang="scss">
.ps-15{
  padding-left: 15px;
}
</style>
