<template>
  <v-dialog v-model="isDialog" width="400" @click:outside="closeDialog">
    <v-card class="code__dialog">
      <div class="code__dialog-label mb-4">Buat Referral</div>
      <form @submit.prevent="onSubmit">
        <div class="code__dialog-input-label">Referral Code  {{ code }}</div>
        <v-text-field 
          class="code__header-label" 
          dense 
          outlined 
          hide-details 
          v-model="payloadCode.referralCode" 
          placeholder="Masukkan referral code"
        />
        <div class="code__dialog-input-label mt-2">Username</div>
        <v-autocomplete 
          dense hide-details 
          placeholder="Pilih Username" 
          :items="usernames" 
          item-text="username"
          :search-input.sync="search" 
          return-object 
          outlined 
          class="code__header-label" 
          v-model="selectedUser" 
          clearable
          @click:clear="onClear"
          @change="onChange"
        >
        </v-autocomplete>
        <div class="mt-4 d-flex justify-end">
          <v-btn @click="closeDialog" small color="whitesmoke" depressed class="text-capitalize mr-2">
            Batalkan
          </v-btn>
          <v-btn 
            type="submit"
            :disabled="isDisabled"
            small depressed color="secondary" class="text-capitalize">
            Simpan
          </v-btn>
        </div>
      </form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
import * as yup from 'yup';
export default {
  data() {
    return {
      code: '',
      selectedUser: {},
      search: null,
      usernames: [],
      isDisabled: true,
      payloadCode : {
        accountId : '',
        referralCode: '',
        totalTarget : 1000,
        type : 'SOCIAL'
      }
    }
  },
  mounted() {
    this.fetchAdminData()
  },
  methods: {
    ...mapActions({
      getListAdmin: "account/getListRespone",
      fetchListAccounts: 'post/fetchListAccounts',
      searchAccounts: 'post/searchAccounts',
      postReferralCode : 'manageSocmed/postReferralCode',
      fetchUser : 'account/fetchUser',
      searchUser : 'account/searchDataUser'
    }),
    onChange(e) {
      this.payloadCode.accountId = e.accountId
    },
    onClear() {
      this.selectedUser = {}
      this.payloadCode.accountId = ''
      return this.fetchAdminData()
    },
    fetchAdminData() {
      this.loading = true
      const payload = {
        page: 1
      };
      return this.fetchUser(payload)
        .then((response) => {
          // this.usernames = response;
          console.log(response)
          const content = response.content
          const reformatData = content.map((r) => {
              return {
                username : r.username,
                accountId : r.id
              }
            })
            this.usernames = reformatData;
        });
    },
    closeDialog () {
      this.payloadCode.referralCode = ''
      this.selectedUser = {}
      this.$emit('closeDialog', false)
    },
    onSubmit () {
      const payload = {
        ...this.payloadCode,
        accountId : this.selectedUser.accountId
      }
      return this.postReferralCode(payload)
        .then(response => {
          this.closeDialog()
          this.$emit('openDialogSuccess')
        })
        .catch(err => {
          this.$emit('setError', err)
        })
    }
  },
  props: {
    dialog: {
      type: Boolean
    }
  },
  computed: {
    isDialog: {
      get() {
        return this.dialog
      },
      set(value) {
        this.$emit('closeDialog', false)
      }
    },
  },
  watch: {
    payloadCode : {
      handler (value) {
        let schema = yup.object().shape({
        referralCode : yup.string().required(),
        accountId : yup.string().required()
      })
      schema.isValid(value)
        .then(valid => {
          if(valid) {
            this.isDisabled = false
          }else{
            this.isDisabled = true
          }
        })
      },
      deep : true
    },
    search(value) {
      if (value) {
        this.isLoading = true
      setTimeout(() => {
        const payload = {
          value
        }
        return this.searchUser(payload)
          .then((response) => {
            const content = response.content
            const reformatData = content.map((r) => {
              return {
                username : r.username,
                accountId : r.id
              }
            })
            this.usernames = reformatData;
            this.isLoading = false
          })
          .catch((err) => {
            this.$emit('setError', err)
            this.isLoading = false
          })
      }, 500)
      }
     
    }
  },
}
</script>

<style lang="scss" src="./style.scss"></style>