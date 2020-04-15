<template>
  <div>
    <div class="d-flex flex-wrap">
      <div v-for="(item, i) in items" :key="i" class="mr-6">
        <CardTotalArticle
          :title="item.title"
          :total="item.total"
          :icon="item.icon"
          :description="item.description"
          :link="item.link"
        />
      </div>
    </div>
    <br />
    <div class="d-flex flex-wrap">
      <div v-for="(item, i) in itemsArticle" :key="i" class="mr-6">
        <CardArticle :image="item.image" :title="item.title" :link="item.link" />
      </div>
    </div>
    <br />
    <div class="d-flex flex-wrap">
      <div v-for="(item, i) in itemsTrending" :key="i" class="mr-6">
        <CardTrending
          :title="item.title"
          :description="item.description"
          :image="item.image"
          :link="item.link"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CardTotalArticle from "@/components/material/Card/CardTotalArticle";
import CardArticle from "@/components/material/Card/CardArticle";
import CardTrending from "@/components/material/Card/CardTrending";
export default {
  components: {
    CardTotalArticle,
    CardArticle,
    CardTrending
  },
  data() {
    return {
      items: [
        {
          title: "Reported Account",
          total: 120,
          icon: "home",
          description: "Total akun yang di laporkan",
          link: "reported"
        },
        {
          title: "Managing Donation",
          total: 50,
          icon: "account",
          description: "Total donasi yang didaftarkan",
          link: "donation"
        }
      ],
      itemsArticle: [
        {
          image: "https://dummyimage.com/100x100/ddd/000",
          title: "Reported Account",
          link: "reported"
        },
        {
          image: "https://dummyimage.com/100x100/000/fff",
          title: "Reported Account",
          link: "reported"
        }
      ],
      itemsTrending: [
        {
          title:
            "Bahagia Terawan Teori Terbukti: Corona, Penyakit yang Akan Sembuh Sendiri",
          description:
            "Kebahagiaan itu disampaikan Terawan kala konferensi bersama Juru Bicara Pemerintah untuk Urusan Virus Corona, Achmad Yurianto di RSUP Persahabatan, Jakarta Timur, Kamis (12/3/2020).",
          image: "https://dummyimage.com/100x100/000/fff",
          link: "donation"
        },
        {
          title:
            "Bahagia Terawan Teori Terbukti: Corona, Penyakit yang Akan Sembuh Sendiri",
          description:
            "Kebahagiaan itu disampaikan Terawan kala konferensi bersama Juru Bicara Pemerintah untuk Urusan Virus Corona, Achmad Yurianto di RSUP Persahabatan, Jakarta Timur, Kamis (12/3/2020).",
          image: "https://dummyimage.com/100x100/ddd/000",
          link: "donation"
        }
      ]
    };
  }
};
</script>
