<script>
import Vue from 'vue'
import axios from 'axios'
  export default {
    getListaCategorie: function () {
      let listaCategorieCerca = [{
        Value: "",
        imgPath: "",
        isSelected: false
      },
      {
        Value: 'Seria A',
        imgPath: require("../assets/logo serie/Serie A.png")
      },
      {
        Value: 'Serie B',
        imgPath: require("../assets/logo serie/Serie B.png")
      },
      {
        Value: 'Serie C',
        imgPath: require("../assets/logo serie/Serie C.png")
      },
      {
        Value: 'Serie D',
        imgPath: require("../assets/logo serie/SerieD.png")
      },
      {
        Value: "Eccellenza",
        imgPath: require("../assets/logo serie/Eccellenza.png")
      },
      {
        Value: "Promozione",
        imgPath: require("../assets/logo serie/Promozione.png")
      },
      {
        Value: "Prima Categoria",
        imgPath: require("../assets/logo serie/PrimaCategoria.png")
      },
      {
        Value: "Seconda Categoria",
        imgPath: require("../assets/logo serie/SecondaCategoria.png")
      },
      {
        Value: "Terza Categoria",
        imgPath: require("../assets/logo serie/TerzaCategoria.png")
      },
      {
        Value: "Juniores",
        imgPath: require("../assets/logo serie/juniores.png")
      },
      {
        Value: "Primavera",
        imgPath: require("../assets/logo serie/primavera.png")
      },
      {
        Value: "Allievi Nazionali",
        imgPath: require("../assets/logo serie/allievi.png")
      }
        //{ Value: "Scuola calcio", imgPath: "", isSelected: false },
      ];
      return listaCategorieCerca;
    },
    getRoleList: function () {
      let roleRilst = [];
      roleRilst.push({ text: 'Tutti i ruoli', value: -1 });
      roleRilst.push({ text: 'Portiere', value: 1 });
      roleRilst.push({ text: 'Centrale Destro', value: 2 });
      roleRilst.push({ text: 'Centrale Sinistro', value: 3 });
      roleRilst.push({ text: 'Terzino Destro', value: 4 });
      roleRilst.push({ text: 'Terzino Sinistro', value: 5 });
      roleRilst.push({ text: 'Ala Destra', value: 6 });
      roleRilst.push({ text: 'Ala Sinistra', value: 7 });
      roleRilst.push({ text: 'Mediano', value: 8 });
      roleRilst.push({ text: 'Centrocampista', value: 9 });
      roleRilst.push({ text: 'Seconda Punta', value: 10 });
      roleRilst.push({ text: 'Prima Punta', value: 11 });
      return roleRilst;
    },

    searchUser(rootApiUrl, profile, addressInfo, playerInfo, teamInfo, agentInfo) {
      const findUserUrl = '/api/Player/FindUserNew';
      //addressInfo = { double? lat,double? lng,int? Radius}
      //playerInfo = { PlayerRole? Role, Category? Category, int? Class, PlayerStatus? Status }
      //teamInfo = {  Category? Category }
      //agentInfo = {  }
      const param = {
        Profile: profile,
        AddressDetail: addressInfo,
        PlayerDetail: playerInfo,
        TeamDetail: teamInfo,
        AgentDetail: agentInfo,
      }
      return axios.post(rootApiUrl + findUserUrl, param);
    },
    renderCardImage: function (rootApiUrl, player, width, percHeigth) {
      var fontName = 'uni_sansheavy_caps';
      //var fontName = 'Acme';

      function getBase64Image(imageUrl) {
        const getBase64ImageUrl = '/api/Cdn/GetBase64Image';
        const data = {
          ImageUrl: imageUrl
        }
        return axios.post(rootApiUrl + getBase64ImageUrl, data);
      }

      function writeName(ctx, name) {
        ctx.font = "45px " + fontName;
        ctx.fillStyle = "#133264";
        ctx.textAlign = "start";
        ctx.shadowColor = null;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.shadowBlur = 0;
        ctx.fillText(name, perc(5), perc(6), perc(100));
      }

      function writeExperiences(ctx, player, startXOffset, startYOffset, yOffset) {

        ctx.font = "26px " + fontName;
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
        ctx.font = "30px " + fontName;
      }

      function filterDate(value) {
        return moment(String(value)).format('MM/DD/YYYY hh:mm')
        //return value;
      }

      function writePersonalInfo(ctx, player, startWidth, startHeigth) {
        var yOffset = 45;
        ctx.textAlign = "end";
        ctx.font = ctx.font = "30px " + fontName;
        ctx.shadowColor = "black" // string
        ctx.shadowOffsetX = 5;
        ctx.shadowOffsetY = 5;
        ctx.shadowBlur = 7;
        ctx.fillStyle = "white";
        if (player.BornDate != null)  ctx.fillText('CLASSE : ' + (new Date(player.BornDate)).getFullYear(), startWidth, startHeigth) ;
        if (player.Weigth > 0) ctx.fillText('PESO : ' + player.Weigth + ' KG', startWidth, startHeigth + yOffset);
        if (player.Heigth > 0) ctx.fillText('ALTEZZA : ' + player.Heigth + ' cm', startWidth, startHeigth + (2 * yOffset));
        if (player.ActualStatus != null && player.ActualStatus != '') ctx.fillText('STATUS : ' + player.ActualStatus, startWidth, startHeigth + (3 * yOffset));

        //if (player.ResearchPlaces[0]) ctx.fillText('AREA DI RICERCA : ' + player.ResearchPlaces[0].Value, startWidth, startHeigth + (4 * yOffset));

        if ((player.Experiences[0]) || (player.Experiences[1]) || (player.Experiences[2]))
          ctx.fillText('ESPERIENZE:', startWidth, startHeigth + (5 * yOffset + 15));
        writeExperiences(ctx, player, startWidth, startHeigth + (5 * yOffset + 30) + 10, yOffset);
        ctx.textAlign = "center";
        //ctx.fillText('CERCA IN : ', 420, 400);
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
        function writeRole(roleName, color) {
          ctx.globalAlpha = 1;
          ctx.font = "33px " + fontName;
          ctx.strokeStyle = color;
          ctx.strokeText(roleName, 420, 135);
          ctx.fillStyle = "white";
          ctx.fillText(roleName, 420, 135);
          ctx.font = "33px " + fontName;
        }
        var field = new Image();
        ctx.lineWidth = 6.5;
        ctx.textAlign = "center";
        ctx.globalAlpha = 1;
        for (let i = 0; i < 1; i++) {
          if (role[i].RoleName == 'Portiere') {
            writeRole(role[i].RoleName, "#00a2e8");
            ctx.globalAlpha = 0.7;
            ctx.fillStyle = "#00a2e8";
            ctx.fillRect(initialX + (0.25 * imgWidth), initialY + (0.82 * imgHeigth), imgWidth * 0.5, imgHeigth * 0.175);
          }
          if ((role[i].RoleName == 'Centrale Sinistro') || (role[i].RoleName == 'Centrale Destro')) {
            writeRole(role[i].RoleName, "#00a2e8");
            ctx.globalAlpha = 0.7;
            ctx.fillStyle = "#00a2e8"
            ctx.beginPath();
            ctx.moveTo(initialX, initialY + imgHeigth - 65);
            ctx.lineTo(initialX + imgWidth, initialY + imgHeigth - 65);
            ctx.lineTo(initialX + imgWidth, initialY + imgHeigth);
            ctx.lineTo(initialX, initialY + imgHeigth);
            ctx.lineTo(initialX + 84, initialY + imgHeigth);
            ctx.lineTo(initialX + 84, initialY + imgHeigth - 34);
            ctx.lineTo(initialX + 33, initialY + imgHeigth - 34);
            ctx.lineTo(initialX + 33, initialY + imgHeigth);
            ctx.lineTo(initialX, initialY + imgHeigth);
            ctx.fill();
          }
          if ((role[i].RoleName == 'Terzino Sinistro')) {
            writeRole(role[i].RoleName, "#00a2e8");
            ctx.globalAlpha = 0.7;
            ctx.fillStyle = "#00a2e8"

            ctx.fillRect(initialX, initialY + roleImgHeigth, 0.26 * imgWidth + 2, imgHeigth / 2);
          }
          if ((role[i].RoleName == 'Terzino Destro')) {
            writeRole(role[i].RoleName, "#00a2e8");
            ctx.globalAlpha = 0.7;
            ctx.fillStyle = "#00a2e8"
            let roleImgWidth = 0.26 * imgWidth;
            let roleImgHeigth = imgHeigth / 2;
            ctx.fillRect(initialX + imgWidth - roleImgWidth, initialY + roleImgHeigth, roleImgWidth, roleImgHeigth);
          }
          if ((role[i].RoleName == 'Ala Destra')) {
            writeRole(role[i].RoleName, "#f3be1b");
            ctx.globalAlpha = 0.7;
            ctx.fillStyle = "#f3be1b"
            let roleImgWidth = 0.26 * imgWidth;
            let roleImgHeigth = imgHeigth;
            ctx.fillRect(initialX + imgWidth - roleImgWidth, initialY, roleImgWidth, roleImgHeigth);
          }
          if ((role[i].RoleName == 'Ala Sinistra')) {
            writeRole(role[i].RoleName, "#f3be1b");
            ctx.globalAlpha = 0.7;
            ctx.fillStyle = "#f3be1b"
            let roleImgWidth = 0.26 * imgWidth;
            let roleImgHeigth = imgHeigth;
            ctx.fillRect(initialX, initialY, roleImgWidth + 2, roleImgHeigth);
          }
          if ((role[i].RoleName == 'Centrocampista') || (role[i].RoleName == 'Mediano')) {
            //              writeRole(role[i].RoleName, "#b5e61d");
            writeRole(role[i].RoleName, "#ccad02");
            ctx.globalAlpha = 0.7;
            ctx.fillStyle = "#ccad02"
            ctx.fillRect(initialX, initialY + (imgHeigth / 2) - 23, imgWidth, 45);
          }
          if ((role[i].RoleName == 'Seconda Punta') || (role[i].RoleName == 'Prima Punta')) {
            writeRole(role[i].RoleName, "#ac0202");
            ctx.globalAlpha = 0.7;
            ctx.fillStyle = "#ac0202"
            ctx.beginPath();
            ctx.moveTo(initialX, initialY + 65);
            ctx.lineTo(initialX + imgWidth, initialY + 65);
            ctx.lineTo(initialX + imgWidth, initialY);
            ctx.lineTo(initialX, initialY);
            ctx.lineTo(initialX + 84, initialY);
            ctx.lineTo(initialX + 84, initialY + 34);
            ctx.lineTo(initialX + 33, initialY + 34);
            ctx.lineTo(initialX + 33, initialY);
            ctx.lineTo(initialX, initialY);
            ctx.fill();
          }

        }
        ctx.shadowColor = "black" // string
        ctx.shadowOffsetX = 5;
        ctx.shadowOffsetY = 5;
        ctx.shadowBlur = 7;
        ctx.fillStyle = "white";
        ctx.globalAlpha = 1;
        ctx.fillText('CERCA IN : ', 425, 410);
      }

      function getCategoryImagePath(ctx, player) {
        let listaCategorieCerca = [{
          Value: "",
          imgPath: "",
          isSelected: false
        },
        {
          Value: 'Seria A',
          imgPath: require("../assets/logo serie/Serie A.png")
        },
        {
          Value: 'Serie B',
          imgPath: require("../assets/logo serie/Serie B.png")
        },
        {
          Value: 'Serie C',
          imgPath: require("../assets/logo serie/Serie C.png")
        },
        {
          Value: 'Serie D',
          imgPath: require("../assets/logo serie/SerieD.png")
        },
        {
          Value: "Eccellenza",
          imgPath: require("../assets/logo serie/Eccellenza.png")
        },
        {
          Value: "Promozione",
          imgPath: require("../assets/logo serie/Promozione.png")
        },
        {
          Value: "Prima Categoria",
          imgPath: require("../assets/logo serie/PrimaCategoria.png")
        },
        {
          Value: "Seconda Categoria",
          imgPath: require("../assets/logo serie/SecondaCategoria.png")
        },
        {
          Value: "Terza Categoria",
          imgPath: require("../assets/logo serie/TerzaCategoria.png")
        },
        {
          Value: "Juniores",
          imgPath: require("../assets/logo serie/juniores.png")
        },
        {
          Value: "Primavera",
          imgPath: require("../assets/logo serie/primavera.png")
        },
        {
          Value: "Allievi Nazionali",
          imgPath: require("../assets/logo serie/allievi.png")
        }
          //{ Value: "Scuola calcio", imgPath: "", isSelected: false },
        ];
        var returned = [];
        if (player.Divisions[0]) {
          if ((player.Divisions[0].Name != null) && (player.Divisions[0].Name != '') && (player.Divisions[0].Name != ' ')) {
            let temp1 = listaCategorieCerca.filter(function (x) { return x.Value == player.Divisions[0].Name });
            try {
              if (temp1.length > 0) {
                let ff = temp1[0].imgPath;
                returned.push(ff);
              }
            }
            catch (exc) { }
            if (player.Divisions[1]) {
              if ((player.Divisions[1].Name != null) && (player.Divisions[1].Name != '') && (player.Divisions[1].Name != ' ')) {
                let temp1 = listaCategorieCerca.filter(function (x) { return x.Value == player.Divisions[1].Name });
                try {
                  if (temp1.length > 0) {
                    let ff = temp1[0].imgPath;
                    returned.push(ff);
                  }
                }
                catch (exc) { }
              }
            }
          }
        }

        return returned;
      }
      return new Promise((resolve, reject) => {
        var categoryImage1 = null;
        var categoryImage2 = null;

        function finalFunction() {

          getBase64Image(player.UserImageUrl).then(res => {
            photoImg.src = res.data;
            photoImg.onload = function () {
              var imgWidth = 220;
              var imgHeigth = 370;
              var offsetX = perc(3.5);
              var offsetY = perc(12.5);
              var background = new Image();
              background.src = require("../assets/SchedaBK.jpg");
              background.onload = function () {
                var field = new Image();
                field.src = require("../assets/CampoFree.png");
                field.onload = function () {
                  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
                  ctx.drawImage(photoImg, offsetX, offsetY, imgWidth, imgHeigth);
                  ctx.drawImage(field, 360, 165, 115, 200);
                  if (categoryImage1 != null) ctx.drawImage(categoryImage1, 330, 430, 80, 80);
                  if (categoryImage2 != null) ctx.drawImage(categoryImage2, 420, 430, 80, 80);
                  ctx.strokeStyle = '#fff';
                  ctx.lineWidth = 5;
                  //ctx.strokeRect(offsetX, offsetY, imgWidth, imgHeigth);
                  //writeRoles(ctx, player, 140);
                  drawRoles(ctx, player.Roles, 360, 165, 115, 200);
                  //writeCategory(ctx, player);
                  writePersonalInfo(ctx, player, 920, 130);
                  writeName(ctx, player.Name);
                  resolve(canvas)
                }
              }
            }
          });
        }


        var canvas = document.createElement('canvas');
        canvas.width = perc(100);
        canvas.height = perc(percHeigth);
        var ctx = canvas.getContext("2d");
        ctx.font = "40px " + fontName;
        var photoImg = new Image();
        var categoryImagePathList = getCategoryImagePath(ctx, player)
        try {
          if (categoryImagePathList.length > 0) {
            categoryImage1 = new Image();
            categoryImage1.src = categoryImagePathList[0];
            categoryImage1.onload = function () {
              if (categoryImagePathList.length > 1) {
                categoryImage2 = new Image();
                categoryImage2.src = categoryImagePathList[1];
                categoryImage2.onload = function () {
                  finalFunction();
                }
              } else {
                finalFunction();
              }
            }
          } else {
            finalFunction();
          }
        } catch (exc) {
          alert(exc)
        }

      })
    }
  }
      </script>
