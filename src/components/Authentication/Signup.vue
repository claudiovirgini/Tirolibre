<template>
<div class="cd-form">
  <p class="fieldset">
    <label class="image-replace cd-username" for="signup-username">Nome</label>
    <input class="full-width has-padding has-border" id="signup-username" v-model="name" type="text" placeholder="Nome">
    <span class="cd-error-message">Error message here!</span>
  </p>
  <p class="fieldset" v-if="profile == 0 || profile == 2">
    <label class="image-replace cd-username" for="signup-username">Cognome</label>
    <input class="full-width has-padding has-border" id="signup-username" v-model="surname" type="text" placeholder="Cognome">
    <span class="cd-error-message">Error message here!</span>
  </p>
  <p class="fieldset">
    <label class="image-replace cd-email" for="signup-email">E-mail</label>
    <input class="full-width has-padding has-border" id="signup-email" type="email" v-model="email" placeholder="E-mail">
    <span class="cd-error-message">Error message here!</span>
  </p>

  <p class="fieldset">
    <label class="image-replace cd-password" for="signup-password">Password</label>
    <input class="full-width has-padding has-border" id="signup-password" :type="passwordFieldType" v-model="password" placeholder="Password">
    <a href="#0" class="hide-password" @click="switchVisibility"><i class="fas" :class="[passwordIcon]" @click="hidePassword = !hidePassword"></i></a>
    <!-- <button type="password" @click="switchVisibility">show / hide</button> -->
    <span class="cd-error-message">Error message here!</span>
  </p>

  <p class="fieldset">

    <div class="type">
      <div class="buttons">
        <div class="switch-field">
          <div class="switch-content player form-check form-check-inline">
            <input type="radio" id="switch_3_left" name="who" value="0" v-model="profile" class="form-check-input" checked />
            <label for="switch_3_left" class="calciatore form-check-label">calciatore</label>
          </div>
          <div class="switch-content club form-check form-check-inline">
            <input type="radio" id="switch_3_center" name="who" value="1" v-model="profile" class="form-check-input" />
            <label for="switch_3_center" class="calciatore form-check-label">team</label>
          </div>
          <div class="switch-content agent form-check form-check-inline">
            <input type="radio" id="switch_3_right" name="who" value="2" v-model="profile" class="form-check-input" />
            <label for="switch_3_right" class="calciatore form-check-label">agente</label>
          </div>
        </div>
      </div>
    </div>
  </p>
  <p class="fieldset terms">
    <md-checkbox v-model="terms">Accetto i </md-checkbox><a href="https://app.termly.io/document/terms-of-use-for-saas/a53abb66-f8fa-4c05-bac5-528c8dac29ce" target="_self">Termini e Condizioni</a>
  </p>

  <p class="fieldset">
    <input class="full-width has-padding" type="submit" value="Crea account" :disabled="!terms" @click="signup()">
  </p>
</div>

<!-- <a href="#0" class="cd-close-form">Close</a> -->
</template>
<script>
import Vue from 'vue'
import {
  serverBus
} from '@/main';


export default {
  name: 'Signup',
  data() {
    return {
      name: '',
      surname: '',
      email: '',
      profile: 0,
      passwordFieldType: 'password',
      password: '',
      hidePassword: true,
      terms: ''
    }
  },
  methods: {
    signup: function(email, pwd) {
      const formData = {
        email: email,
        pwd: pwd,
      }
      serverBus.$emit('showLoading', true);
      this.$store.dispatch('signup', {
          email: this.email,
          password: this.password,
          name: this.name,
          profile: this.profile,
          surname: this.surname
        })
        .then(res => {
          serverBus.$emit('showLoading', false);
          alert("Ti abbiamo inviato una mail per attivarti")
        }).catch(error => alert('Si è verificato un errore'));
    },
    switchVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
    }
  },
  computed: {
    passwordIcon() {
      return this.hidePassword ? 'fa-eye-slash' : 'fa-eye'
    }
  }
}
</script>
<style scoped lang="scss">
.switch-content.player {
    label {
        &:before {
            background-image: url("../../assets/images/player.png");
        }

    }
}

.switch-content.club {
    label {
        &:before {
            background-image: url("../../assets/images/club.png");
        }

    }
}

