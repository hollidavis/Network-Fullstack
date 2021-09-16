<template>
  <main class="container-fluid">
    <div class="row">
      <div class="col-md-3 shadow bg-light hidden-mobile">
        <Login v-if="user.isAuthenticated" />
      </div>
      <div class="col-md-9">
        <div class="row bg-primary">
          <div class="col-12 shadow">
            <Navbar />
          </div>
        </div>
        <div class="row justify-content-around side-bar-scroll h-100">
          <div class="col-md-12">
            <!-- Current page goes here -->
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      user: computed(() => AppState.user),
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

</style>
