<template>
  <div class="expand__container">
    <div class="expand__title">Filter</div>
    <k-select 
      :items="items" 
      itemLabel="label" 
      v-model="item" 
      placeholder="Status"
    />
    <k-range-date placeholder="Date Range" @getRangeDate="getRangeDate" />
    <custom-button @click="onFilter" color="success" size="small">Terapkan Filter</custom-button>
    <custom-button @click="onCancel"  size="small">Batalkan</custom-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      item : {
        value : '',
        label : ''
      },
      dates : {},
      items: [
        {
          label: 'ACTIVE'
        },
        {
          label: 'INACTIVE'
        },
      ],
    }
  },
  methods : {
    getRangeDate(payload) {
      this.dates = payload
    },
    onFilter() {
      const payload = {
        status : this.item.label,
        expiredAt : this.dates.endAt,
        createAt : this.dates.startAt
      }
      this.$emit('onFilter', payload)
    },
    onCancel () {
      this.item = {
        value : '',
        label : ''
      }
      this.$emit('onCancel')
    }
  }
}
</script>

<style lang="scss" src="../donation.scss" scoped ></style>