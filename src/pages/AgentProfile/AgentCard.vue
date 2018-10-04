<template>
<div>
  <md-card class="md-card-profile">
    <div class="md-card-avatar">
      <picture-box :picUrl="imagefile" :picType="profile"></picture-box>
      <!--<img class="img" :src="imagefile">-->
    </div>
    <md-card-content>
      <h4 class="card-title">{{ name}}</h4>
      <h6 class="category text-gray">{{ profile }}</h6>
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
    agentdata: {
      type: Object
    }
  },
  data() {
    return {
      imageBaseUrl: this.$store.state.configurations.imageRootUrl,
    }
  },
  computed: {
    profile: {
      get() {
        return (this.agentdata != null) ? this.agentdata.Profile : -1;
      }
    },
    name: {
      get() {
        return this.agentdata != null ? this.agentdata.Name : '';
      }
    },
    //surname: {
    //  get() {
    //    return this.agentdata != null ? this.agentdata.Surname : '';
    //  }
    //},
    imagefile: {
      get() {
        return this.agentdata != null && this.agentdata.FileAgentImage != null ?
          this.$store.state.configurations.imageRootUrl + this.agentdata.FileAgentImage : '@/src/assets/img/faces/marc.jpg';
      }
    },
  }
}
</script>
<style>
iframe {
  height: inherit !important;
}

.md-card-avatar {
  width: 100px;
  height: 100px;
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
