<template>
  <div
    id="modal"
    :class="showModal ? 'modal' : 'hidden'"
    hidden
    @click="windowClick"
  >
    <transition name="bounce">
      <!-- Modal content -->
      <div v-if="showModal" class="flex align-center gap-56 ma-auto">
        <!-- <div class="modal-nav-arrow fa fa-arrow-left"></div> -->
        <div class="modal-content" :style="`width: ${width}`">
          <div class="flex justify-end pt-12 pr-12">
            <span
              class="fa-solid fa-xmark pointer"
              style="font-size: 18px"
              @click="changeModalStatus(false)"
            ></span>
          </div>
          <div class="overflow px-28 pb-28">
            <slot>
              <div>Custom Template</div>
            </slot>
          </div>
        </div>
        <!-- <div class="modal-nav-arrow fa fa-arrow-right"></div> -->
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: "800px",
    },
    persistent: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const showModal = ref(false);

    watch(
      () => props.modelValue,
      () => {
        showModal.value = props.modelValue;
      }
    );

    const changeModalStatus = (value: boolean) => {
      showModal.value = value;
      emit("update:modelValue", value);
    };

    const windowClick = (e: Event) => {
      let modal = document.getElementById("modal");
      if (e.target == modal && !props.persistent) {
        changeModalStatus(false);
      }
    };

    return {
      showModal,
      changeModalStatus,
      windowClick,
    };
  },
});
</script>

<style lang="scss" scoped>
/* The Modal (background) */
.modal {
  display: block; /* Show modal */
  display: flex;
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  // padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.5); /* Black w/ opacity */
  backdrop-filter: blur(4px);
  &-content {
    background-color: #fefefe;
    // margin: auto;
    max-height: 80%;
    border-radius: 16px;
    box-shadow: 0px 4px 24px rgba(253, 82, 154, 0.06);
  }
  &-nav-arrow {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 77px;
    height: 77px;
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
    font-size: 20px;
    font-weight: $font-bolder;
    border-radius: 100%;
  }
}

.hidden {
  display: hidden;
}

.overflow {
  max-height: 600px;
  overflow: auto;
}

.bounce-enter-active {
  animation: bounce-in 0.3s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
