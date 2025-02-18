<template>
  <div v-if="visible" :class="style">
    <h3>{{ message }}</h3>
  </div>
</template>

<script>
module.exports = {
  props: {
    duration: {
      type: Number,
      default: 4000
    },
    message: {
      type: String,
      required: true
    }
  },
  data: function() {
      return {
        visible: false,
        timer: null,
        style: {
          "vue-toast": true,
          success: true,
          hide: false,
        },
      }
  },
  methods: {
    showToast() {
      /**
       * Segue a fonte/inspiração deste toast:
       * https://github.com/ihaichao/vue-toast-plugin
       */
      this.visible = false;
      this.style.hide = false;
      this.visible = true;

      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.style.hide = true;
      }, this.duration);
    }
  }
}
</script>

<style>

</style>