<template>
  <div class="col-12">
    <div class="bg-light rounded shadow m-3 p-3">
      <div class="row justify-content-end">
        <div class="col-1" await v-if="post.creator.id == account.id">
          <button type="button" class="btn btn-sm btn-outline-danger" @click="deletePost">
            <span class="fa fa-times"></span>
          </button>
        </div>
      </div>
      <!-- Creator Info -->
      <div class="row">
        <div class="col-md-12 d-flex align-items-center">
          <!-- Profile Picture -->
          <div class="mx-3 pointer" @click.stop="getProfileById">
            <img class="round-border sm-profile" :src="post.creator.picture" :alt="post.creator.name">
          </div>
          <!-- Name, Created At, Graduated -->
          <div class="d-flex">
            <div>
              <span class="me-2 fa fa-user-graduate" aria-hidden="true" v-if="post.creator.graduated == true"></span>
              <span class="me-2 fa fa-user" aria-hidden="true" v-else></span>
            </div>
            <h3 class="m-0 lead">
              <b>{{ post.creator.name }}</b>
            </h3>
          </div>
        </div>
      </div>
      <!-- Body/Img -->
      <div class="row m-2">
        <div class="col-12">
          <p>{{ post.body }}</p>
          <div v-if="post.imgUrl">
            <img :src="post.imgUrl" class="post-img">
          </div>
        </div>
      </div>
      <!-- Likes -->
      <div class="row justify-content-end">
        <div class="col-1 d-flex flex-row justify-content-around align-items-center">
          <i class="far fa-lg fa-heart pointer" @click.stop="likePost"></i>
          <p class="m-0">
            {{ state.likes }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, watchEffect } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { postsService } from '../services/PostsService'
import Pop from '../utils/Pop'
import { profilesService } from '../services/ProfilesService'
import { router } from '../router'
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      newPost: {},
      time: '',
      likes: 0
    })
    watchEffect(() => {
      let count = 0
      props.post.likeIds.forEach(like => {
        count++
      })
      state.likes = count
    })
    return {
      state,
      account: computed(() => AppState.account),
      async deletePost() {
        try {
          if (await Pop.confirm()) {
            await postsService.destroyPost(props.post.id)
            Pop.toast('Deleted!', 'success')
          }
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async getProfileById() {
        try {
          await profilesService.getProfileById(props.post.creatorId)
          router.push({ path: `/profile/${props.post.creatorId}` })
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async likePost() {
        try {
          await postsService.likePost(props.post.id)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.post-img{
  width: 100%;
  max-height: 80vh;
  object-fit: cover;
  object-position: center;
}
</style>
