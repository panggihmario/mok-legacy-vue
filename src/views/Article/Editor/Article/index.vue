<template>
  <div>
    <HeaderContent label="Editor Space" :list="list"></HeaderContent>
    <div class="d-flex flex-wrap">
      <Card-Total-Article
        :title="publisher.title"
        :text="publisher.text"
        :icon="publisher.icon"
        :description="publisher.description"
        class="mr-6"
        noAction
      ></Card-Total-Article>
      <div v-for="(item, i) in items" :key="i" class="mr-6 mb-6">
        <Card-Total-Article
          :title="item.title"
          :total="item.total"
          :icon="item.icon"
          :description="item.description"
          :link="item.link"
        ></Card-Total-Article>
      </div>
    </div>

    <div class="d-flex mt-10">
      <div>
        <div class="d-flex justify-space-between align-end">
          <span>Your Article</span>
          <span class="article__action silver--text" @click="handleAllArticle">All Article</span>
        </div>
        <div class="article__box mt-3 pa-3">
          <div v-for="(item, i) in itemsArticle" :key="i" class="mb-3">
            <CardArticle
              :image="item.image"
              :title="item.title"
              :link="item.link"
              size="small"
              subtitle=" "
              action="Waiting for Review"
            />
          </div>
        </div>
      </div>

      <div class="ml-6">
        <div class="d-flex justify-space-between align-end">
          <span>Top 10 Persada News</span>
          <span class="article__action silver--text" @click="handleAllArticle">All Article</span>
        </div>
        <div class="article__box mt-3 pa-3">
          <div v-for="(item, i) in itemsArticle" :key="i" class="mb-3">
            <CardArticle
              :image="item.image"
              :title="item.title"
              :link="item.link"
              size="small"
              subtitle="20/03/2020"
              noAction
            />
          </div>
        </div>
      </div>

      <div class="ml-6">
        <span>Tags Trending</span>
        <div class="article__box mt-3 pa-3">
          <div v-for="(item, i) in itemsTag" :key="i" class="mb-3">
            <CardTag :title="item.title" :total="item.total" noAction />
          </div>
        </div>
      </div>

      <div class="ml-6">
        <span>Words Trending</span>
        <div class="article__box mt-3 pa-3">
          <div v-for="(item, i) in itemsWord" :key="i" class="mb-3">
            <CardTag :title="item.title" :total="item.total" noAction />
          </div>
        </div>
      </div>
    </div>

    <div class="mt-12">
      <p>Trending Now</p>
      <div class="d-flex flex-wrap">
        <div v-for="(item, i) in itemsTrending" :key="i" class="mr-6 mb-6">
          <Card-Trending
            :title="item.title"
            :description="item.description"
            :image="item.image"
            :link="item.link"
          ></Card-Trending>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderContent from "@/containers/HeaderContent";
import CardTotalArticle from "@/components/material/Card/CardTotalArticle";
import CardArticle from "@/components/material/Card/CardArticle";
import CardTrending from "@/components/material/Card/CardTrending";
import CardTag from "@/components/material/Card/CardTag";

