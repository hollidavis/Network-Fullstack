<template>
  <!-- Profile Img -->
  <div class="row justify-content-center">
    <img class="profile-img rounded-pill pointer my-4" :src="account.picture" :alt="account.name" @click.stop="getProfileById">
  </div>
  <!-- Name & Class -->
  <div class="row flex-column">
    <div>
      <h2 class="text-center m-0">
        {{ account.name }}
      </h2>
      <h3 class="text-center mb-3" v-if="account.class">
        <span class="p-2 bg-light round-border fa fa-user-graduate fa-lg" aria-hidden="true" v-if="account.graduated == true"></span>
        <span class="p-2 bg-light round-border fa fa-user fa-lg" aria-hidden="true" v-else></span>
        {{ account.class }}
      </h3>
    </div>
    <!-- Links -->
    <div>
      <h5 v-if="account.github" class="lead pointer" :href="account.github">
        <span class="me-2 ms-1 fab fa-lg fa-github"></span><b> GitHub</b>
      </h5>
      <h5 v-if="account.linkedin" class="lead pointer" :href="account.linkedin">
        <span class="me-2 ms-1 fab fa-lg fa-linkedin"></span><b> LinkedIn</b>
      </h5>
      <h5 v-if="account.resume" class="lead pointer" :href="account.resume">
        <span class="me-3 ms-1 fa fa-lg fa-file-alt"></span><b>Resume</b>
      </h5>
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
  setup() {
    return {
      account: computed(() => AppState.account),
      async getProfileById() {
        try {
          await profilesService.getProfileById(this.account.id)
          router.push({ name: 'Profile', params: { id: this.account.id } })
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
  height: 40vh;
  width: 40vh;
  object-fit: cover;
  object-position: center;
}
</style>
