<template>
  <div class="create-post row">
    <div class="col-12 d-flex justify-content-between my-3">
      <!-- Profile Information -->
      <div class="me-3">
        <img class="round-border sm-profile" :src="account.picture" :alt="account.name">
      </div>
      <!-- New Post Form -->
      <form @submit.prevent="createPost" class="w-100">
        <div class="form-group">
          <textarea
            name="body"
            rows="4"
            cols="50"
            class="form-control"
            placeholder="Share what's on your mind..."
            required
            v-model="state.newPost.body"
          ></textarea>
        </div>
        <div class="form-group d-flex align-items-center">
          <input
            type="text"
            name="imgUrl"
            class="form-control"
            placeholder="Image URL..."
            v-model="state.newPost.imgUrl"
          />
          <button type="submit" class="btn btn-primary d-flex align-items-center ms-3">
            <span class="fa fa-paper-plane me-2"></span> Post
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { postsService } from '../services/PostsService'
import Pop from '../utils/Pop'
export default {
  name: 'CreatePost',
  setup() {
    const state = reactive({
      newPost: {}
    })
    return {
      state,
      account: computed(() => AppState.account),
      async createPost() {
        try {
          await postsService.createPost(state.newPost)
          Pop.toast('Posted!', 'success')
          state.newPost = {}
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
