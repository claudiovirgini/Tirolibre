<script>
  import Vue from 'vue'
  import axios from 'axios'
  export default {
    getPlayerProfile(rootApiUrl,playerId) {
        const getPlayerInfoUrl = '/api/Player/GetPlayerInfo';
        const data = { PlayerId: playerId }
      return axios.post(rootApiUrl + getPlayerInfoUrl, data);
    },
    savePlayerProfile(rootApiUrl, player) {
      const savePlayerInfoUrl = '/api/Player/SavePlayerInfo';
      const data = { Player: player }
      return axios.post(rootApiUrl + savePlayerInfoUrl, data);
    },
    getBase64Image(rootApiUrl,imageUrl) {
      const getBase64ImageUrl = '/api/Player/GetBase64Image';
      const data = { ImageUrl: imageUrl }
      return axios.post(rootApiUrl + getBase64ImageUrl, data);
    },
    renderCardImage: function (rootApiUrl, player, width, percHeigth) {
      function getBase64Image(imageUrl) {
        const getBase64ImageUrl = '/api/Player/GetBase64Image';
        const data = { ImageUrl: imageUrl }
        return axios.post(rootApiUrl + getBase64ImageUrl, data);
      }
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
          key: "Centrale Sinistro",
          MapColor: "3d69e5",
          imgPath: "/images/components/Roles/evidenza/centraledifesa.png"
        },
        {
          nameToDisplay: "Centrale Destro",
          IsSelected: false,
          key: "Centrale Destro",
          MapColor: "3d69e5",
          imgPath: "/images/components/Roles/evidenza/centraledifesa.png"
        },
        {
          nameToDisplay: "Terzino Sinistro",
          IsSelected: false,
          key: "Terzino Sinistro",
          MapColor: "00ff00",
          imgPath: "/images/components/Roles/evidenza/TerzinoSX.png"
        },
        {
          nameToDisplay: "Terzino Destro",
          IsSelected: false,
          key: "Terzino Destro",
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
          key: "Ala Sinistra",
          MapColor: "f89d1b",
          imgPath: "/images/components/Roles/Evidenza/AlaSX.png"
        },
        {
          nameToDisplay: "Ala Destra",
          IsSelected: false,
          key: "Ala Destra",
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
          key: "Seconda Punta",
          MapColor: "b80d0d",
          imgPath: "/images/components/Roles/evidenza/SecondaPunta.png"
        },
        {
          nameToDisplay: "PrimaPunta",
          IsSelected: false,
          key: "Prima Punta",
          MapColor: "b80d0d",
          imgPath: "/images/components/Roles/evidenza/Attaccante.png"
        }
        ];
        for (var i = 0; i < listaRuoli.length; i++) {
          if (listaRuoli[i].key == key) {
            var returned = (listaRuoli[i]);
            return returned;
          }
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
              photo0.onload = function () {
                ctx.drawImage(photo0, xOffset, yOffset, imgWidth, imgWidth);
                xOffset = xOffset + 85;
                if (player.Divisions[1]) {
                  var divisionToSearch1 = player.Divisions[1].Name;
                  var index1 = 0;
                  do {
                    if (listaCategorieCerca[index1].Value == divisionToSearch1) {
                      var photo1 = new Image();
                      photo1.src = listaCategorieCerca[index1].imgPath;
                      photo1.onload = function () {
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
        getBase64Image(player.UserImageUrl).then(res => {
          photoImg.src = res.data;
          photoImg.onload = function () {
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
            background.src = require("../assets/SchedaBK.jpg");
            background.onload = function () {
              var field = new Image();
              field.src = require("../assets/CampoFree.png");
              field.onload = function () {
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
   
  }
</script>
