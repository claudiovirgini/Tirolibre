<template>
<div>
  <!--<button v-if="true" @click="test()">test</button>-->
  <div v-if="editMode != true">

    <img :src="fullPath" style="max-width:165px;height:auto;" class="img-thumbnail" v-bind:class="{ 'imgDefaultPlayer': isDefaultPlayer,'imgDefaultTeam':isDefaulTeam,'imgDefaultAgent':isDefaultAgent,'imgDefaultCardPlayer':isDefaulCardPlayer  }" @error="imageLoadError"
    />
    <!--<md-button @click="clickUpload()" v-if="isEditable=='true'" class="md-success btn btn-success btn-lg btn-block btn-radius">
      CHANGE
      <i class="md-icon md-icon-font material-icons md-theme-default">arrow_forward_ios</i>
    </md-button>-->
    <md-button @click="editMode=true;" v-if="isEditable=='true'" class="md-success btn btn-success btn-lg btn-block btn-radius">
      Cambia Foto Profilo <br />
      <span class="text-muted">(mentre sei in azione di gioco)</span>
      <i class="md-icon md-icon-font material-icons md-theme-default">arrow_forward_ios</i>
    </md-button>
    <input type="file" id="uploads" style="visibility:hidden; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 1)">
  </div>
  <div v-if="editMode == true">
    <!--<vue-cropper ref="cropper" :img="option.img" :auto-crop="option.autoCrop" :size="option.size" :full="option.full" :info="option.info" :can-scale="option.canScale" :can-move="option.canMove" :can-move-box="option.canMoveBox" :original="option.original"
    :fixed-number="option.fixedNumber" :fixed-box="option.fixedBox" :fixed="option.fixed" :center-box="option.centerBox" :auto-crop-width="option.autoCropWidth" :auto-crop-heigth="option.autoCropHeigth" @img-load="imgLoad">
  </vue-cropper>-->
    <!--<img :src="imgDataUrl">-->
    <div class="row">
      <div class="col-md-2" style="padding-top:20%">
        <md-button class="md-icon-button md-dense md-raised md-primary" @click="croppa.zoomOut()" v-if="fileIsSelected">
          <md-icon>remove</md-icon>
        </md-button>
      </div>
      <div class="col-md-8">
        <croppa v-model="croppa" :width="250" :height="300" placeholder="Clicca qui" placeholder-color="#000" :placeholder-font-size="12" canvas-color="transparent" :show-remove-button="true" remove-button-color="black" :remove-button-size="30" :show-loading="true"
          :zoom-speed="20" initial-size="contain" @file-choose="handleCroppaFileChoose" @file-size-exceed="handleCroppaFileSizeExceed" @file-type-mismatch="handleCroppaFileTypeMismatch" @image-remove="handleImageRemove" :loading-size="50">
        </croppa>
      </div>
      <div class="col-md-2" style="padding-top:20%">
        <md-button class="md-icon-button md-dense md-raised md-primary" @click="croppa.zoomIn()" v-if="fileIsSelected">
          <md-icon>add</md-icon>
        </md-button>
      </div>
      <div class="col-md-12">
        <md-button class="md-icon-button md-dense md-raised md-primary" @click="cropImage()" style="width:80px" v-if="fileIsSelected">
          <md-icon>check_circle_outline</md-icon>OK
        </md-button>
        <md-button class="md-icon-button md-dense md-raised md-primary" @click="annullaCrop()" style="width:95px;margin-left:20px;">
          <md-icon>settings_backup_restore</md-icon>Annulla
        </md-button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import 'vue-croppa/dist/vue-croppa.css'
import VueCropper from 'vue-cropper'

export default {
  name: 'PictureBox',
  model: {
    prop: 'picUrl',
    event: 'change'
  },
  props: {
    picType: Number,
    picUrl: String,
    isEditable: String
  },
  data() {
    return {
      croppa: {},
      internalPicUrl: null,
      fileIsSelected: false,
      editMode: false,
      isDefaultAgent: false,
      isDefaultPlayer: false,
      isDefaulCardPlayer: false,
      isDefaulTeam: false,
      rootUrl: null
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
        this.$emit('changeSource', this.internalPicUrl)
      }
    }
  },
  created: function() {
    this.internalPicUrl = this.picUrl;
    this.rootUrl = this.$store.state.configurations.imageRootUrl;
  },
  methods: {
    annullaCrop() {
      this.fileIsSelected = false;
      this.editMode = false;
    },
    imageLoadError() {
      this.isDefaultPlayer = true;
    },
    handleImageRemove() {
      //alert('file handleImageRemove')
      this.fileIsSelected = false;
    },
    handleCroppaFileTypeMismatch() {
      // alert('file handleCroppaFileTypeMismatch')
    },
    handleCroppaFileSizeExceed() {
      // alert('file handleCroppaFileSizeExceed')
    },
    handleCroppaFileChoose() {
      //alert('file choosed')
      this.fileIsSelected = true;
    },
    cropImage() {
      var image64 = this.croppa.generateDataUrl('image/png', 0.8);
      this.rootUrl = '';
      this.fullPath = image64;
      this.editMode = false;
      this.isDefaultPlayer = false;
    },
    test: function() {
      // alert('test')
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
    }
  }
}
</script>
<style scoped>
.card.vue-avatar-cropper-demo.text-center {
  max-width: 900px;
  margin-left: 0 auto;
}

.croppa-container {
  background-color: white;
  border: 2px solid grey;
  border-radius: 8px;
}

.croppa-container:hover {
  opacity: 1;
  background-color: yellow;
}

.img-thumbnail {
  /* max-width: 50%; */
  max-width: 100%;
  /* min-width: 100%; */
}

.imgDefaultPlayer {
  content: url("../../assets/img/defaultFace.png");
  content: url("../../assets/img/defaultFace.jpg");
}

.imgDefaultCardPlayer {
  content: url("../../assets/img/defaultCard.jpg");
}

.imgDefaultTeam {
  content: url("../../assets/img/vue-logo.png");
}

.imgDefaultAgent {
  content: url("../../assets/img/defaultFace.png");
  content: url("../../assets/img/defaultFace.jpg");
}

.btn span {
  font-size: 12px;
  text-transform: none;
}
</style>
