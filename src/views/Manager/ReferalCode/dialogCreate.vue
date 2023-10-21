<template>
  <v-dialog v-model="isDialog" width="400">
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
        />
        <div class="code__dialog-input-label mt-2">Username</div>
        <v-autocomplete 
          dense hide-details 
          placeholder="Pilih Username" 
          :items="usernames" item-text="username"
          :search-input.sync="search" 
          return-object outlined 
          class="code__header-label" 
          v-model="selectedUser" 
          clearable
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
      postReferralCode : 'manageSocmed/postReferralCode'
    }),
    fetchAdminData() {
      this.loading = true
      const payload = {
        page: 1
      };
      return this.fetchListAccounts(payload)
        .then((response) => {
          this.usernames = response;
        });
    },
    closeDialog () {
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
          console.log(response)
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
    isForm () {
      const dataForm = {
        ...this.payloadCode,
        accountId : this.selectedUser.accountId
      }
      return dataForm
    }
  },
  watch: {
    isForm (value) {
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
    search(value) {
      if (this.isLoading) return
      this.isLoading = true
      setTimeout(() => {
        const payload = {
          value
        }
        return this.searchAccounts(payload)
          .then((response) => {
            const reformatData = response.map((r) => {
              return {
                username : r.username,
                accountId : r.id
              }
            })
            this.usernames = reformatData;
            this.isLoading = false
          })
          .catch(() => this.isLoading = false)
      }, 1000)
    }
  },
}
</script>

<style lang="scss" src="./style.scss"></style>