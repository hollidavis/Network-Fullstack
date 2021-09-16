<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-primary">
    <router-link class="navbar-brand d-flex" :to="{ name: 'Home' }">
      <div class="d-flex align-items-center">
        <img
          alt="logo"
          src="../assets/img/n-logo.png"
          height="45"
        /><p class="m-0 text-secondary">
          ETWORK
        </p>
      </div>
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav mr-auto">
        <form class="form-inline my-2 my-lg-0" @submit.prevent="searchPosts">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" v-model="state.keyword">
          <button class="btn btn-outline-secondary my-2 my-sm-0 " type="submit">
            <span class="fa fa-search mr-1"></span> Search
          </button>
        </form>
      </ul>
      <span class="navbar-text">
        <button
          class="btn btn-outline-dark text-uppercase"
          @click="login"
          v-if="!user.isAuthenticated"
        >
          Login
        </button>

        <div class="dropdown" v-else>
          <div
            class="dropdown-toggle"
            @click="state.dropOpen = !state.dropOpen"
          >
            <img
              :src="user.picture"
              alt="user photo"
              height="40"
              class="round"
            />
            <span class="mx-3 text-dark">{{ user.name }}</span>
          </div>
          <div
            class="dropdown-menu p-0 list-group w-100"
            :class="{ show: state.dropOpen }"
            @click="state.dropOpen = false"
          >
            <div
              class="list-group-item list-group-item-action hoverable"
              @click="logout"
            >
              logout
            </div>
          </div>
        </div>
      </span>
    </div>
  </nav>
</template>

<script>
import { AuthService } from '../services/AuthService'
import { AppState } from '../AppState'
import { computed, reactive } from 'vue'
import { postsService } from '../services/PostsService'
import Pop from '../utils/Notifier'
import { router } from '../router'
export default {
  setup() {
    const state = reactive({
      dropOpen: false,
      keyword: ''
    })
    return {
      state,
      user: computed(() => AppState.user),
      keyword: computed(() => AppState.keyword),
      async searchPosts() {
        try {
          AppState.keyword = state.keyword
          await postsService.searchPosts({ search: state.keyword })
          router.push('search')
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style scoped>
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}
.dropdown-menu.show {
  transform: scale(1);
}
.hoverable {
  cursor: pointer;
}
a:hover {
  text-decoration: none;
}
.nav-link{
  text-transform: uppercase;
}
.nav-item .nav-link.router-link-exact-active{
  color: var(--primary);
}
.round{
  border-radius: 50%;
}
</style>