.switch-content.agent {
    label {
        &:before {
            background-image: url("../../assets/images/agent.png");
        }

    }
}
.terms {
    .md-checkbox {
        margin-right: 5px;
    }
    a {
        margin-top: 15px;
        display: inline-block;
        vertical-align: top;
        color: #75849a !important;
        text-decoration: underline;
    }
}
header[role=banner] {
    position: relative;
    height: 50px;
    background: transparent;
    #cd-logo {
        float: left;
        margin: 4px 0 0 5%;
        /* reduce logo size on mobile and make sure it is left aligned with the transform-origin property */
        -webkit-transform-origin: 0 50%;
        -moz-transform-origin: 0 50%;
        -ms-transform-origin: 0 50%;
        -o-transform-origin: 0 50%;
        transform-origin: 0 50%;
        -webkit-transform: scale(0.8);
        -moz-transform: scale(0.8);
        -ms-transform: scale(0.8);
        -o-transform: scale(0.8);
        transform: scale(0.8);
        a {
            color: #212121;
        }

        img {
            display: block;
        }

    }

    &:after {
        /* clearfix */
        content: '';
        display: table;
        clear: both;
    }

}

.switch-field {
    padding: 30px 0 !important;
}

@media only screen and (min-width: 768px) {
    header[role=banner] {
        height: 60px;
        background-color: #FFF;
        #cd-logo {
            margin: 20px 0 0 5%;
            -webkit-transform: scale(1);
            -moz-transform: scale(1);
            -ms-transform: scale(1);
            -o-transform: scale(1);
            transform: scale(1);
        }

    }
}

@media only screen and (min-width: 768px) {
    .main-nav {
        width: auto;
        height: auto;
        background: none;
        cursor: pointer;
        ul {
            position: static;
            width: auto;
            -webkit-transform: translateY(0);
            -moz-transform: translateY(0);
            -ms-transform: translateY(0);
            -o-transform: translateY(0);
            transform: translateY(0);
            line-height: 60px;
        }

        ul.is-visible {
            -webkit-transform: translateY(0);
            -moz-transform: translateY(0);
            -ms-transform: translateY(0);
            -o-transform: translateY(0);
            transform: translateY(0);
        }

        li {
            display: inline-block;
            margin-left: 1em;
        }

        li:nth-last-child(2) {
            margin-left: 2em;
        }

        a {
            display: inline-block;
            height: auto;
            line-height: normal;
            background: transparent;
            color: rgba(0, 0, 0, 0.5) !important;
        }

    }

    .main-nav a.cd-signin,
    .main-nav a.cd-signup {
        padding: 0.6em 1em;
        border: 1px solid rgba(0, 0, 0, 0.5);
        border-radius: 50em;
        &:hover {
            color: rgba(0, 0, 0, 0.5) !important;
        }

    }

    .main-nav a.cd-signup {
        background: #088039;
        color: #FFF !important;
        border: none;
        &:hover {
            color: #FFF !important;
        }

    }

    .main-nav a.cd-signin {
        color: rgba(0, 0, 0, 0.5);
    }

}
/* --------------------------------

  xsigin/signup popup

  -------------------------------- */
.cd-user-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(52, 54, 66, 0.9);
    z-index: 3;
    overflow-y: auto;
    cursor: pointer;
    visibility: hidden;
    opacity: 0;
    -webkit-transition: opacity 0.3s 0, visibility 0 0.3s;
    -moz-transition: opacity 0.3s 0, visibility 0 0.3s;
    transition: opacity 0.3s 0, visibility 0 0.3s;
}

.cd-user-modal.is-visible {
    visibility: visible;
    opacity: 1;
    -webkit-transition: opacity 0.3s 0, visibility 0 0;
    -moz-transition: opacity 0.3s 0, visibility 0 0;
    transition: opacity 0.3s 0, visibility 0 0;
}

.cd-user-modal.is-visible .cd-user-modal-container {
    -webkit-transform: translateY(0);
    -moz-transform: translateY(0);
    -ms-transform: translateY(0);
    -o-transform: translateY(0);
    transform: translateY(0);
}

.cd-user-modal-container {
    position: relative;
    width: 90%;
    max-width: 600px;
    background: #FFF;
    margin: 3em auto 4em;
    cursor: auto;
    border-radius: 0.25em;
    -webkit-transform: translateY(-30px);
    -moz-transform: translateY(-30px);
    -ms-transform: translateY(-30px);
    -o-transform: translateY(-30px);
    transform: translateY(-30px);
    -webkit-transition-property: -webkit-transform;
    -moz-transition-property: -moz-transform;
    transition-property: transform;
    -webkit-transition-duration: 0.3s;
    -moz-transition-duration: 0.3s;
    transition-duration: 0.3s;
}

.cd-user-modal-container .cd-switcher::after {
    clear: both;
    content: "";
    display: table;
}

