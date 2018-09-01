<template lang="html">

  <div class="container">
    <md-dialog-confirm :md-active.sync="showConfirmDelete"
                       md-title="Cancellazione Giocatore"
                       md-content="Attenzione! cancellando il giocatore dal tuo portafoglio non potrai più recuperarlo"
                       md-confirm-text="OK"
                       md-cancel-text="Annulla"
                       @md-cancel="onCancelDelete"
                       @md-confirm="onConfirmDelete" />
    <md-dialog :md-active.sync="showDialog" c>
      <md-dialog-title>
        <div>
          <div style="float:left">
            Profilo nuovo calciatore
          </div>
          <div style="float:right">
            <a href="#" class="close" @click="showDialog = false" />
          </div>
        </div>

      </md-dialog-title>

      <agent-player-profile-form :playerId="selectedPlayerId" />
      <!-- <md-tabs md-dynamic-height>
      <md-tab md-label="Info">
        <agent-player-profile-form :playerId="selectedPlayerId" />
      </md-tab>

    </md-tabs> -->
      <!--<md-dialog-actions>
      <md-button class="md-primary" @click="showDialog = false">Close</md-button>
      <md-button class="md-primary" @click="showDialog = false">Save</md-button>
    </md-dialog-actions>-->
    </md-dialog>

    <div class="row">
      <div class="col">
        <md-card md-with-hover>

          <md-card-content>
            <h3>gestisci i tuoi calciatori e mantieni aggiornate le loro informazioni</h3>
            <md-button class="md-icon-button md-raised md-primary md-fab" @click="AddNewPlayer">
              <md-icon>add</md-icon>
            </md-button>
            <p>
              Aggiungi calciatore
            </p>
          </md-card-content>

        </md-card>
      </div>
    </div>

        <div class="row row-eq-height">
      <div class="col" v-for="card in portfolio" :key="card.Name">
        <md-card md-with-hover>
          <md-card-header>
            <md-card-header-text>
              <div class="md-title">{{ card.Name }} {{ card.Surname }}</div>
              <div class="md-subhead">{{ card.Role != null  ? card.Role : 'No Role' }}</div>
            </md-card-header-text>
            <md-card-media md-medium>
              <picture-box :picUrl="card.FilePlayerImage" :picType="0"></picture-box>
            </md-card-media>
          </md-card-header>
          <md-card-actions>
            <md-button class="md-success tiro" @click="EditPlayer(card.Id)">
              <i class="md-icon md-icon-font material-icons md-theme-default">edit</i>
                Modifica
            </md-button>
            <md-button class="btn btn-success " @click="selectedPlayerId=card.Id;showConfirmDelete=true">
              <i class="md-icon md-icon-font material-icons md-theme-default">delete</i>
              Cancella</md-button>
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
      showConfirmDelete: false,
      selectedPlayerId: null,
      portfolio: [],
      showDialog: false,
    }
  },
  methods: {
    onConfirmDelete() {
      var self = this;
      serverBus.$emit('showLoading', true);
      this.$store.dispatch('deletePlayerAgent', this.selectedPlayerId).then(res => {
        this.$store.dispatch('getAgentPlayerList', this.$store.state.authentication.user.Id).then(res => {
          this.portfolio = res.data;
          this.profileLoaded = true;
          this.showConfirmDelete = false;
          serverBus.$emit('showLoading', false);
        }).catch(error => {
          alert('Si è verificato un errore');
          serverBus.$emit('showLoading', false)
          this.showConfirmDelete = false;
        });
      }).catch(error => {
        alert('Si è verificato un errore');
        serverBus.$emit('showLoading', false)
        this.showConfirmDelete = false;
      });
    },
    onCancelDelete() {
      this.showConfirmDelete = false;
    },
    AddNewPlayer: function() {
      this.selectedPlayerId = null;
      this.showDialog = true;
    },
    EditPlayer: function(playerId) {
      this.selectedPlayerId = playerId;
      this.showDialog = true;
    },

  },
  created() {
    serverBus.$on('addedNewPlayerAgent', () => {
      serverBus.$emit('showLoading', true);
      this.$store.dispatch('getAgentPlayerList', this.$store.state.authentication.user.Id).then(res => {
        this.portfolio = res.data;
        this.profileLoaded = true;
        this.showDialog = false;
        serverBus.$emit('showLoading', false);
      }).catch(error => {
        alert('Si è verificato un errore');
        serverBus.$emit('showLoading', false)
      });
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
    }).catch(error => {
      alert('Si è verificato un errore');
      serverBus.$emit('showLoading', false)
    });
  },
}
</script>

<style scoped lang="scss">
h3 {
    color: #2c3e50;
    text-transform: uppercase;
    font-weight: 700;
    font-size: 1.2rem;
}
.md-dialog {
    max-width: 868px;
}
.md-card {
    .md-card-header {
        background-color: #FFF;
    }
    .md-title {
        font-size: 22px;
    }
}
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

.close:after,
.close:before {
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
