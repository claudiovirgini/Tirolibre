<template>
<img :src="picUrl" class="img-thumbnail" v-bind:class="{ 'imgDefaultPlayer': isDefaultPlayer,'imgDefaultTeam':isDefaulTeam,'imgDefaultCardPlayer':isDefaulCardPlayer  }" @error="imageLoadError" />
</template>

<script>
export default {
  name: 'PictureBox',
  props: {
    picType: {
      type: Number //0:player;1:team;2:Agent
    },
    picUrl: {
      type: String
    },
  },
  data() {
    return {
      isDefaultPlayer: false,
      isDefaulCardPlayer: false,
      isDefaulTeam: false,
    }

  },
  computed: {
    fullPath: {
      get() {
        return null;
      }
    }
  },
  methods: {
    imageLoadError: function() {
      this.isDefaultPlayer = false;
      this.isDefaulTeam = false;
      if (this.picType === 0) //calciatore
        this.isDefaultPlayer = true;
      if (this.picType === 100) //calciatore card
        this.isDefaulCardPlayer = true;
      if (this.picType === 1) //team
        this.isDefaulTeam = true;
    }
  },
  mounted() {
    //this.isDefaultPlayer = true;
    //alert(require('~src/assets/img/faces/marc.jpg'))
    //if (this.$store.state.authentication.user == null)
    //  this.$router.go('/')
    //else
    //serverBus.$emit('showLoading', true);
    //this.$store.dispatch('getPlayerProfile', this.$store.state.authentication.user.Id).then(res => {
    //  this.playerdata = res.data;
    //  this.profileLoaded = true;
    //  serverBus.$emit('showLoading', false);

    //}).catch(error => { alert('Si è verificato un errore'); serverBus.$emit('showLoading', false) });
  }
}
</script>
<style>
.img-thumbnail {
  max-width: 50%;
}

.imgDefaultPlayer {
  content: url("../../assets/img/defaultFace.jpg");
}

.imgDefaultCardPlayer {
  content: url("../../assets/img/defaultCard.jpg");
}

.imgDefaultTeam {
  content: url("../../assets/img/vue-logo.png");
}
</style>
