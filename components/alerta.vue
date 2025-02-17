<template>
  <div :class="badgeClasses">
    <h3><i :class="iconClasses"></i> {{ texto }}</h3>
  </div>
</template>

<script>
module.exports = {
  props: ['texto', 'icone'],
  data: function() {
      return {
        iconList: {
          'success': 'fa-check',
          'warning': 'fa-triangle-exclamation',
          'danger': 'fa-bomb'
        }
      }
  },
  computed: {
    badgeClasses() {
      return ['badge', 'alert', this.icone || 'success'];
    },
    iconClasses() {
      return ['fa-solid', this.iconList[this.icone || 'success']];
    }
  }
}
</script>

<style>

</style>