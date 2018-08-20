<template>
<div>
  <md-card class="md-card-profile">
    <div class="md-card-avatar">
      <picture-box :picUrl="imagefile" :picType="profile"></picture-box>
    </div>
    <md-card-content>
      <h4 class="card-title">{{name}}</h4>
      <h6 class="category text-gray">Calciatore</h6>
      <hr>
      <div class="text-center">
        <div class="row">
          <div class="col-lg-6">
            <h5>
              Ruolo
              <br><small>{{roleSelected}}</small>
            </h5>
          </div>
          <div class="col-lg-6">
            <h5>
              Classe
              <br><small>{{yearClass}}</small>
            </h5>
          </div>
        </div>
      </div>
    </md-card-content>
    <youtube :video-id="videoId"></youtube>
    <!--<iframe width="560" height="315" :src="videoUrl" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>-->
  </md-card>
</div>
</template>

<script>
  import Vue from 'vue'
  import PictureBox from '@/components/PictureBox/PictureBox'
  import VueYouTubeEmbed from 'vue-youtube-embed'
  import { getIdFromURL, getTimeFromURL } from 'vue-youtube-embed'
  Vue.use(VueYouTubeEmbed)

  export default {
    name: 'userCard',
    //props: {
    //  cardUserImage: {
    //    type: String,
    //    default: require('@/assets/img/faces/marc.jpg')
    //  }
    //},
    props: {
      playerdata: {
        type: Object
      }
    },
    components: {
      PictureBox
    },
    computed: {
      videoId: {
        get() {
          return this.playerdata != null && this.playerdata.Videos != null && this.playerdata.Videos.length > 0 ?
            getIdFromURL(this.playerdata.Videos[0].VideoUrl) :
            '';
          //'https://www.youtube.com/embed/RYd8EUYfJWw';

        }
      },
      videoUrl: {
        get() {
          return this.playerdata != null && this.playerdata.Videos != null && this.playerdata.Videos.length > 0 ?
            this.playerdata.Videos[0].VideoUrl :
            '';
          //'https://www.youtube.com/embed/RYd8EUYfJWw';

        }
      },
      profile: {
        get() {
          return (this.playerdata != null) ? this.playerdata.Profile : 0;
        }
      },
      imagefile: {
        get() {
          return this.playerdata != null && this.playerdata.FilePlayerImage != null ?
            this.$store.state.configurations.imageRootUrl + this.playerdata.FilePlayerImage :
            '@/assets/img/faces/marc.jpg';
        }
      },
      name: {
        get() {
          return (this.playerdata != null) ? this.playerdata.Name : '';
        },
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
      },
      roleSelected: {
        get() {
          if ((this.playerdata != null) && (this.playerdata.Roles != null) && (this.playerdata.Roles.length > 0))
            return this.playerdata.Roles[0].RoleName
          else return 'not available';
        }
      }
    },
  }
</script>

<style>
iframe {
  height: 300px !important;
}
</style>
