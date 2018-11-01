<template>
<div class="content">
  <div class="md-layout">
    <div class="md-layout-item md-medium-size-100 md-size-66">
      <md-card class="dark-theme" style="overflow-y:auto">
        <md-card-content>
          <div class="md-layout" v-if="profileLoaded == true">
            <div class="md-layout-item md-small-size-100 md-size-50">
              <md-field>
                <label>Nome e Cognome</label>
                <md-input v-model="name" type="text"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label for="ruolo">Anno di nascita</label>
                <md-select v-model="yearClass" id="ruolo">
                  <md-option v-for="cla in classList" v-bind:value="cla.value">
                    {{ cla.text }}
                  </md-option>
                </md-select>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label for="ruolo">Nazionalità</label>
                <md-select v-model="nationality" id="country">
                  <md-option v-for="country in countriesList" v-bind:value="country.text">
                    {{ country.text }}
                  </md-option>
                </md-select>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label for="ruolo">Ruolo</label>
                <md-select v-model="roleSelected" id="ruolo">
                  <md-option v-for="role in roleList" v-bind:value="role.text">
                    {{ role.text }}
                  </md-option>
                </md-select>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label for="status">Status contrattuale</label>
                <md-select v-model="actualStatus" id="status">
                  <md-option v-for="status in statusList" v-bind:value="status.text">
                    {{ status.text }}
                  </md-option>
                </md-select>

              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Telefono</label>
                <md-input v-model="phoneNumber" type="number"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Peso</label>
                <md-input v-model="weigth" type="number"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Altezza</label>
                <md-input v-model="heigth" type="number"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label for="categoria">Categoria Attuale</label>
                <md-select v-model="lastCategory" id="categoria">
                  <md-option v-for="category in categoryList" v-bind:value="category.text">
                    {{ category.text }}
                  </md-option>
                </md-select>
              </md-field>

            </div>
            <!--<div class="md-layout-item md-small-size-10 md-size-10" style="padding-top:20px;padding-left:20px">
          </div>-->
            <div class="md-layout-item md-small-size-65 md-size-65" style="padding-top:18px;padding-left:18px;text-align:right">
              <map-autocomplete input-component-name="gmapsdsf2" place-holder="Località attuale" startactualpos="true" :initial-address="city" v-on:setCorrectAddress="setCorrectAddress" v-on:setInvalidAddress="setInvalidAddress" style="border-bottom:1px solid lightgrey"></map-autocomplete>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-50">
              <md-field>
                <label>Transfer Market Link</label>
                <md-input v-model="externalLink" type="text"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-50">
              <md-field>
                <label>Link video</label>
                <md-input v-model="videoLink" type="text"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Nome Squadra ultimo campionato</label>
                <md-input v-model="experience1" type="text"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Nome Squadra altre esperienze</label>
                <md-input v-model="experience2" type="text" :disabled="(playerdata != null && playerdata.Experiences != null) && (playerdata.Experiences>0)"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100 md-size-33">
              <md-field>
                <label>Nome Squadra altre esperienze</label>
                <md-input v-model="experience3" type="text"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item md-size-100">
              <md-field maxlength="5">
                <label>About Me</label>
                <md-textarea v-model="aboutMe"></md-textarea>
              </md-field>
            </div>
          </div>

          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-success" v-on:click="saveProfile()">Salva Profilo</md-button>
          </div>
          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-success" v-on:click="createCard()">Salva Profilo</md-button>
          </div>
        </md-card-content>
      </md-card>
    </div>
    <div class="md-layout-item md-medium-size-100 md-size-33">
      <md-card class="md-card-profile">
        <div class="card vue-avatar-cropper-demo text-center">
          <div class="card-body" v-if="profileLoaded == true">
            <picture-box isEditable="true" v-model="playerdata.UserImageUrl" v-on:changeSource="manageImageChanged" :picType="profile"></picture-box>
            <img :src="previewImage" />
          </div>
        </div>
        <md-card-content>
          <h4 class="card-title">{{name}}</h4>
          <!-- <h6 class="category text-gray">Profile</h6> -->
          <hr>
          <div class="text-center">
            <div class="row">
              <div class="col-lg-6">
                <h5>
                    Ruolo
                    <br><small>{{ role }}</small>
                  </h5>
              </div>
              <div class="col-lg-6">
                <h5>
                    Classe
                    <br><small>{{ yearClass }}</small>
                  </h5>
              </div>
            </div>
          </div>
        </md-card-content>

      </md-card>
    </div>
  </div>
