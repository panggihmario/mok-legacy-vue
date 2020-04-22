<template>
  <div>
    <v-row align="center">
      <v-col md="7">
        <custom-input
          label="Headline"
          v-model="payloadNews.headline"
          :value="payloadNews.headline"
          rules="required"
          name="Headline"
        />
      </v-col>
			
      <v-dialog v-model="dialog" max-width="300">
        <v-img :src="image" />
      </v-dialog>
      <v-col md="5">
        <custom-button @click.stop="dialog = true" v-if="image || propsImage "
          >Lihat Gambar</custom-button
        >
        <custom-upload
          class="mb-1 ml-4"
          id="upload-editor"
          @response="getImage"
          v-else
        />
      </v-col>
    </v-row>
    <v-row :style="{ marginTop: '-20px' }">
      <v-col cols="7">
        <custom-input
          label="Judul"
          v-model="payloadNews.title"
          :value="payloadNews.title"
          rules="required"
          name="Title"
        />
        <text-editor
          v-model="payloadNews.content"
          :value="payloadNews.content"
          rules="required"
          name="Content"
        />
        <custom-textarea
          label="Tag Artikel"
          placeholder="Tag"
          :disabled="true"
        />
      </v-col>
      <v-col cols="5">
        <div class="ml-4">
          <custom-input
            :disabled="true"
            label="Kategori Artikel"
            placeholder="Kategori"
          />
          <icon-input
            label="Sumber Artikel Utama"
            v-model="payloadNews.linkReference"
            :value="payloadNews.linkReference"
            rules="required"
            name="Link Refrence"
          />
          <icon-input :disabled="true" label="Artikel Terkait 1" />
          <icon-input :disabled="true" label="Artiket Terkait 2" />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
	props : {
		payloadNews : {
			type : Object
		},
		propsImage : {
			type : String
		},
		loadingDraft : {
			type : Boolean
		}
	},
	computed :{
		status () {
			if(this.payloadNews.media.length > 1) {
				return true
			}else{
				return false
			}
		}
	},
	data () {
		return {
			dialog : false,
			image : this.propsImage
		}
	},
	methods : {
		getImage(payload) {
      if (payload.status === "success") {
        this.image = payload.response.thumbnail;
        this.payloadNews.media.push(payload.response);
      }
    }
	},
	watch : {
		propsImage () {
				console.log("cek")
				this.image = this.propsImage
		}
	}
}
</script>