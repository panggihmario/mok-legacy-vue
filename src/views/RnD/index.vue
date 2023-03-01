<template>
  <div class="container">
    <h1>RND</h1>
    <input @change="uploadToTencent" type="file"/>
  </div>
</template>

<script>
import moment from "moment"
import { cos } from "@/plugins/httpRequest"
export default {
  data() {
    return {
      username: ''
    }
  },
  methods: {
    uploadToTencent(e) {
      const file = e.target.files[0];
      const currentDateEpoch = moment(new Date).valueOf()
      const fileType = file.type.split("/")[1]
      const filePath = `tmp/source/${currentDateEpoch}.${fileType}`
      cos.uploadFile({
        Bucket: process.env.VUE_APP_TENCENT_BUCKET, /* Required */
        Region: process.env.VUE_APP_TENCENT_REGION, /* Required */
        Key: filePath, /* Required */
        Body: file, // Uploading file object
        onProgress: function (progressData) {
          console.log(JSON.stringify(progressData));
        }
      }, function (err, data) {
        console.log(err || JSON.stringify(data));
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 50%;
}
</style>