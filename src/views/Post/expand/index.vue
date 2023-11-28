<template>
  <div class="ex__card">
    <div class="d-flex justify-space-between">

      <div class="ex__filters" >
        <div v-if="$route.name !== 'draft' && $route.name !==  'schedule' " class="ex__label">Sorted By</div>
        <v-select
          v-if="$route.name !== 'draft' && $route.name !==  'schedule'  "
          dense
          hide-details
          solo
          flat
          :items="$route.name === 'schedule' ? itemsSchedule : items "
          item-text="label"
          v-model="sort"
          class="expand__field"
          return-object
          style="width : 160px"
          placeholder="Waktu publish"
        />
        <div class="ex__label">Filter </div>
          <SelectUser/>
          <SelectChannel :items="channels"/>
          <SelectDate/>
          <!-- <Tayang  v-if="$route.name === 'list'  " /> -->
            <custom-button 
              v-if="isFilterable && !isReset"
              color="kellygreen" 
              class="mr-2"
              @click="onSubmit"
          >
            <div class="white--text">Terapkan Filter</div>
          </custom-button>
          <custom-button v-if="isFilterable && !isReset" @click="onCancel" > Batalkan </custom-button>
          <custom-button v-if="isReset" @click="onReset" > Reset </custom-button>
          
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex"
import SelectUser from './selectUsers.vue';
import SelectChannel from './selectChannel.vue';
import SelectDate from "./selectDate.vue";
import Tayang from "./tayang.vue";
export default {
  mounted () {
    this.fetchDataChannel()
  },
 
  components: { 
    SelectUser,
    SelectChannel,
    SelectDate,
    Tayang
  },
  data() {
    return {
      selectedUser : [],
      isReset : false,
      channels : [],
      itemsSchedule : [
        {
          label : 'Waktu Publish',
          value : 'scheduledTime,ASC'
        },
        {
          label : 'Waktu Level Dipilih',
          value : 'levellingAt,DESC'
        }
      ],
      items : [
        {
          label : 'Waktu Publish',
          value : 'publishedAt,DESC'
        },
        {
          label : 'Waktu Level Dipilih',
          value : 'levellingAt,DESC'
        }
      ]
    };
  },
  computed : {
    ...mapState ({
      sortBy : (state) => state.post.sortBy,
      isFilterable : (state) => state.post.isFilterable,
      channelCode: (state) => state.post.channelCode,
      paramsUsers: (state) => state.post.paramsUsers,
      paramsChannel: (state) => state.post.paramsChannel,
      paramsDate: (state) => state.post.paramsDate,
      paramsProcess: (state) => state.post.paramsProcess,
      isStatusProcess: (state) => state.post.isStatusProcess,
    }),
    sort : {
      get () {
        return this.sortBy
      },
      set (value) {
        this.setIsFilterable(true)
        this.setSortBy(value)
      }
    },
  },
  watch : {
    // sortBy (value) {
    //   if(value) {
    //     this.setIsFilterable(true)
    //   }
    // },
    // paramsUsers (value) {
    //   if(value) {
    //     this.setIsFilterable(true)
    //   }
    // },
    // paramsChannel (value) {
    //   if(value) {
    //     this.setIsFilterable(true)
    //   }
    // },
    // paramsDate (value) {
    //   if(value) {
    //     this.setIsFilterable(true)
    //   }
    // },
    // paramsProcess (value) {
    //   if(value) {
    //     this.setIsFilterable(true)
    //   }
    // }
  },
  methods: {
    ...mapActions({
      getListChannel: "channel/getAllChannel",
      filterFeed : "post/filterFeed"
    }),
    ...mapMutations({
      setSortBy : 'post/setSortBy',
      setIsFilterable : 'post/setIsFilterable'
    }),
    onChange (value) {
      console.log(value)
      
    },
    fetchDataChannel () {
      return this.getListChannel()
        .then(response => {
          const responseData = response.data.data
          this.channels = responseData
        })
        .catch(() => {
          this.channels = []
        })
    },
    onSubmit () {
      this.$emit('onSubmitFilter')
      this.isReset = true
    },
    onCancel() {
      this.setIsFilterable(false)
      this.$emit('onCancel', false)
    },
    onReset () {
      this.isReset = false
      this.setIsFilterable(false)
      this.$emit('onCancel', false)
    }
  },
};
</script>


<style lang="scss" scoped>
.ex {
  &__card {
    padding: 8px 16px;
    background-color: #eeeeee;
    width: 100%;
    border-radius: 0;
  }
  &__field {
    width: 180px;
  }
  &__label {
    color: #9b9b9b;
    font-size: 12px;
    line-height: 14px;
    align-self: center;
  }
  &__filters {
    display: flex;
    // grid-template-columns:55px 170px 50px 120px 120px 190px 310px;
    gap: 8px;
  }
  &__filters-draft {
    display: grid;
    grid-template-columns: 50px 120px 120px 190px 310px;
    gap: 8px;
  }
}
</style>