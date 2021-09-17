<template>
  <div class="col-12">
    <div class="card bg-light rounded shadow m-3 p-3">
      <img class="card-img-top banner" :src="activeProfile.coverImg" alt="cover image" v-if="activeProfile.coverImg">
      <div class="card-body d-flex">
        <div>
          <img class="round-border md-profile" :src="activeProfile.picture" alt="">
        </div>
        <div class="ms-3 w-100">
          <p class="lead m-0" v-if="activeProfile.class">
            {{ activeProfile.class }}
          </p>
          <h4 class="card-title">
            {{ activeProfile.name }}
            <span class="ms-2 fa fa-user-graduate" aria-hidden="true" v-if="activeProfile.graduated == true"></span>
            <span class="ms-2 fa fa-user" aria-hidden="true" v-else></span>
          </h4>
          <!-- social links -->
          <div class="d-flex">
            <p v-if="activeProfile.github" class="lead pointer" :href="activeProfile.github">
              <span class="me-4 fab fa-lg fa-github"></span>
            </p>
            <p v-if="activeProfile.linkedin" class="lead pointer" :href="activeProfile.linkedin">
              <span class="me-4 fab fa-lg fa-linkedin"></span>
            </p>
            <p v-if="activeProfile.resume" class="lead pointer" :href="activeProfile.resume">
              <span class="me-4 fa fa-lg fa-file-alt"></span>
            </p>
          </div>
          <p class="card-text" v-if="!activeProfile.bio">
            <em>No bio yet...</em>
          </p>
          <p class="card-text" v-else>
            <em>{{ activeProfile.bio }}</em>
          </p>
          <div class="w-100 d-flex justify-content-end">
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editProfileModal" v-if="activeProfile.id === account.id">
              <span class="fa fa-edit"></span> Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <EditProfileModal />
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  setup() {
    return {
      account: computed(() => AppState.account),
      activeProfile: computed(() => AppState.activeProfile)
    }
  }
}
</script>

<style lang="scss" scoped>
.banner{
  height: 20vh;
  object-fit: cover;
  object-position: center;
}
</style>
