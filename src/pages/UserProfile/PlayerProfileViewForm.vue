<template>
<div>
  <!-- <Logo/> -->
  <md-card class="md-card-profile">

    <md-card-header :data-background-color="dataBackgroundColor">
      <h4 class="title">Scheda Profilo</h4>
      <!-- <p class="category">Completa il tuo profilo</p> -->
    </md-card-header>

    <md-card-content>

      <div class="md-layout">
        <div class="md-layout-item md-small-size-100 md-size-33">
          <md-field>
            <label>Classe</label>
            <md-input :value='yearClass' disabled type="text"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-33">
          <md-field>
            <label>Nazionalità</label>
            <md-input :value='nationality' disabled type="text"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-33">
          <md-field>
            <label>Ruolo</label>
            <md-input :value='roleSelected' disabled type="text"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-33">
          <md-field>
            <label>Dove ti Trovi</label>
            <md-input :value="city" type="text" disabled></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-33">
          <md-field>
            <label>Dove Cerchi</label>
            <md-input :value='researchPlace' disabled type="text"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-33">
          <md-field>
            <label>Status</label>
            <md-input :value='actualStatus' disabled type="text"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-33">
          <md-field>
            <label>Telefono</label>
            <md-input :value='phoneNumber' disabled type="number"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-33">
          <md-field>
            <label>Peso</label>
            <md-input :value='weigth' disabled type="number"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-33">
          <md-field>
            <label>Altezza</label>
            <md-input :value='heigth' disabled type="number"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-33">
          <md-field>
            <label>Nome Squadra ultimo campionato</label>
            <md-input :value='experience1' disabled type="text"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-33">
          <md-field>
            <label>Campionato 2</label>
            <md-input :value='experience2' disabled type="text"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-small-size-100 md-size-33">
          <md-field>
            <label>Campionato 3</label>
            <md-input :value='experience3' disabled type="text"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-size-100">
          <md-field maxlength="5">
            <label>About Me</label>
            <md-textarea :value='aboutMe' disabled></md-textarea>
          </md-field>
        </div>
      </div>

    </md-card-content>
  </md-card>


</div>
</template>