export default {
  components: {
    HeaderContent,
    CardTotalArticle,
    CardArticle,
    CardTrending,
    CardTag
  },
  data() {
    return {
      list: [
        {
          text: "Artikel"
        }
      ],
      publisher: {
        title: "Your Publisher",
        text: "Anindy Septiani",
        icon: "account",
        description: "Publisher yang akan mereviews berita"
      },
      items: [
        {
          title: "Waiting for Review",
          total: 120,
          icon: "home",
          description: "Artikel yang masih direviews oleh Publisher",
          link: "reported"
        },
        {
          title: "Approved Article",
          total: 50,
          icon: "account",
          description: "Artikel yang sudah disetujui oleh Publisher",
          link: "donation"
        }
      ],
      itemsArticle: [
        {
          image: "https://dummyimage.com/100x100/ddd/000",
          title:
            "Ini Pernyataan Pertama Bek Juventus Setelah Divonis Positif Virus Corona",
          link: "reported"
        },
        {
          image: "https://dummyimage.com/100x100/ddd/000",
          title:
            "Ini Pernyataan Pertama Bek Juventus Setelah Divonis Positif Virus Corona",
          link: "reported"
        },
        {
          image: "https://dummyimage.com/100x100/ddd/000",
          title:
            "Ini Pernyataan Pertama Bek Juventus Setelah Divonis Positif Virus Corona",
          link: "reported"
        },
        {
          image: "https://dummyimage.com/100x100/ddd/000",
          title:
            "Ini Pernyataan Pertama Bek Juventus Setelah Divonis Positif Virus Corona",
          link: "reported"
        },
        {
          image: "https://dummyimage.com/100x100/ddd/000",
          title:
            "Ini Pernyataan Pertama Bek Juventus Setelah Divonis Positif Virus Corona",
          link: "reported"
        },
        {
          image: "https://dummyimage.com/100x100/000/fff",
          title:
            "Ini Pernyataan Pertama Bek Juventus Setelah Divonis Positif Virus Corona",
          link: "reported"
        }
      ],
      itemsTrending: [
        {
          title:
            "Bahagia Terawan Teori Terbukti: Corona, Penyakit yang Akan Sembuh Sendiri",
          description:
            "Kebahagiaan itu disampaikan Terawan kala konferensi bersama Juru Bicara Pemerintah untuk Urusan Virus Corona, Achmad Yurianto di RSUP Persahabatan, Jakarta Timur, Kamis (12/3/2020).",
          image: "https://dummyimage.com/300x300/000/fff",
          link: "donation"
        },
        {
          title:
            "Bahagia Terawan Teori Terbukti: Corona, Penyakit yang Akan Sembuh Sendiri",
          description:
            "Kebahagiaan itu disampaikan Terawan kala konferensi bersama Juru Bicara Pemerintah untuk Urusan Virus Corona, Achmad Yurianto di RSUP Persahabatan, Jakarta Timur, Kamis (12/3/2020).",
          image: "https://dummyimage.com/300x300/bbb/fff",
          link: "donation"
        },
        {
          title:
            "Bahagia Terawan Teori Terbukti: Corona, Penyakit yang Akan Sembuh Sendiri",
          description:
            "Kebahagiaan itu disampaikan Terawan kala konferensi bersama Juru Bicara Pemerintah untuk Urusan Virus Corona, Achmad Yurianto di RSUP Persahabatan, Jakarta Timur, Kamis (12/3/2020).",
          image: "https://dummyimage.com/300x300/ddd/000",
          link: "donation"
        },
        {
          title:
            "Bahagia Terawan Teori Terbukti: Corona, Penyakit yang Akan Sembuh Sendiri",
          description:
            "Kebahagiaan itu disampaikan Terawan kala konferensi bersama Juru Bicara Pemerintah untuk Urusan Virus Corona, Achmad Yurianto di RSUP Persahabatan, Jakarta Timur, Kamis (12/3/2020).",
          image: "https://dummyimage.com/300x300/eee/000",
          link: "donation"
        }
      ],
      itemsTag: [
        {
          title: "#diamdirumah",
          total: 120
        },
        {
          title: "#staysafe",
          total: 50
        }
      ],
      itemsWord: [
        {
          title: "diamdirumah",
          total: 120
        },
        {
          title: "staysafe",
          total: 50
        }
      ]
    };
  },
  methods: {
    handleAllArticle() {
      console.log("all article");
    }
  }
};
</script>

<style lang="sass" scoped>
.article
  &__box
    max-height: 500px
    max-width: 300px
    border: 1px solid #eeeeee
    border-radius: 8px
    overflow: auto
  &__action
    font-size: $font-size-12
    cursor: pointer
</style>
