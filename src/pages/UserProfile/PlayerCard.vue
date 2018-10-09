<template>
<div>
  <md-card class="md-card-profile">
    <!--<picture-box :picUrl="imagefile" :picType="profile" ></picture-box>-->
    <!--<img class="img" :src="imagefile">-->
    <!-- <div class="md-card-avatar">
      <picture-box :picUrl="imagefile" :picType="profile"></picture-box>
    </div> -->
    <div class="card vue-avatar-cropper-demo text-center">
      <div class="card-body">
        <picture-box :picUrl="imagefile" :picType="profile" class="card-img avatar"></picture-box>
        <!-- <img :src="user.avatar" class="card-img avatar" /> -->
        <div class="card-img-overlay">
          <button class="btn btn-primary btn-sm" id="pick-avatar">Seleziona una nuova immagine</button>
        </div>
        <!-- <h5 class="card-title mb-0">{{ name}}</h5> -->
      </div>
      <div class="card-footer text-muted" v-html="message"></div>
      <avatar-cropper @uploading="handleUploading"
                      @uploaded="handleUploaded"
                      @completed="handleCompleted"
                      @error="handlerError"
                      trigger="#pick-avatar"
                      :labels="{submit: 'OK', cancel: 'Cancel'}"
                      upload-url="http://tirolibrecdn.tirolibre.it/" />
    </div>
    <md-card-content>
      <h4 class="card-title">{{name}}</h4>
      <h6 class="category text-gray">Profile</h6>
      <hr>
      <div class="text-center">
        <div class="row">
          <div class="col-lg-6">
            <h5>
                Ruolo
                <br><small>{{ role }}</small>
              </h5>
          </div>
          <div class="col-lg-6">
            <h5>
                Classe
                <br><small>{{ yearClass }}</small>
              </h5>
          </div>
        </div>
      </div>
    </md-card-content>

  </md-card>
</div>
</template>
<script>
import PictureBox from '@/components/PictureBox/PictureBox'
import AvatarCropper from "vue-avatar-cropper";
export default {
  name: 'PlayerCard',
  components: {
    PictureBox,
    AvatarCropper
  },
  props: {
    playerdata: {
      type: Object
    }
  },
  //mounted() {
  //  alert('mike : '+this.test)
  //},
  data() {
    return {
      header: { 'Content-Type': 'application/octet-stream'},
      imageBaseUrl: this.$store.state.configurations.imageRootUrl,
      message: "ready",
      user: {
        id: 1
      }
    }
  },
  computed: {
    profile: {
      get() {
        return (this.playerdata != null) ? this.playerdata.Profile : -1;
      }
    },
    name: {
      get() {
        return this.playerdata != null ? this.playerdata.Name : '';
      }
    },

    imagefile: {
      get() {
        var returned = this.playerdata != null ? this.playerdata.FilePlayerImage : null;
        // alert(returned);
        //return returned;
      }
    },
    role: {
      get() {
        return this.playerdata != null && this.playerdata.Roles != null && this.playerdata.Roles.length > 0 ? this.playerdata.Roles[0].RoleName : '';
      }
    },
    yearClass: {
      get() {
        var returned = 'not available'
        if (this.playerdata != null && this.playerdata.BornDate) {
          var temp = new Date(this.playerdata.BornDate);
          returned = temp.getFullYear()
        }
        return returned;
      }
    }
  },
  methods: {
    handleUploading(form, xhr) {
      this.message = "uploading...";
    },
    handleUploaded(response) {
      if (response.status == "success") {
        this.imagefile = response.url

        console.log("-->: " + this.imageBaseUrl)
        // Maybe you need call vuex action to
        // update user avatar, for example:
        alert(JSON.stringify(response))
        this.$store.$dispatch('updateUser', {
          avatar: response.url
          
        })
        this.message = "user avatar updated."
      }
    },
    handleCompleted(response, form, xhr) {
      this.message = "upload completed.";
      
    },
    handlerError(message, type, xhr) {
      this.message = "Oops! Something went wrong...";
    }
  }

}
</script>
<style>
iframe {
  height: inherit !important;
}

.card-title {
  color: #252422;
  font-weight: bold;
  text-transform: uppercase;
}

h5 {
  font-size: 1.25rem;
  color: #252422;
  font-weight: bold;
  line-height: 1.2;
  margin-bottom: .5rem;
}

small {
  color: #9a9a9a;
  font-weight: 300;
  line-height: 1.4em;
}

.vue-avatar-cropper-demo {
  max-width: 18em;
  margin: 0 auto;
}

.avatar {
  width: 160px;
  border-radius: 6px;
  display: block;
  margin: 20px auto;
}

.card-img-overlay {
  display: none;
  transition: all 0.5s;
}

.card-img-overlay button {
  margin-top: 20vh;
}

.card:hover .card-img-overlay {
  display: block;
}
</style>
