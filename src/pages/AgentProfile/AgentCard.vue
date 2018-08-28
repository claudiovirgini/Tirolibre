<template>
<div>
  <md-card class="md-card-profile">
    <div class="md-card-avatar">
      <picture-box :picUrl="imagefile" :picType="profile" ></picture-box>
      <!--<img class="img" :src="imagefile">-->
    </div>
    <md-card-content>
      <h4 class="card-title">{{ name+' '+surname }}</h4>
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
  export default {
    name: 'AgentCard',
    components: {
      PictureBox
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
      imageBaseUrl: this.$store.state.configurations.imageRootUrl,
    }
  },
    computed: {
      profile: {
        get() {
          return  (this.playerdata != null) ? this.playerdata.Profile : -1;
        }
      },
    name: {
      get() {
        return this.playerdata != null ? this.playerdata.Name : '';
      }
    },
    surname: {
      get() {
        return this.playerdata != null ? this.playerdata.Surname : '';
      }
    },
    imagefile: {
      get() {
        return this.playerdata != null && this.playerdata.FilePlayerImage != null ?
          this.$store.state.configurations.imageRootUrl + this.playerdata.FilePlayerImage :
          '@/src/assets/img/faces/marc.jpg';
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
</style>
