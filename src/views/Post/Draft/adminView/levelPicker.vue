<template>
  <v-menu>
    <template v-slot:activator="{ on, attrs }">
      <div class="wrapper">
       <input 
        readonly 
        v-model="level"
        v-bind="attrs" 
        v-on="on"
        placeholder="Pilih"
      />
      </div>  
    </template>
    <v-list  dense>
      <v-list-item-group
        v-model="level"
        color="primary"
      >
        <v-list-item
          v-for="(item) in 10"
          :key="item"
        >
          <v-list-item-title>{{ item  }}</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script >
export default {
  props : {
    levelPriority : {
      type : [Number]
    }
  },
  computed : {
    level :{
      get() {
        return this.levelPriority
      },
      set(value ) {
        this.$emit('setLevelPriority', value + 1)
      }
    },
  }
}

</script>

<style lang="scss">
.wrapper {
  display: inline-block;
  position: relative;
  &::after {
      font-family: "Font Awesome 5 Free";
      font-weight: 900;
      content: "\f0dd";
      position: absolute;
      right: 6px;
      top: -2px;
    }
  & input {
    height: 24px;
    color: #4a4a4a;
    font-size: 12px;
    font-weight: 500;
    border: 1px solid #dddddd;
    box-sizing: border-box;
    border-radius: 4px;
    background: #ffffff;
    padding: 10px 10px 10px 14px;
  }
}
</style>