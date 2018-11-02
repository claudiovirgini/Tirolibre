<script>
  import Vue from 'vue'
  import axios from 'axios'
  export default {
    searchUser(rootApiUrl, profile, addressInfo,playerInfo,teamInfo,agentInfo) {
      const findUserUrl = '/api/Player/FindUserNew';
      //addressInfo = { double? lat,double? lng,int? Radius}
      //playerInfo = { PlayerRole? Role, Category? Category, int? Class, PlayerStatus? Status }
      //teamInfo = {  Category? Category }
      //agentInfo = {  }
      //const data = {
      const  param = {
          Profile: profile,
          AddressDetail: addressInfo,
          PlayerDetail: playerInfo,
          TeamDetail: teamInfo,
          AgentDetail: agentInfo,
        }
      //}
      return axios.post(rootApiUrl + findUserUrl, param);
    },
    savePlayerProfile(rootApiUrl, player) {
      const savePlayerInfoUrl = '/api/Player/SavePlayerInfo';
      const data = { Player: player }
      return axios.post(rootApiUrl + savePlayerInfoUrl, data);
    },


  }
</script>
