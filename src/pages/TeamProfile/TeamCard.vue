<template>
<div>
  <md-card class="md-card-profile">
    <div class="md-card-avatar">
      <picture-box :picUrl="imagefile" :picType="1"></picture-box>
      <!--<img class="img" :src="imagefile">-->
    </div>
    <md-card-content>
      <h4 class="card-title">{{name}}</h4>
      <h6 class="category text-gray">{{category}}</h6>
    </md-card-content>

  </md-card>
</div>
</template>
<script>
import PictureBox from '@/components/PictureBox/PictureBox'
export default {
    name: 'TeamCard',
  components: {
    PictureBox
  },
  props: {
    teamdata: {
      type: Object
    },
    category: {
      type: String
    }
  },
  computed: {
    name: {
      get() {
        return this.teamdata != null ? this.teamdata.Name : '';
      }
    },
    imagefile: {
      get() {
        return this.teamdata != null ? this.teamdata.FileLogo : null;
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
