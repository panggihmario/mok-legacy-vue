<template>
  <div class="expand__card">
    <div class="d-flex justify-space-between">
      <div class="expand__filters" >
        <div v-if="$route.name !== 'draft'  " class="expand__label">Sorted By</div>
        <v-select
          v-if="$route.name !== 'draft' "
          dense
          hide-details
          solo
          flat
          :items="$route.name === 'schedule' ? itemsSchedule : items "
          item-text="label"
          v-model="sort"
          class="expand__field mr-2"
          return-object
          style="width : 160px"
          placeholder="Waktu publish"
        />
        <div class="expand__label">Filter </div>
          <v-select
            v-if="$route.name === 'schedule' || $route.name === 'list' "
            dense
            hide-details
            placeholder="Pilih Konten Level"
            solo
            flat
            class="expand__field"
            style="width : 150px"
            :items="levels"
            v-model="level"
          />
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
      levels : [
        1, 2,3,4,5,6,7,8,9,10
      ],
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
      levelPriorityFilter : (state) => state.post.levelPriorityFilter
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
    level : {
      get () {
        return this.levelPriorityFilter
      },
      set(value) {
        this.setIsFilterable(true)
        this.setLevelPriorityFilter(value)
      }
    }
  },
  watch : {
    isFilterable (value) {
      if(value) {
        this.isReset = false
      }
    },
  },
  methods: {
    ...mapActions({
      getListChannel: "channel/getAllChannel",
      filterFeed : "post/filterFeed"
    }),
    ...mapMutations({
      setSortBy : 'post/setSortBy',
      setIsFilterable : 'post/setIsFilterable',
      setLevelPriorityFilter : 'post/setLevelPriorityFilter'
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
      this.setIsFilterable(false)
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


<style lang="scss"  src="./expand.scss" >
</style>