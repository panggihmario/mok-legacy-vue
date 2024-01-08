<template>
  <div>
    <v-data-table
      hide-default-footer 
      :headers="headers" 
      :items="items"
      class="grey--text my-table" 
    >
      <template v-slot:item.feedId="{item}">
        <div class="tab-socmed__data">{{ item.feedId   }}</div>
      </template>
      <template v-slot:item.publishedAt="{item}">
        <div class="tab-socmed__data">{{ item.publishedAt   }}</div>
      </template>
      <template v-slot:item.createBy="{item}">
        <div class="tab-socmed__data">{{ item.createBy   }}</div>
      </template>
      <template v-slot:item.seenAt="{item}">
        <div class="tab-socmed__data">{{ item.seenAt   }}</div>
      </template>
      <template v-slot:item.description="{item}">
        <div class="tab-socmed__data">{{ item.description   }}</div>
      </template>
      <template v-slot:item.url="{item}">
        <div @click="copyUrl" class="tab-socmed__copy">Copy Url</div>
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  methods : { 
    copyUrl () {
      navigator.clipboard.writeText('copy url')
    }
  },
  data () {
    return {
      headers : [
        {
          text : 'Feed ID',
          sortable : false,
          value : 'feedId',
          filterable : false,
          width : 80
        },
        {
          text : 'Published at',
          sortable : false,
          value : 'publishedAt',
          filterable : false,
          width : 150
        },
        {
          text : 'Created by',
          sortable : false,
          value : 'createBy',
          filterable : false
        },
        {
          text : 'Seen At',
          sortable : false,
          value : 'seenAt',
          filterable : false
        },
        {
          text : 'Description',
          sortable : false,
          value : 'description',
          filterable : false
        },
        {
          text : 'Url Konten',
          sortable : false,
          value : 'url',
          filterable : false
        }
      ],
      items : [
        {
          feedId : '4028808a8ca877fe018ca879dc2d003c',
          publishedAt : '2023-12-27 06.33.28',
          createBy : 'musicismylife',
          seenAt : '2023-12-27 06.44.26',
          description : 'Description',
          url : 'URL'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-socmed {
  &__data {
    color: #000;
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  &__copy {
    color: var(--Secondary, #1890FF);
    font-size: 11px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    cursor: pointer;
  }
}
.my-table thead th {
  background-color: #fafafa;
  // &:first-child { border-radius: 10px 0 0 0; }
  // &:last-child { border-radius: 0 10px 0 0; }
}
</style>