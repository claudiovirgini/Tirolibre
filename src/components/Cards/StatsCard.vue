<template>
<md-card class="md-card-stats">
  <md-card-header :data-background-color="dataBackgroundColor">
    <slot name="header"></slot>
  </md-card-header>

  <md-card-content>
    <slot name="content"></slot>
  </md-card-content>

  <md-card-actions md-alignment="left">
    <slot name="footer"></slot>
  </md-card-actions>
</md-card>
</template>
<script>
export default {
  name: 'stats-card',
  props: {
    dataBackgroundColor: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">
.md-card-header {
    max-width: 100px;
    min-height: 100px;
    padding: 3px !important;
}
</style>
