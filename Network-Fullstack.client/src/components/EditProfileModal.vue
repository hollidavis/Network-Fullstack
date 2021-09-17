<template>
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
import { reactive } from '@vue/reactivity'
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
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
