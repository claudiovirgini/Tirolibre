<template>
<div style="padding:15px">
  <div class="row">
    <div style="height:30px;width:90px;background-color:red" @click="getMyMessages()">

    </div>
  </div>
  <div class="row" v-if="showResult">
    <div class="col-md-4">
      <div class="row row-eq-height user-list">
        <div class="col-12" v-for="sender in userSenderList" :key="sender.Id">
          <!--<p class="category">{{ message.ObjectMessage }} </p>-->
          <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100" @click="selectThread(sender.Sender.Id)">
            <stats-card data-background-color="yellow">
              <template slot="header">
                  <picture-box :picUrl="sender.Sender.UserImageUrl" :picType="0"></picture-box>
                </template>
              <template slot="content">
                  <h3 class="title">{{ sender.Sender.Name }} </h3>
                  <p class="category">{{ sender.NumMessages }} </p>

                </template>
              <template slot="footer">
                  <div class="stats">
                    <md-icon>place</md-icon>
                    {{ sender.LastTime }}
                  </div>
                </template>
            </stats-card>
          </div>
        </div>
      </div>
    </div>
    <!--<div style="background-color:yellow;width:300px;height:50px" v-if="showResultThread==true">
        {{threadMessageList}}
      </div>-->
    <div class="col-md-8" v-if="showResultThread==true">
      <div style="padding:20px;width:100%;background-color:white" v-for="message in threadMessageList" :key="message.Id">
        <div class="row">
          {{message.BodyMessage}}
        </div>
      </div>
    </div>
  </div>

  <!--<div class="row" v-if="showResult">
      <div class="col-md-4">
        <div class="col-12" v-for="message in _messageList" :key="message.Id">
          {{message.ObjectMessage}}
        </div>
      </div>
    </div>-->



  <div id="frame">
    <div id="sidepanel">
      <div id="profile">
        <div class="wrap">
          <img id="profile-img" src="http://emilcarlsson.se/assets/mikeross.png" class="online" alt="" />
          <p>Mike Ross</p>
        </div>
      </div>
      <!-- <div id="search">
        <label for=""><i class="fa fa-search" aria-hidden="true"></i></label>
        <input type="text" placeholder="Search contacts..." />
      </div> -->
      <div id="contacts">
        <ul v-for="sender in userSenderList" :key="sender.Id">
          <li class="contact active" @click="selectThread(sender.Sender.Id)">
            <div class="wrap">
              <span class="contact-status online"></span>
              <!-- <span class="contact-status away"></span>
                <span class="contact-status busy"></span> -->
              <picture-box :picUrl="sender.Sender.UserImageUrl" :picType="0"></picture-box>
              <div class="meta">
                <p class="name">{{ sender.Sender.Name }} </p>
                <p class="preview">Numero Messaggi: {{ sender.NumMessages }} </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- <div id="bottom-bar">
        <button id="addcontact"><i class="fa fa-user-plus fa-fw" aria-hidden="true"></i> <span>Add contact</span></button>
        <button id="settings"><i class="fa fa-cog fa-fw" aria-hidden="true"></i> <span>Settings</span></button>
      </div> -->
    </div>
    <div class="content">
      <div class="contact-profile">
        <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
        <p>Harvey Specter</p>
      </div>
      <div class="messages">
        <ul>
          <li class="sent">
            <img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
            <p>How the hell am I supposed to get a jury to believe you when I am not even sure that I do?!</p>
          </li>
          <li class="replies">
            <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
            <p>When you're backed against the wall, break the god damn thing down.</p>
          </li>
          <li class="replies">
            <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
            <p>Excuses don't win championships.</p>
          </li>
          <li class="sent">
            <img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
            <p>Oh yeah, did Michael Jordan tell you that?</p>
          </li>
          <li class="replies">
            <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
            <p>No, I told him that.</p>
          </li>
          <li class="replies">
            <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
            <p>What are your choices when someone puts a gun to your head?</p>
          </li>
          <li class="sent">
            <img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
            <p>What are you talking about? You do what they say or they shoot you.</p>
          </li>
          <li class="replies">
            <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
            <p>Wrong. You take the gun, or you pull out a bigger one. Or, you call their bluff. Or, you do any one of a hundred and forty six other things.</p>
          </li>
        </ul>
      </div>
      <div class="message-input">
        <div class="wrap">
          <input type="text" placeholder="Write your message..." />
          <button class="submit"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
        </div>
      </div>
    </div>
  </div>

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
      showResult: false,
      showResultThread: false,
      userSenderList: [],
      threadMessageList: []
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
    selectThread: function(userId) {
      var self = this;
      this.$store.dispatch('getThreadMessage', {
          senderId: this.$store.state.authentication.user.Id,
          receiverId: userId,
          top: 100
        })
        .then(res => {
          self.showResultThread = false;

          self.threadMessageList = res.data;
          //serverBus.$emit('showLoading', false);
          self.showResultThread = true;
        })
        .catch(error => {
          serverBus.$emit('showError', 'Si è verificato un errore ' + JSON.stringify(error));
          serverBus.$emit('showLoading', false);
        })
    },
    getMyMessages: function() {
      var self = this;
      //serverBus.$emit('showLoading', true);
      this.$store.dispatch('getMyNewMessagesSender', {
          baseUserId: this.$store.state.authentication.user.Id,
          top: 100
        })
        .then(res => {
          self.showResult = false;
          self.userSenderList = res.data;
          //serverBus.$emit('showLoading', false);
          self.showResult = true;
        })
        .catch(error => {
          serverBus.$emit('showError', 'Si è verificato un errore ' + JSON.stringify(error));
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
    .md-card-header {
        background-color: #FFF;
        img {
            margin-right: 0;
            border-radius: initial;
        }

    }

    .md-card-content {
        h3 {
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
    .gws-flights-fab__mini {
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
        &::before {
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
        div {
            margin-top: 0;
        }

    }
}

.container {
    max-width: 1170px;
    margin: auto;
}
img {
    max-width: 100%;
}
// chat

#frame {
    width: 100%;
    min-width: 360px;
    height: 92vh;
    min-height: 300px;
    max-height: 720px;
}
@media screen and (max-width: 360px) {
    #frame {
        width: 100%;
        height: 100vh;
    }
}
#frame #sidepanel {
    float: left;
    min-width: 280px;
    max-width: 340px;
    width: 40%;
    height: 100%;
    background: #181a1a;
    color: #f5f5f5;
    overflow: hidden;
    position: relative;
}
@media screen and (max-width: 735px) {
    #frame #sidepanel {
        width: 58px;
        min-width: 58px;
    }
}
#frame #sidepanel #profile {
    width: 80%;
    margin: 25px auto;
}
@media screen and (max-width: 735px) {
    #frame #sidepanel #profile {
        width: 100%;
        margin: 0 auto;
        padding: 5px 0 0;
        background: #32465a;
    }
}
#frame #sidepanel #profile.expanded .wrap {
    height: 210px;
    line-height: initial;
}
#frame #sidepanel #profile.expanded .wrap p {
    margin-top: 20px;
}
#frame #sidepanel #profile.expanded .wrap i.expand-button {
    -moz-transform: scaleY(-1);
    -o-transform: scaleY(-1);
    -webkit-transform: scaleY(-1);
    transform: scaleY(-1);
}
#frame #sidepanel #profile .wrap {
    height: 60px;
    line-height: 60px;
    overflow: hidden;
    -moz-transition: 0.3s height ease;
    -o-transition: 0.3s height ease;
    -webkit-transition: 0.3s height ease;
    transition: 0.3s height ease;
}
@media screen and (max-width: 735px) {
    #frame #sidepanel #profile .wrap {
        height: 55px;
    }
}
#frame #sidepanel #profile .wrap img {
    width: 50px;
    border-radius: 50%;
    padding: 3px;
    border: 2px solid #e74c3c;
    height: auto;
    float: left;
    cursor: pointer;
    -moz-transition: 0.3s border ease;
    -o-transition: 0.3s border ease;
    -webkit-transition: 0.3s border ease;
    transition: 0.3s border ease;
}
@media screen and (max-width: 735px) {
    #frame #sidepanel #profile .wrap img {
        width: 40px;
        margin-left: 4px;
    }
}
#frame #sidepanel #profile .wrap img.online {
    border: 2px solid #2ecc71;
}
#frame #sidepanel #profile .wrap img.away {
    border: 2px solid #f1c40f;
}
#frame #sidepanel #profile .wrap img.busy {
    border: 2px solid #e74c3c;
}
#frame #sidepanel #profile .wrap img.offline {
    border: 2px solid #95a5a6;
}
#frame #sidepanel #profile .wrap p {
    float: left;
    margin-left: 15px;
}
@media screen and (max-width: 735px) {
    #frame #sidepanel #profile .wrap p {
        display: none;
    }
}
#frame #sidepanel #profile .wrap i.expand-button {
    float: right;
    margin-top: 23px;
    font-size: 0.8em;
    cursor: pointer;
    color: #435f7a;
}
@media screen and (max-width: 735px) {
    #frame #sidepanel #profile .wrap i.expand-button {
        display: none;
    }
}
#frame #sidepanel #profile .wrap #status-options {
    position: absolute;
    opacity: 0;
    visibility: hidden;
    width: 150px;
    margin: 70px 0 0;
    border-radius: 6px;
    z-index: 99;
    line-height: initial;
    background: #435f7a;
    -moz-transition: 0.3s all ease;
    -o-transition: 0.3s all ease;
    -webkit-transition: 0.3s all ease;
    transition: 0.3s all ease;
}
@media screen and (max-width: 735px) {
    #frame #sidepanel #profile .wrap #status-options {
        width: 58px;
        margin-top: 57px;
    }
}
#frame #sidepanel #profile .wrap #status-options.active {
    opacity: 1;
    visibility: visible;
    margin: 75px 0 0;
}
@media screen and (max-width: 735px) {
    #frame #sidepanel #profile .wrap #status-options.active {
        margin-top: 62px;
    }
}
#frame #sidepanel #profile .wrap #status-options:before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 8px solid #435f7a;
    margin: -8px 0 0 24px;
}
@media screen and (max-width: 735px) {
    #frame #sidepanel #profile .wrap #status-options:before {
        margin-left: 23px;
    }
}
#frame #sidepanel #profile .wrap #status-options ul {
    overflow: hidden;
    border-radius: 6px;
}
#frame #sidepanel #profile .wrap #status-options ul li {
    padding: 15px 0 30px 18px;
    display: block;
    cursor: pointer;
}
@media screen and (max-width: 735px) {
    #frame #sidepanel #profile .wrap #status-options ul li {
        padding: 15px 0 35px 22px;
    }
}
#frame #sidepanel #profile .wrap #status-options ul li:hover {
    background: #496886;
}
#frame #sidepanel #profile .wrap #status-options ul li span.status-circle {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin: 5px 0 0;
}
@media screen and (max-width: 735px) {
    #frame #sidepanel #profile .wrap #status-options ul li span.status-circle {
        width: 14px;
        height: 14px;
    }
}
#frame #sidepanel #profile .wrap #status-options ul li span.status-circle:before {
    content: '';
    position: absolute;
    width: 14px;
    height: 14px;
    margin: -3px 0 0 -3px;
    background: transparent;
    border-radius: 50%;
    z-index: 0;
}
@media screen and (max-width: 735px) {
    #frame #sidepanel #profile .wrap #status-options ul li span.status-circle:before {
        height: 18px;
        width: 18px;
    }
}
#frame #sidepanel #profile .wrap #status-options ul li p {
    padding-left: 12px;
}
@media screen and (max-width: 735px) {
    #frame #sidepanel #profile .wrap #status-options ul li p {
        display: none;
    }
}
#frame #sidepanel #profile .wrap #status-options ul li#status-online span.status-circle {
    background: #2ecc71;
}
#frame #sidepanel #profile .wrap #status-options ul li#status-online.active span.status-circle:before {
    border: 1px solid #2ecc71;
}
#frame #sidepanel #profile .wrap #status-options ul li#status-away span.status-circle {
    background: #f1c40f;
}
#frame #sidepanel #profile .wrap #status-options ul li#status-away.active span.status-circle:before {
    border: 1px solid #f1c40f;
}
#frame #sidepanel #profile .wrap #status-options ul li#status-busy span.status-circle {
    background: #e74c3c;
}
#frame #sidepanel #profile .wrap #status-options ul li#status-busy.active span.status-circle:before {
    border: 1px solid #e74c3c;
}
#frame #sidepanel #profile .wrap #status-options ul li#status-offline span.status-circle {
    background: #95a5a6;
}
#frame #sidepanel #profile .wrap #status-options ul li#status-offline.active span.status-circle:before {
    border: 1px solid #95a5a6;
}
#frame #sidepanel #profile .wrap #expanded {
    padding: 100px 0 0;
    display: block;
    line-height: initial !important;
}
#frame #sidepanel #profile .wrap #expanded label {
    float: left;
    clear: both;
    margin: 0 8px 5px 0;
    padding: 5px 0;
}
#frame #sidepanel #profile .wrap #expanded input {
    border: none;
    margin-bottom: 6px;
    background: #32465a;
    border-radius: 3px;
    color: #f5f5f5;
    padding: 7px;
    width: calc(100% - 43px);
}
#frame #sidepanel #profile .wrap #expanded input:focus {
    outline: none;
    background: #435f7a;
}
#frame #sidepanel #search {
    border-top: 1px solid #32465a;
    border-bottom: 1px solid #32465a;
    font-weight: 300;
}
@media screen and (max-width: 735px) {
    #frame #sidepanel #search {
        display: none;
    }
}
#frame #sidepanel #search label {
    position: absolute;
    margin: 10px 0 0 20px;
}
#frame #sidepanel #search input {
    font-family: "proxima-nova", "Source Sans Pro", sans-serif;
    padding: 10px 0 10px 46px;
    width: calc(100% - 25px);
    border: none;
    background: #32465a;
    color: #f5f5f5;
}
#frame #sidepanel #search input:focus {
    outline: none;
    background: #435f7a;
}
#frame #sidepanel #search input::-webkit-input-placeholder {
    color: #f5f5f5;
}
#frame #sidepanel #search input::-moz-placeholder {
    color: #f5f5f5;
}
#frame #sidepanel #search input:-ms-input-placeholder {
    color: #f5f5f5;
}
#frame #sidepanel #search input:-moz-placeholder {
    color: #f5f5f5;
}
#frame #sidepanel #contacts {
    height: calc(100% - 177px);
    overflow-y: scroll;
    overflow-x: hidden;
}
@media screen and (max-width: 735px) {
    #frame #sidepanel #contacts {
        height: calc(100% - 149px);
        overflow-y: scroll;
        overflow-x: hidden;
    }
    #frame #sidepanel #contacts::-webkit-scrollbar {
        display: none;
    }
}
#frame #sidepanel #contacts.expanded {
    height: calc(100% - 334px);
}
#frame #sidepanel #contacts::-webkit-scrollbar {
    width: 8px;
    background: #2c3e50;
}
#frame #sidepanel #contacts::-webkit-scrollbar-thumb {
    background-color: #243140;
}
#frame #sidepanel #contacts ul li.contact {
    position: relative;
    padding: 10px 0 15px;
    font-size: 0.9em;
    cursor: pointer;
}
@media screen and (max-width: 735px) {
    #frame #sidepanel #contacts ul li.contact {
        padding: 6px 0 46px 8px;
    }
}
#frame #sidepanel #contacts ul li.contact:hover {
    background: #32465a;
}
#frame #sidepanel #contacts ul li.contact.active {
    background: #32465a;
    border-right: 5px solid #435f7a;
}
#frame #sidepanel #contacts ul li.contact.active span.contact-status {
    border: 2px solid #32465a !important;
}
#frame #sidepanel #contacts ul li.contact .wrap {
    width: 88%;
    margin: 0 auto;
    position: relative;
}
@media screen and (max-width: 735px) {
    #frame #sidepanel #contacts ul li.contact .wrap {
        width: 100%;
    }
}
#frame #sidepanel #contacts ul li.contact .wrap span {
    position: absolute;
    left: 0;
    margin: -2px 0 0 -2px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 2px solid #2c3e50;
    background: #95a5a6;
}
#frame #sidepanel #contacts ul li.contact .wrap span.online {
    background: #2ecc71;
}
#frame #sidepanel #contacts ul li.contact .wrap span.away {
    background: #f1c40f;
}
#frame #sidepanel #contacts ul li.contact .wrap span.busy {
    background: #e74c3c;
}
#frame #sidepanel #contacts ul li.contact .wrap img {
    width: 40px;
    border-radius: 50%;
    float: left;
    margin-right: 10px;
    min-width: auto;
}
@media screen and (max-width: 735px) {
    #frame #sidepanel #contacts ul li.contact .wrap img {
        margin-right: 0;
    }
}
#frame #sidepanel #contacts ul li.contact .wrap .meta {
    padding: 5px 0 0;
}
@media screen and (max-width: 735px) {
    #frame #sidepanel #contacts ul li.contact .wrap .meta {
        display: none;
    }
}
#frame #sidepanel #contacts ul li.contact .wrap .meta .name {
    font-weight: 600;
}
#frame #sidepanel #contacts ul li.contact .wrap .meta .preview {
    margin: 5px 0 0;
    padding: 0 0 1px;
    font-weight: 400;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    -moz-transition: 1s all ease;
    -o-transition: 1s all ease;
    -webkit-transition: 1s all ease;
    transition: 1s all ease;
}
#frame #sidepanel #contacts ul li.contact .wrap .meta .preview span {
    position: initial;
    border-radius: initial;
    background: none;
    border: none;
    padding: 0 2px 0 0;
    margin: 0 0 0 1px;
    opacity: 0.5;
}
#frame #sidepanel #bottom-bar {
    position: absolute;
    width: 100%;
    bottom: 0;
}
#frame #sidepanel #bottom-bar button {
    float: left;
    border: none;
    width: 50%;
    padding: 10px 0;
    background: #32465a;
    color: #f5f5f5;
    cursor: pointer;
    font-size: 0.85em;
    font-family: "proxima-nova", "Source Sans Pro", sans-serif;
}
@media screen and (max-width: 735px) {
    #frame #sidepanel #bottom-bar button {
        float: none;
        width: 100%;
        padding: 15px 0;
    }
}
#frame #sidepanel #bottom-bar button:focus {
    outline: none;
}
#frame #sidepanel #bottom-bar button:nth-child(1) {
    border-right: 1px solid #2c3e50;
}
@media screen and (max-width: 735px) {
    #frame #sidepanel #bottom-bar button:nth-child(1) {
        border-right: none;
        border-bottom: 1px solid #2c3e50;
    }
}
#frame #sidepanel #bottom-bar button:hover {
    background: #435f7a;
}
#frame #sidepanel #bottom-bar button i {
    margin-right: 3px;
    font-size: 1em;
}
@media screen and (max-width: 735px) {
    #frame #sidepanel #bottom-bar button i {
        font-size: 1.3em;
    }
}
@media screen and (max-width: 735px) {
    #frame #sidepanel #bottom-bar button span {
        display: none;
    }
}
#frame .content {
    float: right;
    width: 60%;
    height: 100%;
    overflow: hidden;
    position: relative;
}
@media screen and (max-width: 735px) {
    #frame .content {
        width: calc(100% - 58px);
        min-width: 300px !important;
    }
}
@media screen and (min-width: 900px) {
    #frame .content {
        width: calc(100% - 340px);
    }
}
#frame .content .contact-profile {
    width: 100%;
    height: 60px;
    line-height: 60px;
    background: #f5f5f5;
}
#frame .content .contact-profile img {
    width: 40px;
    border-radius: 50%;
    float: left;
    margin: 9px 12px 0 9px;
}
#frame .content .contact-profile p {
    float: left;
}
#frame .content .contact-profile .social-media {
    float: right;
}
#frame .content .contact-profile .social-media i {
    margin-left: 14px;
    cursor: pointer;
}
#frame .content .contact-profile .social-media i:nth-last-child(1) {
    margin-right: 20px;
}
#frame .content .contact-profile .social-media i:hover {
    color: #435f7a;
}
#frame .content .messages {
    height: auto;
    min-height: calc(100% - 93px);
    max-height: calc(100% - 93px);
    overflow-y: scroll;
    overflow-x: hidden;
}
@media screen and (max-width: 735px) {
    #frame .content .messages {
        max-height: calc(100% - 105px);
    }
}
#frame .content .messages::-webkit-scrollbar {
    width: 8px;
    background: transparent;
}
#frame .content .messages::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
}
#frame .content .messages ul li {
    display: inline-block;
    clear: both;
    float: left;
    margin: 15px 15px 5px;
    width: calc(100% - 25px);
    font-size: 0.9em;
}
#frame .content .messages ul li:nth-last-child(1) {
    margin-bottom: 20px;
}
#frame .content .messages ul li.sent img {
    margin: 6px 8px 0 0;
}
#frame .content .messages ul li.sent p {
    background: #435f7a;
    color: #f5f5f5;
}
#frame .content .messages ul li.replies img {
    float: right;
    margin: 6px 0 0 8px;
}
#frame .content .messages ul li.replies p {
    background: #f5f5f5;
    float: right;
}
#frame .content .messages ul li img {
    width: 22px;
    border-radius: 50%;
    float: left;
}
#frame .content .messages ul li p {
    display: inline-block;
    padding: 10px 15px;
    border-radius: 20px;
    max-width: 205px;
    line-height: 130%;
}
@media screen and (min-width: 735px) {
    #frame .content .messages ul li p {
        max-width: 300px;
    }
}
#frame .content .message-input {
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 99;
}
#frame .content .message-input .wrap {
    position: relative;
}
#frame .content .message-input .wrap input {
    font-family: "proxima-nova", "Source Sans Pro", sans-serif;
    float: left;
    border: none;
    width: calc(100% - 50px);
    padding: 11px 32px 10px 8px;
    font-size: 0.8em;
    color: #32465a;
}
@media screen and (max-width: 735px) {
    #frame .content .message-input .wrap input {
        padding: 15px 32px 16px 8px;
    }
}
#frame .content .message-input .wrap input:focus {
    outline: none;
}
#frame .content .message-input .wrap .attachment {
    position: absolute;
    right: 60px;
    z-index: 4;
    margin-top: 10px;
    font-size: 1.1em;
    color: #435f7a;
    opacity: 0.5;
    cursor: pointer;
}
@media screen and (max-width: 735px) {
    #frame .content .message-input .wrap .attachment {
        margin-top: 17px;
        right: 65px;
    }
}
#frame .content .message-input .wrap .attachment:hover {
    opacity: 1;
}
#frame .content .message-input .wrap button {
    float: right;
    border: none;
    width: 50px;
    padding: 12px 0;
    cursor: pointer;
    background: #32465a;
    color: #f5f5f5;
}
@media screen and (max-width: 735px) {
    #frame .content .message-input .wrap button {
        padding: 16px 0;
    }
}
#frame .content .message-input .wrap button:hover {
    background: #435f7a;
}
#frame .content .message-input .wrap button:focus {
    outline: none;
}
</style>
