<template>
  <div>
    <HeaderContent label="Add Product" :list="crumbs"> </HeaderContent>
    <div class="form__box-header">
      <div class="charcoal--text">
        Pastikan produk Anda sudah sesuai dengan syarat dan ketentuan Persada,
        persada memiliki wewenang untuk melakukan take down terhadap produk jika
        produk tersebut tidak sesuai dengan aturan yang sudah ditetapkan.
      </div>
    </div>
    <div>
      <UploadImages />
    </div>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import UploadImages from "./uploadImages";
export default {
  components: {
    HeaderContent,
    UploadImages,
  },
  data() {
    return {
      crumbs: [
        {
          text: "Product",
          href: "/product",
          disabled: false,
        },
        {
          text: "List Product",
          href: "/product",
          disabled: false,
        },
        {
          text: "Add Product",
          disabled: true,
        },
      ],
    };
  },
};
</script>

<style lang="sass" scoped>
.form
	&__box-header
		height: 108px
		width: 100%
		border-radius: 10px
</style>
