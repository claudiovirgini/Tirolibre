<template>
<div class="botui-app-container" id="home-bot">
  <bot-ui></bot-ui>
  <!-- <button type="button">
    <router-link :to="{ path: '/result', query: { id: 'repo.Id', ciao: 'dede' }}">
      Result
    </router-link>
  </button> -->
</div>
</template>

<script>
import {
  EventBus
} from '../event-bus'
import BotUI from 'botui'

import initBotApp from '../chatbot'
export default {
  name: 'BotUI',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      q1: '',
      q2: '',
      title: 'Vue Ninjas',
    }
  },
  mounted() {
    initBotApp()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.botui-app-container {
    margin-top: 10px !important;
    box-shadow: 0 19px 38px rgba(0,0,0,0.3), 0 15px 12px rgba(0,0,0,0.22);
    height: 450px !important;
    text-align: left;
    width: 100% !important;
}
.botui-actions-buttons-button {
    background: red !important;
}

.botui-container {}

.botui-messages-container {}

.botui-actions-container {}

.botui-message {}

.botui-message-content {

    &.human {}

    &.text {}

    &.embed {}
}

.botui-message-content-link {
    color: #FFF;
}

.botui-actions-text-input {}

.botui-actions-text-submit {
    background: red !important;

}

.botui-actions-buttons-button {}
</style>
