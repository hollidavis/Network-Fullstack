<template>
  <main class="container-fluid">
    <div class="row flex-grow-1">
      <div class="col-md-3 shadow bg-light hidden-mobile">
        <Login v-if="user.isAuthenticated" />
      </div>
      <div class="col-md-9">
        <div class="row bg-primary">
          <Navbar />
        </div>
        <router-view />
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
