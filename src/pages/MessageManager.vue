<template>
  <div style="padding:15px">
    <div class="row">
      <div style="height:30px;width:90px;background-color:red" @click="getMyMessages()">

      </div>
    </div>
    <div class="row" v-if="showResult">
      <div class="col-md-4">
        <div class="row row-eq-height user-list" >
          <div class="col-12" v-for="message in _messageList" :key="message.Id">
            <!--<p class="category">{{ message.ObjectMessage }} </p>-->
            <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
              <stats-card data-background-color="yellow">
                <template slot="header">
                  <picture-box  :picType="0"></picture-box>
                </template>
                <template slot="content">
                  <h3 class="title">{{ message.ObjectMessage }} </h3>
                  <p class="category">{{ message.BodyMessage }} </p>

                </template>
                <template slot="footer">
                  <div class="stats">
                    <md-icon>place</md-icon>
                    {{ message.SendDate }}
                  </div>
                </template>
              </stats-card>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8 d-none d-sm-block">
      </div>
    </div>

    <!--<div class="row" v-if="showResult">
      <div class="col-md-4">
        <div class="col-12" v-for="message in _messageList" :key="message.Id">
          {{message.ObjectMessage}}
        </div>
      </div>
    </div>-->
  </div>
</template>

<script>
import vueSlider from 'vue-slider-component'
import MapAutocomplete from '@/components/GoogleMaps/MapAutocomplete'
import PictureBox from '@/components/PictureBox/PictureBox'
  import {
    StatsCard
  } from '@/components'

//import axios from 'axios'
import {
  serverBus
} from '@/main';

export default {
    name: 'MessageManager',
  data() {
    return {
      showResult : false,
      _messageList : []
    }
  },
  components: {
    vueSlider,
    MapAutocomplete,
    PictureBox,
    StatsCard
  },
  //computed: {
  //  messageList : {
  //    get() {
  //      return this._messageList != null ? this._messageList : null;
  //    },
  //    set(value) {
  //      this._messageList = value;
  //      //alert(JSON.stringify(this._messageList))

  //    }
  //  }
  //},
    mounted() {
      serverBus.$on('newMessage', (messageList) => {
        //alert('newMessage')
        this.getMyMessages();
      });
      this.getMyMessages();
  },
  methods: {
    sendMessage: function () {
      var self = this;
      if ((this.actualPos != null) && (this.amount != null)) {
        serverBus.$emit('showLoading', true);
        this.$store.dispatch('sendMessage', {
          bodyMessage: "Body Message",
          objectMessage:"Object Message",
          senderBaseUserId: this.$store.state.authentication.user.Id,
          receiverBaseUserId: this.$store.state.authentication.user.Id,
          })
          .then(res => {
            alert('Message Correctly Sent')
            serverBus.$emit('showLoading', false);
          })
          .catch(error => {
            serverBus.$emit('showError', 'Si è verificato un errore');
            serverBus.$emit('showLoading', false);
          })
      }
    },
    getMyMessages: function () {
      var self = this;
      //serverBus.$emit('showLoading', true);
      this.$store.dispatch('getMyMessages', {
        baseUserId: this.$store.state.authentication.user.Id,
        top: 100
      })
      .then(res => {
        self.showResult = false;
        self._messageList = res.data;
        //serverBus.$emit('showLoading', false);
        self.showResult = true;
      })
      .catch(error => {
        serverBus.$emit('showError', 'Si è verificato un errore '+JSON.stringify(error));
        serverBus.$emit('showLoading', false);
      })
    },
  },
  created() {

  }

}
</script>

<style scoped lang="scss">
  .md-card {
    cursor: pointer;
    .md-card-header

  {
    background-color: #FFF;
    img

  {
    margin-right: 0;
    border-radius: initial;
  }

  }

  .md-card-content {
    h3

  {
    color: #3c4653;
  }

  }
  }

  .img-thumbnail {
    max-width: 100%;
    min-width: 100%;
  }

  .user-list {
    max-height: 550px;
    overflow: auto;
  }

  #map {
    max-height: 550px;
  }

  .search-form {
    border-radius: 2px;
    box-sizing: border-box;
    min-width: auto;
    padding: 10px 32px 48px;
    position: relative;
    z-index: initial;
    margin: 0 -15px;
    border: 1px solid darken(#f5ff00, 10%);
    border-radius: 15px;
  }

  .gws-flights-form__search-button-wrapper {
    align-items: center;
    bottom: calc(-40px/2);
    display: flex;
    flex-direction: column;
    left: 0;
    margin: 0 auto;
    pointer-events: none;
    position: absolute;
    right: 0;
    .gws-flights-fab__mini

  {
    border-radius: 20px;
    height: 40px;
    min-width: 40px;
  }

  .gws-flights-form__search-button {
    background-color: #f5ff00;
    pointer-events: auto;
    align-items: center;
    border: none;
    border-radius: 28px;
    box-shadow: 0 3px 5px -1px rgba(0,0,0,0.2), 0 6px 10px 0 rgba(0,0,0,0.14), 0 1px 18px 0 rgba(0,0,0,0.12);
    box-sizing: border-box;
    color: #212121;
    cursor: pointer;
    display: flex;
    height: 56px;
    min-width: 56px;
    outline: none;
    padding: 0 8px;
    position: relative;
    user-select: none;
    &::before

  {
    border-radius: inherit;
    content: '';
    display: block;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }

  &:hover {
    box-shadow: 0 5px 5px -3px rgba(0,0,0,0.2), 0 8px 10px 1px rgba(0,0,0,0.14), 0 3px 14px 2px rgba(0,0,0,0.12);
    outline: none;
  }

  span {
    padding: 0 16px 0 8px;
    font-size: 14px;
    font-weight: 500;
    padding: 0 26px 0 24px;
    text-transform: uppercase;
    -webkit-user-select: none;
  }

  }
  }

  .button_plus {
    float: left;
    background-color: #f1ff00;
    border: none;
    color: #212121;
    /*padding: 15px 32px;*/
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 26px;
    width: 30px;
    height: 30px;
  }

  .btn {
    background-color: #3498db;
    border: none;
    color: white;
    padding: 12px 16px;
    font-size: 16px;
    cursor: pointer;
  }

    .btn:hover {
      background-color: RoyalBlue;
      color: #FFF;
    }

  .md-theme-default a:not(.md-button):hover {
    color: #FFF !important;
  }

  @media only screen and (min-width: 767px) {
    .search-form {
      min-width: 852px;
      margin: 0 76px;
      div

  {
    margin-top: 0;
  }

  }
  }
</style>
