<template>
  <div>
    <k-select
      :items="itemSelect"
      v-model="item"
    />
  </div>
</template>


<script>
export default {
  props : {
    item : Object
  },
  data () {
    return {
      itemSelect: [
        {
          value: 'active',
          label: 'Aktif'
        },
        {
          value: 'non-active',
          label: 'Non Aktif'
        }
      ],
    }
  }
}

</script>