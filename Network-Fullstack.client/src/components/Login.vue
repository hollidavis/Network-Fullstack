<template>
  <div class="login">
    <!-- Profile Image & graduated status -->
    <div class="row my-5 cursor" @click.stop="getProfileById">
      <div class="w-100 d-flex justify-content-center align-items-center">
        <img class="profile-img round-border" :src="account.picture" :alt="account.name">
      </div>
      <div class="w-100 d-flex align-items-end justify-content-end spill">
        <span class="p-3 bg-light round-border fa fa-user-graduate fa-2x" aria-hidden="true" v-if="account.graduated == true"></span>
        <span class="p-3 bg-light round-border fa fa-user fa-2x" aria-hidden="true" v-else></span>
      </div>
    </div>
    <!-- Profile Info -->
    <div class="row flex-column">
      <!-- Name & Class -->
      <div class="col mx-3">
        <p class="text-gray m-0">
          {{ account.class }}
        </p>
        <h4>{{ account.name }}</h4>
      </div>
      <!-- Links -->
      <div class="col mt-3 d-flex flex-column mx-3 text-dark">
        <p v-if="account.github" class="lead cursor" :href="account.github">
          <span class="me-2 fab fa-lg fa-github"></span><b> GitHub</b>
        </p>
        <p v-if="account.linkedin" class="lead cursor" :href="account.linkedin">
          <span class="me-2 fab fa-lg fa-linkedin"></span><b> LinkedIn</b>
        </p>
        <p v-if="account.resume" class="lead cursor" :href="account.resume">
          <span class="me-3 fa fa-lg fa-file-alt"></span><b>Resume</b>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { profilesService } from '../services/ProfilesService'
import Pop from '../utils/Pop'
import { router } from '../router'
export default {
  name: 'Login',
  setup() {
    return {
      account: computed(() => AppState.account),
      async getProfileById() {
        try {
          await profilesService.getProfileById(AppState.account.id)
          router.push({ path: `/profile/${AppState.account.id}` })
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-img{
  width: 20vw;
  height: 20vw;
  object-fit: cover;
  object-position: center;
}
.spill{
margin-right: 20%;
margin-top: -25%
}
</style>
