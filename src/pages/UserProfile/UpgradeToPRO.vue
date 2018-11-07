<template>
<div>

  <section class="content">
    <div class="container">
      <h3 class="mb-4">come funziona</h3>
      <div class="row step">
        <div class="col-12 col-sm-4">
          <div class="border">
            <span>1</span>
            <p>Prenderemo in carico il tuo profilo. Entreremo in contatto con te, ti chiederemo informazioni sulla carriera fatta sin qui e le aspettative future, dettagli tecnici e caratteristiche personali. Il tutto servirà per preparare il tuo profilo
              da presentare ai club.</p>
          </div>
        </div>
        <div class="col-12 col-sm-4">
          <div class="border">
            <span>2</span>
            <p>Presentarsi bene ad un club è fondamentale. Dopo aver identificato il tuo profilo e le tue esigenze/preferenze, procederemo con una presentazione personalizzata del tuo profilo ai club e ai contatti della nostra rete.</p>
          </div>
        </div>
        <div class="col-12 col-sm-4">
          <div class="border">
            <span>3</span>
            <p>Analizzeremo gli interessi dei club a cui è stato presentato il tuo profilo, li discuteremo assieme e decideremo con te quali prove effettuare o quali trattative intraprendere. L'eventuale successo della trattativa non comporterà alcun costo
              per il calciatore, e di conseguenza nessuna commissione verrà corrisposta a TiroLibre</p>
          </div>
        </div>
      </div>
      <div class="row mt-4 how">
        <div class="col-12 col-sm-6">
          <span>dove si prova?</span>
          <p>Analizzeremo con te dove presentarti in base alle tue esigenze geografiche</p>
        </div>
        <div class="col-12 col-sm-6">
          <span>livello?</span>
          <p>Il livello del club in cui provare lo decideremo dopo esserci confrontati con te e aver capito il livello a cui ambire</p>
        </div>
      </div>
      <hr>
      <h3 class="mb-4">scegli il tuo pacchetto</h3>
      <div class="row-fluid clearfix">
        <div class="promos">
          <div class="promo first">
            <h4>Basic</h4>
            <ul class="features">
              <li class="brief">Abbonamento Mensile</li>
              <li class="price">€15</span>
              </li>
              <li>Stagione 2018/19</li>
              <li class="buy">
                <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                  <input type="hidden" name="cmd" value="_s-xclick">
                  <input type="hidden" name="hosted_button_id" value="JMK94PZJAL99C">
                  <input type="image" src="https://www.paypalobjects.com/it_IT/IT/i/btn/btn_subscribeCC_LG.gif" border="0" name="submit" alt="PayPal è il metodo rapido e sicuro per pagare e farsi pagare online.">
                  <img alt="" border="0" src="https://www.paypalobjects.com/it_IT/i/scr/pixel.gif" width="1" height="1">
                </form>
              </li>
            </ul>
          </div>
          <div class="promo second">
            <h4>Premium</h4>
            <ul class="features">
              <li class="brief">Intera Stagione</li>
              <li class="price">€110</li>
              <li>Stagione 2018/19</li>
              <li class="buy">
                <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                  <input type="hidden" name="cmd" value="_s-xclick">
                  <input type="hidden" name="hosted_button_id" value="S6QCC53YFUCUL">
                  <input type="image" src="https://www.paypalobjects.com/it_IT/IT/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal è il metodo rapido e sicuro per pagare e farsi pagare online.">
                  <img alt="" border="0" src="https://www.paypalobjects.com/it_IT/i/scr/pixel.gif" width="1" height="1">
                </form>
              </li>
            </ul>
          </div>
          <div class="promo third scale">
            <h4>Plus</h4>
            <ul class="features">
              <li class="brief">Quota unica</li>
              <li class="price">€45</li>
              <li>Mercato Invernale</li>
              <li>
                <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                  <input type="hidden" name="cmd" value="_s-xclick">
                  <input type="hidden" name="hosted_button_id" value="VRVBNQ42CQL3Q">
                  <input type="image" src="https://www.paypalobjects.com/it_IT/IT/i/btn/btn_buynowCC_LG.gif" border="0" name="submit" alt="PayPal è il metodo rapido e sicuro per pagare e farsi pagare online.">
                  <img alt="" border="0" src="https://www.paypalobjects.com/it_IT/i/scr/pixel.gif" width="1" height="1">
                </form>
              </li>
              <!-- <li class="buy"><button>Paga Adesso</button></li> -->
            </ul>
          </div>
        </div>

      </div>
    </div>
  </section>

</div>
</template>
<script>
// import {PricingCard} from '@/components'
//import PricingCard from './PricingCard.vue'
export default {
  components: {
    //PricingCard
  }
}
</script>
<style scoped lang="scss">
h3 {
    text-transform: uppercase;
}
.step {
    .border {
        padding: 20px;
        border-radius: 5px;
    }
    span {
        font-size: 3rem;
    }
}
.how {
    background-color: rgba(0,0,0,.6);
    padding: 15px;
    span {
        font-size: 2rem;
        color: #f8fe1e;
        text-transform: uppercase;
    }
}
hr {
    border-top: 1px solid #f8fe1e;
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: 50%;
}
.promos {
    max-width: 1140px;
    margin: 0 auto;
}

.promo {
    margin: 1em 0.5em 1.625em;
    padding: 0.25em 0 2em;
    background: #0F1012;
    font-family: 'Open Sans', sans-serif;
    font-weight: 400;
    line-height: 1.625;
    color: #f9f9f9;
    text-align: center;
}
@media (min-width: 40em) {
    .promo {
        display: inline;
        float: left;
        width: 33.333%;
        margin: 1em 0 0;
    }
    .promo.first {
        border-right: none;
    }
    .promo.second {
        float: right;
        border-left: none;
    }
}
.promo h4 {
    margin: 0.25em 0 0;
    font-size: 170%;
    font-weight: normal;
}
.promo .features {
    margin: 0;
    padding: 0;
    list-style-type: none;
    color: #999999;
}
.promo li {
    padding: 0.25em 0;
}
.promo .brief {
    color: #f9f9f9;
}
.promo .price {
    margin: 0.5em 0;
    padding: 0.25em 0;
    background: #292b2e;
    font-size: 250%;
    color: #f9f9f9;
}
.promo .buy {
    margin: 1em 0 0;
}
.promo button {
    padding: 1em 3.25em;
    border: none;
    border-radius: 40px;
    background: #292b2e;
    color: #f9f9f9;
    cursor: pointer;
}
.promo button:hover {
    background: #27282b;
}

.scale button {
    background: #f8fe1e;
    color: #212121;
}
.scale button:hover {
    background: #4e8d88;
}
@media (min-width: 40em) {
    .scale {
        transform: scale(1.2);
        box-shadow: 0 0 4px 1px rgba(20, 20, 20, 0.8);
    }
    .scale .price {
        color: #f8fe1e;
    }
}
</style>
