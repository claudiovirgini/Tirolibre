<template>
<form>
  <md-card>
    <md-card-header :data-background-color="dataBackgroundColor">
      <h4 class="title">Aggiorna Profilo</h4>
      <p class="category">Completa il tuo profilo</p>
    </md-card-header>

    <md-card-content>
      <div class="md-layout">
        <div class="md-layout-item md-small-size-100 md-size-50">
          <md-field>
            <label>Nome</label>
            <md-input v-model="firstName" type="text"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-50">
          <md-field>
            <label>Cognome</label>
            <md-input v-model="lastName" type="text"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-33">
          <md-field>
            <label>Classe</label>
            <md-input v-model="classe" type="text"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-33">
          <md-field>
            <label>Nazionalità</label>
            <md-input v-model="nazionalita" type="text"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-33">
          <md-field>
            <label>Ruolo</label>
            <md-input v-model="ruolo" type="text"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-33">
          <md-field>
            <label>Dove ti Trovi</label>
            <md-input v-model="doveTiTrovi" type="text"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-33">
          <md-field>
            <label>Dove Cerchi</label>
            <md-input v-model="doveCerchi" type="text"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-33">
          <md-field>
            <label>Status</label>
            <md-input v-model="status" type="text"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-33">
          <md-field>
            <label>Telefono</label>
            <md-input v-model="tel" type="number"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-33">
          <md-field>
            <label>Peso</label>
            <md-input v-model="peso" type="number"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-33">
          <md-field>
            <label>Altezza</label>
            <md-input v-model="altezza" type="number"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-33">
          <md-field>
            <label>Nome Squadra ultimo campionato</label>
            <md-input v-model="campionato1" type="text"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-33">
          <md-field>
            <label>Campionato 2</label>
            <md-input v-model="campionato2" type="text"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-33">
          <md-field>
            <label>Campionato 3</label>
            <md-input v-model="status" type="text"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-size-100">
          <md-field maxlength="5">
            <label>About Me</label>
            <md-textarea v-model="aboutMe"></md-textarea>
          </md-field>
        </div>
        <div class="md-layout-item md-size-100 text-right">
          <md-button class="md-raised md-success">Aggiorna Profilo</md-button>
        </div>
      </div>

    </md-card-content>
  </md-card>
</form>
</template>
<script>
export default {
  name: 'edit-profile-form',
  props: {
    dataBackgroundColor: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      firstName: 'Alejandro',
      lastName: 'Salgado',
      classe: '1990',
      nazionalita: 'Italiana',
      ruolo: 'attaccante',
      status: 'svincolato',
      doveTiTrovi: 'Roma',
      doveCerchi: 'Roma',
      tel: '1234567890',
      peso: '72',
      altezza: '187',
      campionato1: 'Serie D',
      campionato2: 'Serie D',
      campionato3: 'Serie D',
      company: "ASROMA",
      email: "",
      aboutMe: 'Oh so, your weak rhyme. You doubt I\'ll bother, reading into it.I\'ll probably won\'t, left to my own devicesBut that\'s the difference in our opinions.'
    }
  }
}
</script>
<style>

</style>
