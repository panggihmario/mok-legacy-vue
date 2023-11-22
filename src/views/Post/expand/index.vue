<template>
  <div class="ex__card">
    <div class="d-flex justify-space-between">

      <div class="ex__filters" :class="$route.name === 'draft' && 'ex__filters-draft' " >
        <div v-if="$route.name !== 'draft' " class="ex__label">Sorted By</div>
        <v-select
          v-if="$route.name !== 'draft'"
          dense
          hide-details
          solo
          flat
          :items="$route.name === 'schedule' ? itemsSchedule : items "
          item-text="label"
          v-model="sort"
          class="expand__field"
          return-object
        />
        <div class="ex__label">Filter </div>
          <SelectUser/>
          <SelectChannel :items="channels"/>
          <SelectDate/>
          <Tayang  v-if="$route.name === 'list'  " />
      </div>
      <div class="d-flex">
        <custom-button 
          color="kellygreen" 
          class="mr-2"
          @click="onSubmit"
        >
          <div class="white--text">Terapkan Filter</div>
        </custom-button>
        <custom-button @click="onCancel" > Batalkan </custom-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex"
import SelectUser from './selectUsers.vue';
import SelectChannel from './selectChannel.vue';
import SelectDate from "./selectDate.vue";
import Tayang from "./tayang.vue"
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
          value : 'publishAt,DESC'
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
      sortBy : (state) => state.post.sortBy
    }),
    sort : {
      get () {
        return this.sortBy
      },
      set (value) {
        this.setSortBy(value)
      }
    }
  },
  methods: {
    ...mapActions({
      getListChannel: "channel/getAllChannel",
      filterFeed : "post/filterFeed"
    }),
    ...mapMutations({
      setSortBy : 'post/setSortBy'
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
    },
    onCancel() {
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
    margin-bottom: 12px;
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
    display: grid;
    grid-template-columns:55px 170px 50px 120px 120px 190px 310px;
    gap: 8px;
  }
  &__filters-draft {
    display: grid;
    grid-template-columns: 50px 120px 120px 190px 310px;
    gap: 8px;
  }
}
</style>