</div>
</template>

<script>
import MapAutocomplete from '@/components/GoogleMaps/MapAutocomplete'
import PictureBox from '@/components/PictureBox/PictureBox'
import playerService from '@/services/playerService'

import {
  serverBus
} from '@/main';

export default {
  components: {
    MapAutocomplete,
    PictureBox
  },
  name: 'PlayerProfileManager',
  event: 'imgChanged',
  data() {
    return {
      previewImage: null,
      profileLoaded: true,
      showAddressComponent: true,
      roleList: [],
      statusList: [],
      categoryList: [],
      countriesList: [],
      classList: [],
      playerdata: {},
      imgSrc: '',
      cropImg: '',
    }
  },
  methods: {
    manageImageChanged: function(img) {
      // alert(JSON.stringify(img))
      this.playerdata.UserImageUrl = img;
    },
    setCorrectAddress: function(address) {
      this.city = address;
    },
    setInvalidAddress: function() {},
    saveProfile: function() {
      serverBus.$emit('showLoading', true);
      this.$store.dispatch('savePlayerProfile', this.playerdata).then(res => {
        serverBus.$emit('showLoading', false);
      }).catch(error => {
        // alert('Si è verificato un errore');
        serverBus.$emit('showLoading', false);
      })
    },
    createCard: function() {
      //playerService.createCard();
      var self = this;
      this.renderCardImage(this.playerdata, 950, 63).then(function(canvas) {
        var img = canvas.toDataURL('image/png');
        self.previewImage = img;
      }, function(err) {
        alert(JSON.stringify(err));
      })
    },
    renderCardImage: function(player, width, percHeigth) {
      var self = this;
      var rootimageurl = this.$store.state.configurations.imageRootUrl;

      function getRoleByKey(key) {
        var listaRuoli = [{
            nameToDisplay: "Portiere",
            IsSelected: false,
            key: "Portiere",
            MapColor: "b80d0d",
            imgPath: "/images/components/Roles/evidenza/Portiere.png"
          },
          {
            nameToDisplay: "Centrale Sinistro",
            IsSelected: false,
            key: "CentraleSX",
            MapColor: "3d69e5",
            imgPath: "/images/components/Roles/evidenza/centraledifesa.png"
          },
          {
            nameToDisplay: "Centrale Destro",
            IsSelected: false,
            key: "CentraleDX",
            MapColor: "3d69e5",
            imgPath: "/images/components/Roles/evidenza/centraledifesa.png"
          },
          {
            nameToDisplay: "Terzino Sinistro",
            IsSelected: false,
            key: "TerzinoSX",
            MapColor: "00ff00",
            imgPath: "/images/components/Roles/evidenza/TerzinoSX.png"
          },
          {
            nameToDisplay: "Terzino Destro",
            IsSelected: false,
            key: "TerzinoDX",
            MapColor: "00ff00",
            imgPath: "/images/components/Roles/evidenza/TerzinoDX.png"
          },
          {
            nameToDisplay: "Mediano",
            IsSelected: false,
            key: "Mediano",
            MapColor: "00ff00",
            imgPath: "/images/components/Roles/evidenza/Centrocampo.png"
          },
          {
            nameToDisplay: "Ala Sinistra",
            IsSelected: false,
            key: "AlaSX",
            MapColor: "f89d1b",
            imgPath: "/images/components/Roles/Evidenza/AlaSX.png"
          },
          {
            nameToDisplay: "Ala Destra",
            IsSelected: false,
            key: "AlaDX",
            MapColor: "f89d1b",
            imgPath: "/images/components/Roles/Evidenza/AlaDX.png"
          },
          {
            nameToDisplay: "Centrocampista",
            IsSelected: false,
            key: "Centrocampista",
            MapColor: "00ff00",
            imgPath: "/images/components/Roles/evidenza/Centrocampo.png"
          },
          {
            nameToDisplay: "SecondaPunta",
            IsSelected: false,
            key: "SecondaPunta",
            MapColor: "b80d0d",
            imgPath: "/images/components/Roles/evidenza/SecondaPunta.png"
          },
          {
            nameToDisplay: "PrimaPunta",
            IsSelected: false,
            key: "PrimaPunta",
            MapColor: "b80d0d",
            imgPath: "/images/components/Roles/evidenza/Attaccante.png"
          }
        ];
        for (var i = 0; i < listaRuoli.length; i++) {
          if (listaRuoli[i].key == key)
            return (listaRuoli[i]);
        }
      }

      function writeName(ctx, name) {
        ctx.font = "45px uni_sansheavy_caps";
        ctx.fillStyle = "#133264";
        ctx.textAlign = "start";
        ctx.shadowColor = null;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 0;
        ctx.fillText(name, perc(5), perc(6), perc(100));
      }

      function writeExperiences(ctx, player, startXOffset, startYOffset, yOffset) {
        startYOffset = startYOffset + 25
        ctx.strokeStyle = "#2fb903";
        ctx.lineWidth = 4.5;
        if (player.Experiences[0]) {
          ctx.strokeText('- ' + player.Experiences[0].TeamName, startXOffset, startYOffset);
          ctx.fillStyle = "white";
          ctx.fillText('- ' + player.Experiences[0].TeamName, startXOffset, startYOffset);
        }
        if (player.Experiences[1]) {
          ctx.strokeStyle = "#2fb903";
          ctx.lineWidth = 5;
          ctx.strokeText('- ' + player.Experiences[1].TeamName, startXOffset, startYOffset + (yOffset));
          ctx.fillStyle = "white";
          ctx.fillText('- ' + player.Experiences[1].TeamName, startXOffset, startYOffset + (yOffset));
        }
        if (player.Experiences[2]) {
          ctx.strokeStyle = "#2fb903";
          ctx.lineWidth = 5;
          ctx.strokeText('- ' + player.Experiences[2].TeamName, startXOffset, startYOffset + (2 * yOffset));
          ctx.fillStyle = "white";
          ctx.fillText('- ' + player.Experiences[2].TeamName, startXOffset, startYOffset + (2 * yOffset));
        }
      }

      function filterDate(value) {
        return moment(String(value)).format('MM/DD/YYYY hh:mm')
        //return value;
      }

      function writePersonalInfo(ctx, player, startWidth, startHeigth) {
        var yOffset = perc(3.5);
        ctx.textAlign = "end";
        ctx.font = ctx.font = (perc(2.8)) + "px uni_sansheavy_caps";
        ctx.shadowColor = "black" // string
        ctx.shadowOffsetX = 5;
        ctx.shadowOffsetY = 5;
        ctx.shadowBlur = 7;
        ctx.fillStyle = "white";
        ctx.fillText('CLASSE : ' + (new Date(player.BornDate)).getFullYear(), startWidth, startHeigth);
        ctx.fillText('PESO : ' + player.Weigth + ' KG', startWidth, startHeigth + yOffset);
        ctx.fillText('ALTEZZA : ' + player.Heigth + ' cm', startWidth, startHeigth + (2 * yOffset));
        ctx.fillText('STATUS : ' + player.ActualStatus, startWidth, startHeigth + (3 * yOffset));
        if (player.ResearchPlaces[0]) ctx.fillText('AREA DI RICERCA : ' + player.ResearchPlaces[0].Value, startWidth, startHeigth + (4 * yOffset));

        ctx.fillText('ESPERIENZE:', startWidth, startHeigth + (5 * yOffset + 90));
        writeExperiences(ctx, player, startWidth, startHeigth + (5 * yOffset + 90) + 10, yOffset);
        ctx.textAlign = "center";
        ctx.fillText('CERCA IN : ', perc(50), perc(40));
      }

      function writeRoles(ctx, player, startYOffset) {
        startYOffset = startYOffset;
        ctx.textAlign = "center";
        ctx.font = (perc(3)) + "px uni_sansheavy_caps";
        var startXOffset = perc(50);
        var yOffset = perc(2.5);
        ctx.lineWidth = 6.5;
        ctx.textAlign = "center";
        ctx.strokeStyle = "#f35c09";
        if (player.Roles[0]) {
          ctx.strokeText(getRoleByKey(player.Roles[0].RoleName).nameToDisplay, startXOffset, startYOffset);
          ctx.fillStyle = "white";
          ctx.fillText(getRoleByKey(player.Roles[0].RoleName).nameToDisplay, startXOffset, startYOffset);
          ctx.strokeStyle = "#2fb903";
        }
        if (player.Roles[1]) {
          ctx.strokeText(getRoleByKey(player.Roles[1].RoleName).nameToDisplay, startXOffset, startYOffset + yOffset);
          ctx.fillStyle = "white";
          ctx.fillText(getRoleByKey(player.Roles[1].RoleName).nameToDisplay, startXOffset, startYOffset + yOffset);
          ctx.strokeStyle = "	#fabd07";
        }
        if (player.Roles[2]) {
          ctx.strokeText(getRoleByKey(player.Roles[2].RoleName).nameToDisplay, startXOffset, startYOffset + 2 * yOffset);
          ctx.fillStyle = "white";
          ctx.fillText(getRoleByKey(player.Roles[2].RoleName).nameToDisplay, startXOffset, startYOffset + 2 * yOffset);
        }

      }

      function writeCategory(ctx, player) {

        var xOffset = perc(42);
        if (player.Divisions.length == 1) xOffset = perc(47);
        var yOffset = perc(42);
        var index = 0;
        var imgWidth = perc(8);
        if (player.Divisions[0]) {
          var divisionToSearch0 = player.Divisions[0].Name;
          do {
            if (listaCategorieCerca[index].Value == divisionToSearch0) {
              var photo0 = new Image();
              photo0.src = listaCategorieCerca[index].imgPath;
              photo0.onload = function() {
                ctx.drawImage(photo0, xOffset, yOffset, imgWidth, imgWidth);
                xOffset = xOffset + 85;
                if (player.Divisions[1]) {
                  var divisionToSearch1 = player.Divisions[1].Name;
                  var index1 = 0;
                  do {
                    if (listaCategorieCerca[index1].Value == divisionToSearch1) {
                      var photo1 = new Image();
                      photo1.src = listaCategorieCerca[index1].imgPath;
                      photo1.onload = function() {
                        ctx.drawImage(photo1, xOffset, yOffset, imgWidth, imgWidth);
                        xOffset = xOffset + 85;

                      }
                    }
                    index1++;
                  } while ((listaCategorieCerca[index1] != divisionToSearch1) && (index1 <= listaCategorieCerca.length - 1))
                }
              }
            }
            index++;
          } while ((listaCategorieCerca[index] != divisionToSearch0) && (index <= listaCategorieCerca.length - 1))
        }

      }

      function perc(percValue) {
        try {
          var returned = Math.round((width / 100) * percValue);
          return returned;
        } catch (err) {
          var ff = err;
        }
      }

      function drawRoles(ctx, role, initialX, initialY, imgWidth, imgHeigth) {
        var field = new Image();
        var roleImgWidth = 0;
        var roleImgHeigth = 0;
        //field.src = require("../../assets/SchedaBK.jpg");
        //field.onload = function () {
        //  //ctx.globalAlpha = 0.6;
        //  ctx.drawImage(field, initialX, initialY, imgWidth, imgHeigth);

        ctx.globalAlpha = 1;
        for (var i = 0; i < role.length; i++) {
          if (i == 0) {
            ctx.fillStyle = '#f35c09';
          } else {
            if (i == 1) {
              ctx.fillStyle = '#2fb903';
            } else {
              ctx.fillStyle = '#f3be1b';
            }
          }
          ctx.globalAlpha = 0.7;
          if (role[i].RoleName == 'Portiere') {
            roleImgWidth = imgWidth * 0.53;
            roleImgHeigth = roleImgWidth * 0.67;
            var initXOffset = Math.round((imgWidth - roleImgWidth) / 2);
            ctx.fillRect(350, 230, roleImgWidth, roleImgHeigth);
          }
          if ((role[i].RoleName == 'CentraleSX')) {
            roleImgWidth = imgWidth;
            roleImgHeigth = roleImgWidth * 0.53;
            //ctx.globalAlpha = 1;
            ctx.fillRect(initialX, initialY + imgHeigth - roleImgHeigth, roleImgWidth, roleImgHeigth);
          }
          if ((role[i].RoleName == 'CentraleDX')) {
            roleImgWidth = imgWidth;
            roleImgHeigth = roleImgWidth * 0.53;
            ctx.globalAlpha = 1;
            ctx.fillRect(initialX, initialY + imgHeigth - roleImgHeigth, roleImgWidth, roleImgHeigth);
          }
          if ((role[i].RoleName == 'TerzinoSX')) {
            roleImgWidth = 0.26 * imgWidth;
            roleImgHeigth = imgHeigth / 2;
            //ctx.globalAlpha = 1;
            ctx.fillRect(initialX, initialY + roleImgHeigth, roleImgWidth, roleImgHeigth);
          }
          if ((role[i].RoleName == 'TerzinoDX')) {
            roleImgWidth = 0.26 * imgWidth;
            roleImgHeigth = imgHeigth / 2;
            //ctx.globalAlpha = alpha;
            ctx.fillRect(initialX + imgWidth - roleImgWidth, initialY + roleImgHeigth, roleImgWidth, roleImgHeigth);
          }
          if ((role[i].RoleName == 'AlaDX')) {
            roleImgWidth = 0.26 * imgWidth;
            roleImgHeigth = imgHeigth;
            //ctx.globalAlpha = alpha;
            ctx.fillRect(initialX + imgWidth - roleImgWidth, initialY, roleImgWidth, roleImgHeigth);
          }
          if ((role[i].RoleName == 'AlaSX')) {
            roleImgWidth = 0.26 * imgWidth;
            roleImgHeigth = imgHeigth;
            //ctx.globalAlpha = alpha;
            ctx.fillRect(initialX, initialY, roleImgWidth, roleImgHeigth);
          }
          if ((role[i].RoleName == 'Centrocampista') || (role[i].RoleName == 'Mediano')) {
            ctx.fillRect(initialX, initialY + (imgHeigth / 2) - 23, imgWidth, 45);
          }
          if ((role[i].RoleName == 'SecondaPunta')) {
            roleImgWidth = imgWidth;
            roleImgHeigth = roleImgWidth * 0.2;
            var offsetY = imgWidth * 0.3;
            //ctx.globalAlpha = alpha;
            ctx.fillRect(initialX, initialY + offsetY, roleImgWidth, roleImgHeigth);
          }
          if ((role[i].RoleName == 'PrimaPunta')) {
            roleImgWidth = imgWidth;
            roleImgHeigth = roleImgWidth * 0.52;
            //ctx.globalAlpha = alpha;
            ctx.fillRect(initialX, initialY, roleImgWidth, roleImgHeigth);
          }
          ctx.globalAlpha = 1;
        }
        //}

        //}
      }
      return new Promise((resolve, reject) => {
        var canvas = document.createElement('canvas');
        canvas.width = perc(100);
        canvas.height = perc(percHeigth);
        var ctx = canvas.getContext("2d");
        var photoImg = new Image();
        self.$store.dispatch('getBase64Image', player.UserImageUrl).then(res => {
          photoImg.src = res.data;
          //photoImg.src = 'https://00e9e64bac01976cfefc6e5c0b20befca1bbaf4a60dff81a77-apidata.googleusercontent.com/download/storage/v1/b/image_repository/o/picture.jpg?qk=AD5uMEv9eprthAjqIOpSbCNYt7FqH-uu1z89CIC9ac6BvAziORdj2VZasQGJ70x3dhd2SVND_nmbj-842JP1HEpqL-33zTMNx8i0MUwELOLCkmyejBD2csYmXWdgY9JzDbS2BDnrbVxvY-rCOwJp1QBjmZhOQaIR3KGCs96bdpE9-ST3jxQ51oD9K6MCEaRuo0c-UPVBfx002b7J0aAMtWknyzq0KIDyFwgywAR-9Ma7KsIaeBhCH8NHG0wl5pRv_D0W_1HysREgXkwX99lfs-XXcnw6kySXNFjFSi_c-qRwKISXsDHmeootaH2q7nwbyD2cCg1lBy3oxiYc0uDpwCZt7oKFIU5cSCDYwTrastv-kOlK6j49SYE1omBkZoTcsXNPi8tten-FWyz3N1PMGV0D_E9rBEQsgIrX-83PtPGiyodWDwjec4ACigCkHl2fZNtkJ22VuctFI12LSa8Qoy_ptUyvm3ZuQmEanTNjMEPqpdtahSzj-1U0RAOqJBhV3lMAAXALfAKrAnBtlQ10ryrM-ycwIVDEPNRkm2ojUk4bJvik1DN0r9mHhIIhBIWqK1_CYlNcZTJgqPlNNGTGjG7c9DUJwgVb87Euaj-6CUGWVjOdqnk9iW2ZVSmHffn9JUTPtcBri_uc99h88y2VnKww6aJi-GTp2akM4mXig3YAwY_1aNvfZZxCoD9W7iLC0KJEXR1oMl47NYoQ2YBUNLSTcbkjTc4Q7XmrlBC7oyEK34CBPP70Zt_kyuqK4Gc--rDn_2KBlvsK';
          photoImg.onload = function() {
            //var imgWidth = perc(30);
            //var imgHeigth = perc(34);
            //var offsetX = perc(3);
            //var offsetY = perc(11);
            var imgWidth = 220;
            var imgHeigth = 370;
            var offsetX = perc(3.5);
            var offsetY = perc(12.5);
            //ctx.strokeStyle = '#fff';
            //ctx.lineWidth = 5;
            //ctx.strokeRect(offsetX, offsetY, imgWidth, imgHeigth);
            var background = new Image();
            background.src = require("../../assets/SchedaBK.jpg");
            background.onload = function() {
              var field = new Image();
              field.src = require("../../assets/CampoFree.png");
              field.onload = function() {
                //ctx.globalAlpha = 0.6;



                //drawRoles(ctx, player.Roles, perc(45), perc(19), perc(10), perc(16));

                ctx.drawImage(photoImg, offsetX, offsetY, imgWidth, imgHeigth);
                ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
                ctx.drawImage(photoImg, offsetX, offsetY, imgWidth, imgHeigth);
                ctx.drawImage(field, 420, 150, 114, 190);
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 5;
                ctx.strokeRect(offsetX, offsetY, imgWidth, imgHeigth);
                writeRoles(ctx, player, 120);
                drawRoles(ctx, player.Roles, 420, 150, 114, 190);
                //writeCategory(ctx, player);
                writePersonalInfo(ctx, player, 900, 150);
                writeName(ctx, player.Name);


                resolve(canvas)
              }
            }
          }
        });
      })
    }
  },




  //background.src = require("../../assets/SchedaBK.jpg");
  //background.onload = function () {
  //  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  //  var startYOffset = perc(13);
  //  var startXOffset = perc(98);
  //  writeRoles(ctx, player, startYOffset);
  //  drawRoles(ctx, player.Roles, perc(45), perc(19), perc(10), perc(16));
  //  writeCategory(ctx, player);
  //  writePersonalInfo(ctx, player, startXOffset, startYOffset);
  //  writeName(ctx, player.Name + ' ' + player.Surname);
  //  //resolve(canvas);
  //  if (player.UserImageUrl) {
  //    var photoImg = new Image();
  //    self.$store.dispatch('getBase64Image', player.UserImageUrl).then(res => {
  //      photoImg.src = res.data;
  //      photoImg.crossOrigin = "Anonymous";
  //      photoImg.setAttribute('crossOrigin', 'anonymous');
  //      photoImg.onload = function () {
  //        photoImg.setAttribute('crossOrigin', 'anonymous');
  //        var imgWidth = perc(21);
  //        var imgHeigth = perc(34);
  //        var offsetX = perc(3);
  //        var offsetY = perc(11);
  //        ctx.drawImage(photoImg, offsetX, offsetY, imgWidth, imgHeigth);
  //        ctx.strokeStyle = '#fff';
  //        ctx.lineWidth = 5;
  //        ctx.strokeRect(offsetX, offsetY, imgWidth, imgHeigth);
  //        resolve(canvas)
  //      }
  //    }).catch(error => {
  //      // alert('Si è verificato un errore');
  //      serverBus.$emit('showLoading', false);
  //    })


  //  } else {
  //   resolve(canvas)
  //  }
  //  }
  //})
  //})
  //  }
  //},
  computed: {
    role: {
      get() {
        return this.playerdata != null && this.playerdata.Roles != null && this.playerdata.Roles.length > 0 ? this.playerdata.Roles[0].RoleName : '';
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
      }
    },
    profile: {
      get() {
        return (this.playerdata != null) ? this.playerdata.Profile : '';
      },
    },
    name: {
      get() {
        return (this.playerdata != null) ? this.playerdata.Name : '';
      },
      set(value) {
        this.playerdata.Name = value;
      }
    },
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
    externalLink: {
      get() {
        return (this.playerdata != null) ? this.playerdata.ExternalLink : '';
      },
      set(value) {
        this.playerdata.ExternalLink = value;
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
        return (this.playerdata != null && this.playerdata.Address != null) ? this.playerdata.Address.FullAddress : '';
      },
      set(value) {
        this.playerdata.Address = {
          FullAddressJson: JSON.stringify(value),
          FullAddress: value.formatted_address,
          Location: null
        };
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
    lastCategory: {
      get() {
        return (this.playerdata != null) ? this.playerdata.LastCategory : '';
      },
      set(value) {
        this.playerdata.LastCategory = value;
      }
    },
    yearClass: {
      get() {
        var returned = ''
        if (this.playerdata != null && this.playerdata.BornDate) {
          var temp = new Date(this.playerdata.BornDate);
          returned = temp.getFullYear()
        }
        return returned;
      },
      set(value) {
        if (this.playerdata.BornDate != null) {
          this.playerdata.BornDate = new Date('01/06/' + value);
        } else {
          this.playerdata.BornDate = new Date('01/01/2000');
        }
      }
    },
    roleSelected: {
      get() {
        if ((this.playerdata != null) && (this.playerdata.Roles != null) && (this.playerdata.Roles.length > 0))
          return this.playerdata.Roles[0].RoleName

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
        else return '';
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


    videoLink: {
      get() {
        if ((this.playerdata != null) && (this.playerdata.Videos != null) && (this.playerdata.Videos.length > 0))
          return this.playerdata.Videos[0].VideoUrl
        else return '';
      },
      set(value) {
        if ((this.playerdata != null) && (this.playerdata.Videos != null) && (this.playerdata.Videos.length > 0))
          return this.playerdata.Videos[0].VideoUrl = value;
        else {
          this.playerdata.Videos = [];
          this.playerdata.Videos.push({
            Id: 0,
            VideoUrl: value
          })
        }
      }
    },
    experience1: {
      get() {
        if ((this.playerdata != null) && (this.playerdata.Experiences != null) && (this.playerdata.Experiences.length > 0))
          return this.playerdata.Experiences[0].TeamName
        else return '';
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
          return '';
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
        else return '';
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

  created() {
    var self = this;
    this.showAddressComponent = false;
    this.myService = playerService;
    this.$store.dispatch('getStatus', {}).then(res => {
      self.statusList = res;

    });

    self.$store.dispatch('getRoleList', {}).then(res1 => {
      self.roleList = res1;
    })
    self.$store.dispatch('getClassList', {}).then(res2 => {
      self.classList = res2;
    })
    self.$store.dispatch('getCategories', {}).then(res3 => {
      self.categoryList = res3;
    })
    this.$store.dispatch('getCountriesList', {}).then(res4 => {
      self.countriesList = res4;
    });
    this.profileLoaded = false;
    serverBus.$emit('showLoading', true);
    this.$store.dispatch('getPlayerProfile', this.$store.state.authentication.user.Id).then(res => {
      this.playerdata = res.data;
      this.profileLoaded = true;
      serverBus.$emit('showLoading', false);
    }).catch(error => {
      // alert('Si è verificato un errore');
      serverBus.$emit('showLoading', false)
    });

  },
}
</script>
<style>
.md-menu-content.md-select-menu {
  z-index: 100;
}

@font-face {
  font-family: 'uni_sansheavy_caps';
  src: url('../../public/fonts/unisansheavy/unisansheavy-webfont.woff2') format('woff2'), url('../../public/fonts/unisansheavy/unisansheavy-webfont.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

.dark-theme {
  background-color: rgba(255, 255, 255, .1) !important;
}
</style>
