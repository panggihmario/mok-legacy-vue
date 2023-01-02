<template>
  <div>
    <k-select
      :items="itemSelect"
      v-model="status"
      itemLabel="label"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props : {
    item : Object,
    index : {
      type : Number
    }
  },
  methods : {
    ...mapActions({
      updateStatusData : 'master/updateStatusData'
    })
  },
  computed : {
    status : {
      get() {
        if(this.item.isActive ) {
          return {
            label : 'Active'
          }
        }else {
          return {
            label : 'Non Aktive'
          }
        }
      },
      set(value ) {
        const params = {
          index: this.index,
          ...value
        }
        this.updateStatusData(params)
      }
    }
  },  
  data () {
    return {
      itemSelect: [
        {
          value: true,
          label: 'Active'
        },
        {
          value: false,
          label: 'Non Active'
        }
      ],
    }
  }
}

</script>