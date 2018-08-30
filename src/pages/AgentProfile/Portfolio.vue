<template lang="html">

  <div class="container">
    <md-dialog :md-active.sync="showDialog" c>
        <md-dialog-title>
          <div>
            <div style="float:left">
              Gestione calciatore
            </div>
            <div style="float:right">
              <a href="#" class="close" @click="showDialog = false"/>
                </div>
          </div>
              
        </md-dialog-title>

        <md-tabs md-dynamic-height>
          <md-tab md-label="Info">
            <agent-player-profile-form :playerId="selectedPlayerId" />
          </md-tab>

        </md-tabs>

        <!--<md-dialog-actions>
          <md-button class="md-primary" @click="showDialog = false">Close</md-button>
          <md-button class="md-primary" @click="showDialog = false">Save</md-button>
        </md-dialog-actions>-->
    </md-dialog>

    <div class="row row-eq-height">
      <div class="col">
        <md-card md-with-hover>

        <md-card-content>
          <md-button class="md-icon-button md-raised md-primary md-fab " @click="AddNewPlayer()">
            <md-icon>add</md-icon>
          </md-button>
          <p>
            Aggiungi
          </p>
    </md-card-content>

        </md-card>
      </div>

      <div class="col" v-for="card in portfolio" :key="card.Name">
        <md-card md-with-hover>
      <md-card-header>
        <md-card-header-text>
          <div class="md-title">{{ card.Name }}</div>
          <div class="md-subhead">{{ card.Role != null  ? card.Role : 'No Role' }}</div>
        </md-card-header-text>
        <md-card-media md-medium>
          <picture-box :picUrl="card.FilePlayerImage" :picType="0"></picture-box>
        </md-card-media>
      </md-card-header>
      <md-card-actions>
        <md-button class="md-primary tiro"  @click="EditPlayer(card.Id)" >Modifica</md-button>
        <md-button class="btn btn-success " @click="DeletePlayer(card.Id)" >Cancella</md-button>
      </md-card-actions>
    </md-card>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import AgentPlayerProfileForm from '@/pages/AgentProfile/AgentPlayerProfileForm.vue'
  import PictureBox from '@/components/PictureBox/PictureBox'
  import {
    serverBus
  } from '@/main';

export default {
    name: 'Portfolio',
    props: {
      userList: {
        type: Array 
      },
    },
    components: {
      AgentPlayerProfileForm,
      PictureBox
    },
  data() {
    return {
      selectedPlayerId : null,
      portfolio : [],
      showDialog: false,
    }
  },
    methods: {
      AddNewPlayer: function () {
        this.selectedPlayerId = null;
        this.showDialog = true;
      },
      EditPlayer: function (playerId) {
        this.selectedPlayerId = playerId;
        this.showDialog = true;
      },
      DeletePlayer: function (playerId) {
        serverBus.$emit('showLoading', true);
        this.$store.dispatch('deletePlayerAgent', playerId).then(res => {
          this.$store.dispatch('getAgentPlayerList', this.$store.state.authentication.user.Id).then(res => {
            this.portfolio = res.data;
            this.profileLoaded = true;
            serverBus.$emit('showLoading', false);
          }).catch(error => { alert('Si è verificato un errore'); serverBus.$emit('showLoading', false) });
        }).catch(error => { alert('Si è verificato un errore'); serverBus.$emit('showLoading', false) });
      }
    },
    created() {
      serverBus.$on('addedNewPlayerAgent', () => {
        serverBus.$emit('showLoading', true);
        this.$store.dispatch('getAgentPlayerList', this.$store.state.authentication.user.Id).then(res => {
          this.portfolio = res.data;
          this.profileLoaded = true;
          this.showDialog = false;
          serverBus.$emit('showLoading', false);
        }).catch(error => { alert('Si è verificato un errore'); serverBus.$emit('showLoading', false) });
      });
    },
      mounted() {
        //if (this.$store.state.authentication.user == null)
        //  this.$router.go('/')
        //else
        serverBus.$emit('showLoading', true);
        this.$store.dispatch('getAgentPlayerList', this.$store.state.authentication.user.Id).then(res => {
          this.portfolio = res.data;
          //this.profileLoaded = true;
          serverBus.$emit('showLoading', false);
        }).catch(error => { alert('Si è verificato un errore'); serverBus.$emit('showLoading', false) });
      },
}
</script>

<style scoped lang="scss">

  .close {
    position: absolute;
    right: 32px;
    top: 32px;
    width: 32px;
    height: 32px;
    opacity: 0.3;
  }

    .close:hover {
      opacity: 1;
    }

    .close:before, .close:after {
      position: absolute;
      left: 15px;
      content: ' ';
      height: 33px;
      width: 2px;
      background-color: #333;
    }

    .close:before {
      transform: rotate(45deg);
    }

    .close:after {
      transform: rotate(-45deg);
    }
</style>