.cd-user-modal-container .cd-switcher li {
    width: 50%;
    float: left;
    text-align: center;
    list-style: none;
}

.cd-user-modal-container .cd-switcher li:first-child a {
    border-radius: 0.25em 0 0 0;
}

.cd-user-modal-container .cd-switcher li:last-child a {
    border-radius: 0 0.25em 0 0;
}

.cd-user-modal-container .cd-switcher a {
    display: block;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #d2d8d8;
    color: #809191;
    &:hover {
        color: #809191 !important;
    }

}

.cd-user-modal-container .cd-switcher a.selected {
    background: #FFF;
    color: #505260;
    &:hover {
        color: #505260 !important;
    }

}

@media only screen and (min-width: 600px) {
    .cd-user-modal-container {
        margin: 4em auto;
    }

    .cd-user-modal-container .cd-switcher a {
        height: 70px;
        line-height: 70px;
    }
}

.cd-form {
    padding: 1.4em;
}

.cd-form .fieldset {
    position: relative;
    margin: 1.4em 0;
}

.cd-form .fieldset:first-child {
    margin-top: 0;
}

.cd-form .fieldset:last-child {
    margin-bottom: 0;
}

.cd-form label {
    font-size: 14px;
    font-size: 0.875rem;
}

.cd-form label.image-replace {
    /* replace text with an icon */
    display: inline-block;
    position: absolute;
    left: 15px;
    top: 50%;
    bottom: auto;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
    height: 20px;
    width: 20px;
    overflow: hidden;
    text-indent: 100%;
    white-space: nowrap;
    color: transparent;
    text-shadow: none;
    background-repeat: no-repeat;
    background-position: 50% 0;
}

.cd-form label.cd-username {
    background-image: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/148866/cd-icon-username.svg");
}

.cd-form label.cd-email {
    background-image: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/148866/cd-icon-email.svg");
}

.cd-form label.cd-password {
    background-image: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/148866/cd-icon-password.svg");
}

.cd-form input {
    margin: 0;
    padding: 0;
    border-radius: 0.25em;
}

.cd-form input.full-width {
    width: 100%;
}

.cd-form input.has-padding {
    padding: 12px 20px 12px 50px;
}

.cd-form input.has-border {
    border: 1px solid #d2d8d8;
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    -o-appearance: none;
    appearance: none;
}

.cd-form input.has-border:focus {
    border-color: #343642;
    box-shadow: 0 0 5px rgba(52, 54, 66, 0.1);
    outline: none;
}

.cd-form input.has-error {
    border: 1px solid #d76666;
}

.cd-form input[type=password] {
    /* space left for the HIDE button */
    padding-right: 65px;
}

.cd-form input[type=submit] {
    padding: 16px 0;
    cursor: pointer;
    background: #088039;
    color: #FFF;
    font-weight: bold;
    border: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    -o-appearance: none;
    appearance: none;
}

.no-touch .cd-form input[type=submit]:focus,
.no-touch .cd-form input[type=submit]:hover {
    background: #3599ae;
    outline: none;
}

.cd-form .hide-password {
    display: inline-block;
    position: absolute;
    right: 0;
    top: 0;
    padding: 6px 15px;
    border-left: 1px solid #d2d8d8;
    top: 50%;
    bottom: auto;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
    font-size: 14px;
    font-size: 0.875rem;
    color: #343642;
}

.cd-form .cd-error-message {
    display: inline-block;
    position: absolute;
    left: -5px;
    bottom: -35px;
    background: rgba(215, 102, 102, 0.9);
    padding: 0.8em;
    z-index: 2;
    color: #FFF;
    font-size: 13px;
    font-size: 0.8125rem;
    border-radius: 0.25em;
    /* prevent click and touch events */
    pointer-events: none;
    visibility: hidden;
    opacity: 0;
    -webkit-transition: opacity 0.2s 0, visibility 0 0.2s;
    -moz-transition: opacity 0.2s 0, visibility 0 0.2s;
    transition: opacity 0.2s 0, visibility 0 0.2s;
}

.cd-form .cd-error-message::after {
    /* triangle */
    content: '';
    position: absolute;
    left: 22px;
    bottom: 100%;
    height: 0;
    width: 0;
    border-bottom: 8px solid rgba(215, 102, 102, 0.9);
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
}

.cd-form .cd-error-message.is-visible {
    opacity: 1;
    visibility: visible;
    -webkit-transition: opacity 0.2s 0, visibility 0 0;
    -moz-transition: opacity 0.2s 0, visibility 0 0;
    transition: opacity 0.2s 0, visibility 0 0;
}

