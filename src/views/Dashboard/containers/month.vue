<template>
  <div class="date__ctr">
    <div class="date__sublabel-passive">From</div>
    <input v-model="startMonth" readonly type="text" class="date__input-passive"  />
    <div class="date__sublabel-passive">Until</div>
    <v-menu bottom left>
      <template v-slot:activator="{ on, attrs }">
        <input
          v-bind="attrs"
          v-on="on"
          type="text"
          class="date__input"
          v-model="endMonth"
        />
      </template>

      <v-list>
        <v-list-item 
          link 
          v-for="(item, i) in months" :key="i"
          @click="onClick(item)"
        >
          <v-list-item-title>{{ item.label }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import moment from "moment"
export default {
  methods : {
    onClick (params) {
      const currentMonth = params.value
      let valueMonth = currentMonth - 3

      this.endMonth = params.label
      if(valueMonth <= 0) {
        this.startMonth = 'January'
        valueMonth = 1
      }else{
        this.startMonth = this.months[valueMonth - 1].label
      }
      const payload = {
        startAt : valueMonth,
        endAt : currentMonth
      }
      this.$emit('getPayloadMonth', payload)
    },
    getMonths () {
      const currentMonth = moment().format("MMMM")
      const startMonth = moment().subtract(2, 'months').format('MMMM')
      this.endMonth = currentMonth
      this.startMonth = startMonth
    }
  },
  mounted() {
    this.getMonths()
  },
  data() {
    return {
      menu2: false,
      startMonth : 'August',
      endMonth : 'September',
      months: [
        {
          label: "January",
          value: 1,
        },
        {
          label: "February",
          value: 2,
        },
        {
          label: "March",
          value: 3,
        },
        {
          label: "April",
          value: 4,
        },
        {
          label: "May",
          value: 5,
        },
        {
          label: "June",
          value: 6,
        },
        {
          label: "July",
          value: 7,
        },
        {
          label: "August",
          value: 8,
        },
        {
          label: "September",
          value: 9,
        },
        {
          label: "October",
          value: 10,
        },
        {
          label: "November",
          value: 11,
        },
        {
          label: "December",
          value: 12,
        },
      ],
    };
  },
};
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