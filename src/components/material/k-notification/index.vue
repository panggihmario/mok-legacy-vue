<template>
  <div>
    <div id="snackbar" v-if="show">lol</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from "vue";

export default defineComponent({
  name: "notification",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    watch(
      () => props.show,
      () => {
        if (props.show == true) {
          setTimeout(() => {
            emit("stopShow");
          }, 2500);
        }
      }
    );
  },
});
</script>

<style lang="scss" scoped>
#snackbar {
  min-width: 250px;
  margin-left: -125px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 2px;
  padding: 16px;
  position: fixed;
  z-index: 1;
  top: 30px;
  right: 30px;
  font-size: 17px;
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2s;
  animation: fadein 0.5s, fadeout 0.5s 2s;
}

@-webkit-keyframes fadein {
  from {
    right: 0;
    opacity: 0;
  }
  to {
    right: 30px;
    opacity: 1;
  }
}

@keyframes fadein {
  from {
    right: 0;
    opacity: 0;
  }
  to {
    right: 30px;
    opacity: 1;
  }
}

@-webkit-keyframes fadeout {
  from {
    right: 30px;
    opacity: 1;
  }
  to {
    right: 0;
    opacity: 0;
  }
}

@keyframes fadeout {
  from {
    right: 30px;
    opacity: 1;
  }
  to {
    right: 0;
    opacity: 0;
  }
}
</style>
