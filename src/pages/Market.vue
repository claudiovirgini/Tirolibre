<template>
  
  <div class="playbuzz" data-id="1debab89-1b02-44a8-bc3f-f9f595a90679"></div>
</template>

<script>
  //(function (d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = 'https://embed.playbuzz.com/sdk.js'; fjs.parentNode.insertBefore(js, fjs); }(document, 'script', 'playbuzz-sdk'));
  export default {
    created() {
      //this.myFunction(document, 'script', 'playbuzz-sdk');
    },
    methods: {
      
      myFunction: function (d, s, id) {
        alert('IN')
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById('playbuzz-sdk'))
          return;
        alert('IN1')
        js = d.createElement(s);
        js.id = 'playbuzz-sdk';
        js.src = 'https://embed.playbuzz.com/sdk.js';
        alert('IN2')
      }
    }
  }
</script>
