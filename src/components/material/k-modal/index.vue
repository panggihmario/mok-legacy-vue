<template>
  <div>
    <!-- Trigger/Open The Modal -->
    <button @click="changeModalStatus(true)">Open Modal</button>

    <!-- The Modal -->
    <div :class="showModal ? 'modal' : 'hidden'">
      <!-- Modal content -->
      <div class="modal-content">
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
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const showModal = ref(false);
    const changeModalStatus = (value: boolean) => {
      showModal.value = value;
      emit("update:modelValue", value);
    };

    return {
      showModal,
      changeModalStatus,
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
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  &-content {
    background-color: #fefefe;
    margin: auto;
    width: 80%;
    max-height: 80%;
    border-radius: 16px;
    box-shadow: 0px 4px 24px rgba(253, 82, 154, 0.06);
  }
}

.overflow {
  max-height: 600px;
  overflow: auto;
}

.hidden {
  display: none;
}

/* The Close Button */
.close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
</style>
