<template>
  <div class="row">
    <div class="col-12">
      <Thread :posts="posts" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, onUpdated } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { postsService } from '../services/PostsService'
import Pop from '../utils/Notifier'
export default {
  name: 'Search',
  setup() {
    onMounted(async() => {
      try {
        await postsService.searchPosts()
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    onUpdated(async() => {
      try {
        await postsService.searchPosts()
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      posts: computed(() => AppState.searchPosts)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
