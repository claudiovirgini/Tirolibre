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

  }
</script>
