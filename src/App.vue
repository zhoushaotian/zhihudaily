<template>
<div class="app">
  <router-view></router-view>
  <bottom class="bottom"></bottom>
</div>
</template>
<script>
import bottom from './components/bottom/bottom';
export default {
  components: {
    bottom
  },
  data() {
    return {
      last: {}
    };
  }
};
</script>
<style lang="stylus" rel='stylesheet/stylus'>
</style>
