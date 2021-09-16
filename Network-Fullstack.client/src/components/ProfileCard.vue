<template>
  <div class="row">
    <div class="card w-100 bg-light">
      <img class="card-img-top banner" :src="activeProfile.coverImg" alt="cover image">
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
            <button type="button" class="btn btn-primary" v-if="activeProfile.id === account.id" data-toggle="modal" data-target="#editProfileModal">
              <span class="fa fa-edit"></span> Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal -->
  <div class="modal fade"
       id="editProfileModal"
       tabindex="-1"
       role="dialog"
       aria-labelledby="modelTitleId"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            Edit Profile
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="editAccount">
            <!-- Name -->
            <div class="form-group">
              <input type="text"
                     name="name"
                     v-model="state.newAccount.name"
                     class="
                     form-control"
                     placeholder="Name..."
                     required
              >
            </div>
            <!-- class/graduated -->
            <div class="d-flex justify-content-between">
              <!-- Class -->
              <div class="form-group w-75">
                <input type="text"
                       name="class"
                       v-model="state.newAccount.class"
                       class="
                     form-control"
                       placeholder="Class..."
                >
              </div>
              <!-- Graduated -->
              <div class="form-group d-flex align-items-center">
                <label class="m-0" for="graduated">Graduated:</label>
                <input type="checkbox"
                       name="graduated"
                       v-model="state.newAccount.graduated"
                       class="ms-2"
                >
              </div>
            </div>
            <!-- Picture -->
            <div class="form-group">
              <input type="text"
                     name="picture"
                     v-model="state.newAccount.picture"
                     class="
                     form-control"
                     placeholder="Profile Picture..."
              >
            </div>
            <!-- Bio -->
            <div class="form-group">
              <textarea
                name="bio"
                rows="4"
                cols="50"
                class="form-control"
                placeholder="Bio..."
                v-model="state.newAccount.bio"
              ></textarea>
            </div>
            <!-- CoverImg -->
            <div class="form-group">
              <input type="text"
                     name="coverImg"
                     v-model="state.newAccount.coverImg"
                     class="
                     form-control"
                     placeholder="Cover Image..."
              >
            </div>
            <!-- Email -->
            <div class="form-group">
              <input type="text"
                     name="email"
                     v-model="state.newAccount.email"
                     class="
                     form-control"
                     placeholder="Email..."
              >
            </div>
            <!-- github -->
            <div class="form-group">
              <input type="text"
                     name="github"
                     v-model="state.newAccount.github"
                     class="
                     form-control"
                     placeholder="Github Link..."
              >
            </div>
            <!-- Linkedin -->
            <div class="form-group">
              <input type="text"
                     name="linkedin"
                     v-model="state.newAccount.linkedin"
                     class="
                     form-control"
                     placeholder="LinkedIn Link..."
              >
            </div>
            <!-- Resume -->
            <div class="form-group">
              <input type="text"
                     name="resume"
                     v-model="state.newAccount.resume"
                     class="
                     form-control"
                     placeholder="Resume Link..."
              >
            </div>
            <button type="submit" class="btn btn-success">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService'
import Pop from '../utils/Pop'
import $ from 'jquery'
export default {
  setup() {
    const state = reactive({
      newAccount: {}
    })
    return {
      state,
      async editAccount() {
        try {
          await accountService.editAccount(state.newAccount)
          state.newAccount = {}
          $('#editProfileModal').modal('hide')
          Pop.toast('Updated!', 'success')
        } catch (error) {
          Pop.toast(error, 'error')
        }
      },
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
