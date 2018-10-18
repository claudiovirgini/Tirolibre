<template>
   <div>
     <!--<button v-if="true" @click="test()">test</button>-->
     <div v-if="editMode != true">
       <img :src="fullPath" class="img-thumbnail" v-bind:class="{ 'imgDefaultPlayer': isDefaultPlayer,'imgDefaultTeam':isDefaulTeam,'imgDefaultAgent':isDefaultAgent,'imgDefaultCardPlayer':isDefaulCardPlayer  }" @error="imageLoadError" />
       <md-button @click="clickUpload()" v-if="isEditable=='true'" class="md-success btn btn-success btn-lg btn-block btn-radius">
         CHANGE
          <i class="md-icon md-icon-font material-icons md-theme-default">arrow_forward_ios</i> 
       </md-button>
       <input type="file" id="uploads" style="visibility:hidden; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 1)">
     </div>
     <div v-if="editMode == true" style="height:200px">
       <vue-cropper ref="cropper"
                    :img="option.img"
                    :auto-crop="option.autoCrop"
                    :size="option.size"
                    :full="option.full"
                    :info="option.info"
                    :can-scale="option.canScale"
                    :can-move="option.canMove"
                    :can-move-box="option.canMoveBox"
                    :original="option.original"
                    :fixed-number="option.fixedNumber"
                    :fixed-box="option.fixedBox"
                    :fixed="option.fixed"
                    :center-box="option.centerBox"
                    :auto-crop-width="option.autoCropWidth"
                    :auto-crop-heigth="option.autoCropHeigth"
                    @img-load="imgLoad">
       </vue-cropper>
       <div>
         <button @click="changeScale(3)" class="btn">+</button>ZOOM <button @click="changeScale(-3)" class="btn">-</button>
       </div>
       <div>
         <input type="button" value="OK" @click="finish('base64');editMode=false" />
       </div>
       <!--<div class="card-footer text-muted" v-html="message">

       </div>-->

     </div>
  </div>
</template>

<script>
  import VueCropper from 'vue-cropper'
import { fail } from 'assert';

export default {
    name: 'PictureBox',
    components: {
      VueCropper
    },
    model: {
      prop: 'picUrl',
      event: 'change'
    },
    props: {
      picType: Number,
      picUrl: String,
      isEditable : String
    },

  data() {
    return {
      internalPicUrl : null,
      editMode: false,
      //crap: false,
      isDefaultAgent: false,
      isDefaultPlayer: false,
      isDefaulCardPlayer: false,
      isDefaulTeam: false,
      rootUrl: null,
      option: {
        img: '',
        size: 1,
        full: true,
        outputType: 'png',
        info: false,
        canScale: true,
        canMoveBox: false,
        canMove: true,
        fixed: true,
        fixedBox: true,
        original: false,
        autoCrop: true,
        //autoCropWidth: 450,
        //autoCropHeight: 150,
        centerBox: false,
        fixedNumber: [3,4],
        high: true
      },
    }

  },
  computed: {
    fullPath: {
      get() {
        if ((this.internalPicUrl != null) && (this.internalPicUrl.startsWith("data:image"))) {
          return this.internalPicUrl;
        } else {
          this.isDefaultPlayer = this.internalPicUrl == null || this.internalPicUrl == '' ? true : false;
          return this.$store.state.configurations.imageRootUrl + this.internalPicUrl;
        }
      },
      set(value) {
        this.internalPicUrl = value;
        this.$emit('changeSource', this.internalPicUrl )
      }
    }
  },
    created: function () {
      this.internalPicUrl = this.picUrl;
      this.rootUrl = this.$store.state.configurations.imageRootUrl;
    },
    methods: {
      test: function () {
        alert('test')
        this.internalPicUrl = this.picUrl;
      },
      finish(type) {
        var self = this;
        this.$refs.cropper.getCropData((data) => {
          this.model = true
          this.modelSrc = data
          this.isDefaultPlayer = false
          this.option.img = data
          this.rootUrl = '';
          this.fullPath = data
          //this.$emit('changeSource', data)
        })
      },
      clickUpload: function () {
        $("#uploads").click()
      },
      imageLoadError: function () {

      },
      changeImg() {
        this.option.img = this.lists[~~(Math.random() * this.lists.length)].img
      },
      startCrop() {
        // start
        this.crap = true
        this.$refs.cropper.startCrop()
      },
      stopCrop() {
        //  stop
        this.crap = false
        this.$refs.cropper.stopCrop()
      },
      clearCrop() {
        // clear
        this.$refs.cropper.clearCrop()
      },
      refreshCrop() {
        // clear
        this.$refs.cropper.refresh()
      },
      changeScale(num) {
        num = num || 1
        this.$refs.cropper.changeScale(num)
      },
      rotateLeft() {
        this.$refs.cropper.rotateLeft()
      },
      rotateRight() {
        this.$refs.cropper.rotateRight()
      },

      realTime(data) {
        this.previews = data
        console.log(data)
      },

      finish2(type) {
        this.$refs.cropper2.getCropData((data) => {
          this.model = true
          this.modelSrc = data
        })
      },
      finish3(type) {
        this.$refs.cropper3.getCropData((data) => {
          this.model = true
          this.modelSrc = data
        })
      },
      down(type) {
        // event.preventDefault()
        var aLink = document.createElement('a')
        aLink.download = 'demo'
        if (type === 'blob') {
          this.$refs.cropper.getCropBlob((data) => {
            this.downImg = window.URL.createObjectURL(data)
            aLink.href = window.URL.createObjectURL(data)
            aLink.click()
          })
        } else {
          this.$refs.cropper.getCropData((data) => {
            this.downImg = data
            aLink.href = data
            aLink.click()
          })
        }
      },

      uploadImg(e, num) {
        this.editMode = true;
        // this.option.img
        var file = e.target.files[0]
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          alert('error .gif,jpeg,jpg,png,bmp')
          return false
        }
        var reader = new FileReader()
        reader.onload = (e) => {
          let data
          if (typeof e.target.result === 'object') {
            // 把Array Buffer转化为blob 如果是base64不需要
            data = window.URL.createObjectURL(new Blob([e.target.result]))
          } else {
            data = e.target.result
          }
          if (num === 1) {
            this.option.img = data
          } else if (num === 2) {
            this.example2.img = data
          }
        }
        // 转化为base64
        // reader.readAsDataURL(file)
        // 转化为blob
        reader.readAsArrayBuffer(file)
      },
      imgLoad(msg) {
        console.log(msg)
      }
    }

}
</script>
<style>
.img-thumbnail {
  max-width: 50%;
}

.imgDefaultPlayer {
  content: url("../../assets/img/defaultFace.png");
}

.imgDefaultCardPlayer {
  content: url("../../assets/img/defaultCard.jpg");
}

.imgDefaultTeam {
  content: url("../../assets/img/vue-logo.png");
}

.imgDefaultAgent {
  content: url("../../assets/img/defaultFace.png");
}
</style>
