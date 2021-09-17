<template>
  <div class="row" v-if="activeProfile">
    <ProfileCard />
    <CreatePost v-if="activeProfile.id === account.id" />
    <div class="col-12">
      <Thread :posts="posts" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { postsService } from '../services/PostsService'
import Pop from '../utils/Pop'
import { useRoute } from 'vue-router'
import { profilesService } from '../services/ProfilesService'
export default {
  name: 'Profile',
  setup() {
    const route = useRoute()
    onMounted(async() => {
      try {
        await profilesService.getProfileById(route.params.id)
        await postsService.getPostsByProfileId(route.params.id)
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      route,
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account),
      activeProfile: computed(() => AppState.activeProfile)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
