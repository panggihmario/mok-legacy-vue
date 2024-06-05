<template>
  <div>
    <HeaderContent :list="crumbs" label="List Verifikasi ID" />
    <v-data-table
      :headers="headers"
      hide-default-footer
      :items-per-page="10"
      :items="items"
    >
      <template v-slot:item="{item}">
        <tr>
          <td class="item__label">{{ item.submited }}</td>
          <td class="item__label">{{ item.submited }}</td>
          <td class="item__label">{{ item.submited }}</td>
          <td class="item__label">{{ item.submited }}</td>
          <td class="item__label">{{ item.submited }}</td>
          <td class="item__label">{{ item.submited }}</td>
          <td class="item__label">{{ item.submited }}</td>
          <td class="item__label">{{ item.submited }}</td>
          <td class="item__label">{{ item.submited }}</td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent/index.vue";
export default {
  components : {
    HeaderContent
  },
  data () {
    return {
      crumbs: [
        {
          text: "Manage Account",
          disabled: false,
          href: "/user",
        },
        {
          text: "Verifikasi ID User",
          disabled: true,
        },
      ],
      items : [
        {
          submited : '11/04/2020',
          total : '2',
          idType : 'Kartu Identitas',
          country : 'Indonesia',
          username : 'rudeusazkina',
          name : 'Rudeus Azkina Alfonse',
          status : 'Menunggu Proses Verifikasi',
          party : 'VERIFIED'
        }
      ],
      headers : [
        {
          text : 'Tgl Submit',
          value : 'submited',
          class : 'whitesnow',
          sortable: false,
          filterable: false,
        },
        {
          text : 'Submit',
          value : 'total',
          class : 'whitesnow',
          sortable: false,
          filterable: false,
        },
        {
          text : 'Tipe Id',
          value : 'idType',
          class : 'whitesnow',
          sortable: false,
          filterable: false,
        },
        {
          text : 'Negara',
          value : 'country',
          class : 'whitesnow',
          sortable: false,
          filterable: false,
        },
        {
          text : 'Username',
          value : 'username',
          class : 'whitesnow',
          sortable: false,
          filterable: false,
        },
        {
          text : 'Nama User',
          value : 'name',
          class : 'whitesnow',
          sortable: false,
          filterable: false,
        },
        {
          text : 'Status Verifikasi',
          value : 'status',
          class : 'whitesnow',
          sortable: false,
          filterable: false,
        },
        {
          text : '3rd Party Status',
          value : 'party',
          class : 'whitesnow',
          sortable: false,
          filterable: false,
        },
        {
          text : 'Action',
          value : 'submited',
          class : 'whitesnow',
          sortable: false,
          filterable: false,
        }
      ]
    }
  },
}
</script>

<style lang="scss" scoped>
.item {
  &__label {
    color: var(--Grey, #777);
    font-family: Roboto;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
}
</style>