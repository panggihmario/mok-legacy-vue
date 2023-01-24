<template>
  <div>
    <HeaderContent
      label="Tambah Penggalangan Dana"
      :list="crumbs"
    />
    <div :class="d.columns">
      <div :class="d.first">
        <k-input label="judul donasi" />
        <div :class="d.subcolumns">
          <div>
            <div>
              <div> Gambar Donasi di MOK</div>
              <custom-upload text color="primary"/>
            </div>
          </div>
          <div>
            right
          </div>
        </div>
      </div>
      <div :class="d.second">

      </div>
      </div>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
export default {
  components : {
    HeaderContent,
  },
  data () {
    return {
      crumbs: [
        {
          text: "List Penggalangan Dana",
          href: "/donations",
          disabled: false,
        },
        {
          text: "Penggalangan Dana",
          disabled: true,
        },
      ],
    }
  },
}
</script>

<style lang="scss" module="d">
.columns {
  display: flex;
  gap: 40px;
}
.subcolumns  {
  display: flex;
  height: 9.375rem;
  gap: 10px;
}
.subcolumns div:nth-child(1) {
  flex: 1 1 78%;
}
.subcolumns div:nth-child(2){
  flex: 1 1 22%;
}
.subcolumns > div  {
  border-radius: 5px;
  border: 1px dashed #BBBBBB;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.columns .first {
  flex: 1 1 60%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.columns .second {
  flex: 1 1 40%;
}
</style>