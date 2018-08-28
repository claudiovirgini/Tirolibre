<template lang="html">

  <div class="container">
    <md-dialog :md-active.sync="showDialog">
        <md-dialog-title>Preferences</md-dialog-title>

        <md-tabs md-dynamic-height>
          <md-tab md-label="General">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
          </md-tab>

          <md-tab md-label="Activity">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
          </md-tab>

          <md-tab md-label="Account">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam mollitia dolorum dolores quae commodi impedit possimus qui, atque at voluptates cupiditate. Neque quae culpa suscipit praesentium inventore ducimus ipsa aut.</p>
          </md-tab>
        </md-tabs>

        <md-dialog-actions>
          <md-button class="md-primary" @click="showDialog = false">Close</md-button>
          <md-button class="md-primary" @click="showDialog = false">Save</md-button>
        </md-dialog-actions>
    </md-dialog>

    <div class="row row-eq-height">
      <div class="col">
        <md-card md-with-hover>

        <md-card-content>
          <md-button class="md-icon-button md-raised md-primary md-fab" @click="showDialog = true">
            <md-icon>add</md-icon>
          </md-button>
          <p>
            Aggiungi
          </p>
    </md-card-content>

        </md-card>
      </div>

      <div class="col" v-for="card in portfolio" :key="card.name">
        <md-card md-with-hover>
      <md-card-header>
        <md-card-header-text>
          <div class="md-title">{{ card.name }}</div>
          <div class="md-subhead">{{ card.role }}</div>
        </md-card-header-text>

        <md-card-media md-medium>
          <img :src="card.fullpath" alt="Portfolio">
        </md-card-media>
      </md-card-header>

      <md-card-actions>
        <md-button class="md-primary">Modifica</md-button>
        <md-button class="btn btn-success">Cancella</md-button>
      </md-card-actions>
    </md-card>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Portfolio',
  data() {
    return {
      showDialog: false,
      portfolio: []
    }
  },
  methods: {
    userList: function() {
      this.error = null;
      axios.get('./assets/data/portfolio.json', {})
        .then(response => {
          console.log('userList Response:', response)
          if (response.status !== 200) {
            this.error = response.statusText
            return
          }
          this.portfolio = response.data
        })
        .catch(error => {
          // Request failed.
          console.log('error', error.response)
          this.error = error.response
        })
    }
  },
  mounted() {
    this.userList()
  },
}
</script>

<style scoped lang="scss">
.md-dialog {
    max-width: 768px;
}
.md-card {
    .md-card-header {
        background-color: #FFF;
    }
}
</style>