<script>
import Logo from '@/components/Logo'
export default {
  name: 'user-card',
  props: {
    playerdata: {
      type: Object
    },
    cardUserImage: {
      type: String,
      default: require('@/assets/img/faces/marc.jpg')
    },
    dataBackgroundColor: {
      type: String,
      default: ''
    }
  },
  components: {
    Logo
  },

  methods: {
    playerProfile: function() {
      this.cardResult = false
      this.userProfile = true
      console.log("player " + this.$store.state.id)
    }
  },
  computed: {
    name: {
      get() {
        return (this.playerdata != null) ? this.playerdata.Name : '';
      },
      set(value) {
        this.playerdata.Name = value;
      }
    },
    //surname: {
    //  get() {
    //    return (this.playerdata != null) ? this.playerdata.Surname : '';
    //  },
    //  set(value) {
    //    this.playerdata.SurName = value;
    //  }
    //},
    weigth: {
      get() {
        return (this.playerdata != null) ? this.playerdata.Weigth : '';
      },
      set(value) {
        this.playerdata.Weigth = value;
      }
    },
    heigth: {
      get() {
        return (this.playerdata != null) ? this.playerdata.Heigth : '';
      },
      set(value) {
        this.playerdata.Heigth = value;
      }
    },
    aboutMe: {
      get() {
        return (this.playerdata != null) ? this.playerdata.AboutMe : '';
      },
      set(value) {
        this.playerdata.AboutMe = value;
      }
    },
    actualStatus: {
      get() {
        return (this.playerdata != null) ? this.playerdata.ActualStatus : '';
      },
      set(value) {
        this.playerdata.ActualStatus = value;
      }
    },
    city: {
      get() {
        return (this.playerdata != null) ? this.playerdata.City : '';
      },
      set(value) {
        this.playerdata.City = value;
      }
    },
    nationality: {
      get() {
        return (this.playerdata != null) ? this.playerdata.Nationality : '';
      },
      set(value) {
        this.playerdata.Nationality = value;
      }
    },
    phoneNumber: {
      get() {
        return (this.playerdata != null) ? this.playerdata.PhoneNumber : '';
      },
      set(value) {
        this.playerdata.PhoneNumber = value;
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
      },
      set(value) {
        if (this.playerdata.BornDate != null) {
          this.playerdata.BornDate = new Date(this.playerdata.BornDate);
        } else {
          this.playerdata.BornDate = new Date('01/01/2000');
        }
        this.playerdata.BornDate.setFullYear(value)
      }
    },
    roleSelected: {
      get() {
        if ((this.playerdata != null) && (this.playerdata.Roles != null) && (this.playerdata.Roles.length > 0))
          return this.playerdata.Roles[0].RoleName
        else return 'not available';
      },
      set(value) {
        if ((this.playerdata != null) && (this.playerdata.Roles != null) && (this.playerdata.Roles.length > 0))
          return this.playerdata.Roles[0].RoleName = value;
        else {
          this.playerdata.Roles = [];
          this.playerdata.Roles.push({
            Id: 0,
            RoleName: value
          })
        }
      }
    },
    researchPlace: {
      get() {
        if ((this.playerdata != null) && (this.playerdata.ResearchPlaces != null) && (this.playerdata.ResearchPlaces.length > 0))
          return this.playerdata.ResearchPlaces[0].Value
        else return 'not available';
      },
      set(value) {
        if ((this.playerdata != null) && (this.playerdata.ResearchPlaces != null) && (this.playerdata.ResearchPlaces.length > 0))
          return this.playerdata.ResearchPlaces[0].Value = value;
        else {
          this.playerdata.ResearchPlaces = [];
          this.playerdata.ResearchPlaces.push({
            Id: 0,
            Value: value
          })
        }
      }
    },
    experience1: {
      get() {
        if ((this.playerdata != null) && (this.playerdata.Experiences != null) && (this.playerdata.Experiences.length > 0))
          return this.playerdata.Experiences[0].TeamName
        else return 'not available';
      },
      set(value) {
        if ((this.playerdata != null) && (this.playerdata.Experiences != null) && (this.playerdata.Experiences.length > 0))
          return this.playerdata.Experiences[0].TeamName = value;
        else {
          this.playerdata.Experiences = [];
          this.playerdata.Experiences.push({
            Id: 0,
            TeamName: value
          })
        }
      }
    },
    experience2: {
      get() {
        if ((this.playerdata != null) && (this.playerdata.Experiences != null) && (this.playerdata.Experiences.length > 1))
          return this.playerdata.Experiences[1].TeamName
        else
          return 'not available';
      },
      set(value) {
        if ((this.playerdata != null) && (this.playerdata.Experiences != null) && (this.playerdata.Experiences.length > 1))
          return this.playerdata.Experiences[1].TeamName = value;
        else {
          if ((this.playerdata.Experiences != null) && (this.playerdata.Experiences.length == 1)) {
            this.playerdata.Experiences.push({
              Id: 0,
              TeamName: value
            })
          }
        }
      }
    },
    experience3: {
      get() {
        if ((this.playerdata != null) && (this.playerdata.Experiences != null) && (this.playerdata.Experiences.length > 2))
          return this.playerdata.Experiences[2].TeamName
        else return 'not available';
      },
      set(value) {
        if ((this.playerdata != null) && (this.playerdata.Experiences != null) && (this.playerdata.Experiences.length > 2))
          return this.playerdata.Experiences[2].TeamName = value;
        else {
          if ((this.playerdata.Experiences != null) && (this.playerdata.Experiences.length == 2)) {
            this.playerdata.Experiences.push({
              Id: 0,
              TeamName: value
            })
          }
        }
      }
    },

  },
  mounted() {}
}
</script>

<style>

</style>
