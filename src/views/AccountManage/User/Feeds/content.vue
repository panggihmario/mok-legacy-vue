<template>
  <div>
    <div :class="content.label">Diposting Pada</div>
    <div :class="content.box">
      <div :class="content.label"> {{date}} </div>
    </div>
    <div class="mt-4" />
    <div :class="content.label">Channel</div>
    <div :class="content.box">
      <div :class="content.label">{{data.post.channel.name}}</div>
    </div>

    <v-btn 
      :loading="loading"
      @click="deletePost(data.id)" 
      class="mt-4" elevation="0"  color="primary">
      <div :class="content['label-button']" >Hapus Post</div>
    </v-btn>

    <div :class="content.description">
      <div class="d-flex align-center">
        <div class="d-flex mr-4 align-center">
          <v-icon small>far fa-heart</v-icon>
          <div :class="content.count"> {{data.likes}} </div>
        </div>
        <div class="d-flex align-center">
          <v-icon small>far fa-comment</v-icon>
          <div :class="content.count"> {{data.comments}} </div>
        </div>
      </div>
      <div class="mt-2">
        <div :class="content.description" v-html="data.post.description" ></div>
      </div>
    </div>
    
  </div>
</template>

<script>
import moment from "moment"
export default {
  props : ['data'],
  data () {
    return {
      loading : false
    }
  },
  computed : {
    date () {
      const d = moment(this.data.createAt).format('DD/MM/YYYY  HH:mm')
      return d
    }
  },
  methods : {
    deletePost (id) {
      this.loading = true
      setTimeout(() => {
        this.$emit('deletePost' , id)
        this.loading = false
      }, 1500)
      
    }
  }
}
</script>

<style lang="scss" module="content">
.label{
  color: #777777;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.01em;
}
.box {
  background: #FAFAFA;
  border-radius: 8px;
  width: 292px;
  height: 40px;
  margin-top: 6px;
  display: flex;
  align-items: center;
  padding-left: 12px;
}
.label-button{
  font-size: 10px;
  color:  #FFFFFF ;
  letter-spacing: 0.01em;
  font-weight: bold;
  text-transform: capitalize;
}
.description {
  margin-top: 30px;
  padding: 10px 10px 4px 10px;
}
.count {
  color: #000000;
  font-weight: 500;
  font-size: 12px;
  margin-left: 7px;
}
.description {
  font-size: 12px;
  color: #000000;
}
</style>