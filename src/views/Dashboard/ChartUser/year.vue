<template>
  <div class="date__ctr">
    <div class="date__sublabel-passive">From</div>
    <input v-model="startYear" readonly type="text" class="date__input-passive"  />
    <div class="date__sublabel-passive">Until</div>
    <v-menu bottom left>
      <template v-slot:activator="{ on, attrs }">
        <input
          v-bind="attrs"
          v-on="on"
          type="text"
          class="date__input"
          v-model="endYear"
        />
      </template>

      <v-list>
        <v-list-item 
          link 
          v-for="(item, i) in years" :key="i"
          @click="onClick(item)"
        >
          <v-list-item-title>{{ item }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  data () {
    return {
      years : [
        2019,
        2020,
        2021,
      ],
      startYear : 2019,
      endYear : 2021
    }
  },
  methods : {
    onClick (params) {
      this.endYear = params
      const payload = {
        startAt : 2019,
        endAt : params
      }
      this.$emit('getPayloadYear', payload)
    }
  }
}
</script>

<style lang="scss" scoped>
.date {
  &__input {
    background: #fafafa;
    box-sizing: border-box;
    padding: 9px 9px 9px 10px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: bold;
  }
  &__input:focus {
    outline: none !important;
  }
  &__input-passive {
    background: #FAFAFA;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 9px 9px 9px 10px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: bold;
  }
  &__input-passive:focus {
    outline: none !important;
  }
  &__ctr {
    display: flex;
    align-items: center;
  }
  &__sublabel-passive {
    color: #777777 ;
    font-size: 12px;
    font-weight: 500;
    margin-right: 8px;
  }
  &__sublabel {
    color: #000000;
    font-size: 12px;
    font-weight: bold;
    margin-right: 8px;
    margin-left: 32px;
  }
}
</style>