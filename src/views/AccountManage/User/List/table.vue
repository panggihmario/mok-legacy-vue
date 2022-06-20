<template>
  <v-data-table
    :headers="headers"
    :items="data"
    :page.sync="page"
    :items-per-page="10"
    v-model="selected"
    item-key="id"
    hide-default-footer
  >
    <template v-slot:item="{ item }">
      <tr>
        <td class="item__data">
          <div class="d-flex align-center">
            <v-avatar v-if="item.photo" size="35" class="mr-2">
              <img :src="item.photo" />
            </v-avatar>
            <v-avatar
              v-else
              size="35"
              class="mr-2"
              color="gainsboro"
            ></v-avatar>
            <span class="font-weight-medium">{{ item.user }}</span>
          </div>
        </td>
        <td class="item__data">{{ item.username }}</td>
        <td class="item__data">
          <span v-if="item.type == 'General'" class="grey--text">{{
            item.type
          }}</span>
          <span v-else class="primary--text">{{ item.type }}</span>
        </td>
        <td class="item__data">
          <span v-if="item.verified" class="dodgerblue--text">Verified</span>
          <span v-else class="silver--text">Not Verified</span>
        </td>
        <td class="item__data">
          <div class="d-flex justify-space-between align-center">
            <v-btn
              @click="openFeeds(item)"
              elevation="0"
              color="whitesnow"
              x-small
            >
              <v-icon left x-small> far fa-image </v-icon>
              <div class="text-capitalize text--charcoal">List Post</div>
            </v-btn>
            <v-btn
              :disabled="role === 'ROLE_ADMIN' ? false : true"
              @click="moveToEdit(item.id)"
              elevation="0"
              color="whitesnow"
              x-small
            >
              <v-icon left x-small> fas fa-edit </v-icon>
              <div class="text-capitalize text--charcoal">Edit User Info</div>
            </v-btn>
          </div>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
import { mapState } from "vuex";
export default {
  props : {
    data : {
      type : [Array, Object]
    }
  },
  computed : {
    ...mapState({
      role: (state) => state.authentication.role,
    }),
  },
  data () {
    return {
      page : 1,
      selected: [],
      headers: [
        {
          text: "User",
          value: "user",
          class: "whitesnow",
          sortable: false,
          filterable: false,
        },
        {
          text: "Username",
          value: "username",
          class: "whitesnow",
          sortable: false,
          filterable: false,
        },
        {
          text: "Account Type",
          value: "type",
          class: "whitesnow",
          sortable: false,
          filterable: false,
        },
        {
          text: "Verified Account",
          value: "verified",
          class: "whitesnow",
          sortable: false,
          filterable: false,
        },
        {
          text: "Manage",
          value: "manage",
          class: "whitesnow",
          align: "center",
          sortable: false,
          filterable: false,
          width: 240,
        },
      ],
    }
  },
  methods : {
     openFeeds(item) {
      const name = item.user;
      this.$router.push({
        name: "feedUser",
        params: {
          id: item.id,
          name,
        },
      });
    },
    moveToEdit(id) {
      const route = this.$route
      this.$router.push({
        name: "userEdit",
        params: {
          id: id,
          page : route.params.page
        },
        ...(route.query.search &&  {
          query : {
            keyword : route.query.search
          }
        })
      });
    },
  }
}
</script>