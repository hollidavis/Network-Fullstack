<template>
  <div class="row">
    <Post v-for="p in posts.posts" :key="p.id" :post="p" />
  </div>
  <div class="row justify-content-between align-items-center">
    <div class="col-2">
      <button type="button" class="btn btn-outline-primary" v-if="posts.newer" @click.stop="getNewer">
        Newer
      </button>
    </div>
    <div class="col-2 d-flex justify-content-center">
      <p class="m-0">
        {{ posts.page }}
      </p>
    </div>
    <div class="col-2 d-flex justify-content-end">
      <button type="button" class="btn btn-outline-primary" v-if="posts.older" @click.stop="getOlder">
        Older
      </button>
    </div>
  </div>
</template>

<script>
import { postsService } from '../services/PostsService'
import Pop from '../utils/Pop'
export default {
  name: 'Thread',
  props: {
    posts: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    return {
      async getOlder() {
        try {
          await postsService.getOlder(props.posts.older)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async getNewer() {
        try {
          await postsService.getNewer(props.posts.newer)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
