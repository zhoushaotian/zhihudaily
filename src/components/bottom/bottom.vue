<template>
<div class="bottom-wrapper">
  <mu-paper>
    <mu-bottom-nav :value="bottomNav" @change="handleChange">
      <mu-bottom-nav-item value="最新消息" title="最新消息" icon="home" to="/latest"/>
      <mu-bottom-nav-item value="主题日报" title="主题日报" icon="favorite" to="/theme"/>
      <mu-bottom-nav-item value="关于作者" title="关于作者" icon="book" to="/about"/>
    </mu-bottom-nav>
  </mu-paper>  
</div>  
</template>
<script>
    export default {
        data() {
            return {
                bottomNav: '最新消息'
                };
        },
        methods: {
            handleChange(val) {
            this.bottomNav = val;
            }
        }
    };
</script>
<style lang="stylus" rel='stylesheet/stylus'>
.bottom-wrapper
    height:56px
    width:100%
    position:fixed
    bottom:0
    left:0
</style>