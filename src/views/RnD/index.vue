<template>
  <div class="container">
    <h1>RND</h1>
    <input @change="uploadToTencent" type="file"/>
  </div>
</template>

<script>
import moment from "moment"
var COS = require('cos-js-sdk-v5');
var cos = new COS({
  SecretId: 'IKIDQHcu1ymNmzzpRrEOJ0ShssumS5XqvtjS', // User `SecretId`. We recommend you obtain it from the environment variable. In addition, we recommended you use a sub-account key and follow the principle of least privilege to reduce risks. For information about how to obtain a sub-account key, visit https://www.tencentcloud.com/document/product/598/37140?from_cn_redirect=1.
  SecretKey: 'ZyDG9F8sQjspZ9WhhcLl26IJLEuc9Ve4', // User `SecretKey`. We recommend you obtain it from the environment variable. In addition, we recommend you use a sub-account key and follow the principle of least privilege to reduce risks. For information about how to obtain a sub-account key, visit https://www.tencentcloud.com/document/product/598/37140?from_cn_redirect=1.
  Domain : 'https://koanba-prod-1316940742.cos.ap-singapore.myqcloud.com'
});
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
        Bucket: 'kk-1316940742', /* Required */
        Region: 'ap-jakarta', /* Required */
        Key: filePath, /* Required */
        Body: file, // Uploading file object
        onProgress: function (progressData) {
          console.log(JSON.stringify(progressData));
        }
      }, function (err, data) {
        console.log(err || data);
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