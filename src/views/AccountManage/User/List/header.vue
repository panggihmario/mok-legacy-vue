<template>
  <HeaderContent :list="crumbs" :label="$t('title.user')">
    <custom-button
      color="primary"
      class="white--text"
      @click="handleClick('create')"
    >
      {{ $t("button.userCreate") }}
    </custom-button>
  </HeaderContent>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent/index.vue";
export default {
  components: {
    HeaderContent,
  },
  data () {
    return {
      crumbs: [
        {
          text: "Manage Account",
          disabled: false,
          href: "/user",
        },
        {
          text: "List User",
          disabled: true,
        },
      ],
    }
  },
  methods : {
    handleClick(params) {
      this.$router.push(`/user/${params}`);
    },
  }
};
</script>