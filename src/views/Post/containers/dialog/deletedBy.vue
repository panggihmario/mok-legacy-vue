<template>
  <div class="d-flex">
    <!-- {{item}} -->
    <div>
      <div class="dt__label">Dihapus Pada</div>
      <div class="dt__sublabel-delete"> {{formatingDate(item.deletedAt)}} </div>
    </div>
    <div class="ml-2">
      <div class="dt__label">Dihapus Oleh</div>
      <div class="dt__sublabel"> {{item.deletedBy}} </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props : {
    item : {
      type : Object
    }
  },
  methods : {
    formatingDate(rawDate) {
      if(rawDate){
        const cek = moment(rawDate).format('DD/MM/YYYY HH:mm')
        return cek;
      }else{
        return 'Rejected'
      }
      
    },
  }
}
</script>

<style lang="scss" scoped>
.dt {
  &__label {
    color: #777777;
    font-size: 8px;
    line-height: 9px;
  }
  &__sublabel-delete {
    color: #E70000;
    font-size: 10px;
    font-weight: 500;
    line-height: 12px;
  }
  &__sublabel {
    color: #000000;
    font-size: 10px;
    font-weight: 500;
    line-height: 12px;
  }
}

</style>