@media only screen and (min-width: 600px) {
    .cd-form {
        padding: 2em;
    }

    .cd-form .fieldset {
        margin: 2em 0;
    }

    .cd-form .fieldset:first-child {
        margin-top: 0;
    }

    .cd-form .fieldset:last-child {
        margin-bottom: 0;
    }

    .cd-form input.has-padding {
        padding: 16px 20px 16px 50px;
    }

    .cd-form input[type=submit] {
        padding: 16px 0;
    }
}

.cd-form-message {
    padding: 1.4em 1.4em 0;
    font-size: 14px;
    font-size: 0.875rem;
    line-height: 1.4;
    text-align: center;
}

@media only screen and (min-width: 600px) {
    .cd-form-message {
        padding: 2em 2em 0;
    }
}

.cd-form-bottom-message {
    position: absolute;
    width: 100%;
    left: 0;
    // bottom: -30px;
    text-align: center;
    font-size: 14px;
    font-size: 0.875rem;
}

.cd-form-bottom-message a {
    color: #FFF !important;
    text-decoration: underline;
}

.cd-close-form {
    /* form X button on top right */
    display: block;
    position: absolute;
    width: 40px;
    height: 40px;
    right: 0;
    top: -40px;
    background: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/148866/cd-icon-close.svg") no-repeat center center;
    text-indent: 100%;
    white-space: nowrap;
    overflow: hidden;
}

@media only screen and (min-width: 1170px) {
    .cd-close-form {
        display: none;
    }
}

#cd-login,
#cd-reset-password,
#cd-signup {
    display: none;
}

#cd-login.is-selected,
#cd-reset-password.is-selected,
#cd-signup.is-selected {
    display: block;
}

// .switch-field input:checked + label {
.switch-field label {
    position: relative;
}

// .switch-field input:checked + label:before {
.switch-field label:before {
    content: '';
    width: 100%;
    height: 100px;
    left: 0;
    right: 0;
    position: absolute;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    bottom: 40px;
}

.switch-content {
    height: 20px;
    margin-bottom: 50px;
    margin-top: 60px;
    padding-bottom: 0;
    padding-top: 40px;
    border-radius: 5px;
    box-shadow: 0 1rem 3rem rgba(0,0,0,.175);
}

.switch-field,
.switch-field-input {
    padding: 10px 0;
    overflow: hidden;
    label {
        margin: 15px 30px;
    }

}

.switch-content-input {
    margin-top: 20px;
    input {
        border-radius: 50px;
        // border: 2px solid #01a084;
        // margin-left: 60px;
        background-color: #FFF;
        padding: 10px;
        width: 40%;
    }

    button {
        background: #01a084;
        border: 2px solid #01a084;
        color: #FFF;
    }

}

.switch-title {
    text-align: center;
    font-weight: bold;
    font-size: 22px;
    text-transform: uppercase;
}

.type {
    .switch-content {
        background: #c0d6bb;
        label {
            &:before {
                background-color: #FFF;
                padding: 5px;
                border-radius: 10px;
                border: 2px solid #178501;
            }

        }
    }

    .switch-title {
        color: #168600;
    }

    .switch-field {
        label {
            background-color: #FFF;
            color: #168600;
            text-transform: uppercase;
            min-width: 90px;
        }

    }
}

.switch-field input {
    position: absolute !important;
    clip: rect(0, 0, 0, 0);
    height: 1px;
    width: 1px;
    border: 0;
    overflow: hidden;
}

.switch-field label {
    float: left;
}

.switch-field label {
    display: inline-block;
    width: auto;
    background-color: #e4e4e4;
    color: rgba(0, 0, 0, 0.6);
    font-size: 14px;
    font-weight: normal;
    text-align: center;
    text-shadow: none;
    padding: 6px 14px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    -webkit-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 1px rgba(255, 255, 255, 0.1);
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3), 0 1px rgba(255, 255, 255, 0.1);
    -webkit-transition: all 0.1s ease-in-out;
    -moz-transition: all 0.1s ease-in-out;
    -ms-transition: all 0.1s ease-in-out;
    -o-transition: all 0.1s ease-in-out;
    transition: all 0.1s ease-in-out;
}

.switch-field label:hover {
    cursor: pointer;
}

.switch-field input:checked + label {
    background-color: #168600;
    color: #FFF;
    -webkit-box-shadow: none;
    box-shadow: none;
}

.switch-field label:first-of-type {
    border-radius: 4px 0 0 4px;
}

.switch-field label:last-of-type {
    border-radius: 0 4px 4px 0;
}
</style>
