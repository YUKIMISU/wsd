<template>
  <div>
    <div>
      <transition name='vux-fade'>
        <div :class = '$style.back' v-if='true'></div>
      </transition>
    </div>
    <div>
      <transition name='slide-up'>
        <div :class = '$style.mask' v-if='show'>
          <div @click = 'close'>关闭</div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'share',
    data () {
      return {
        show: true
      }
    },
    watch: {
      value (val) {
        this.show = val
      }
    },
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      close () {
        this.$emit('input', false)
      }
    }
  }
</script>

<style module>
  .back {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
  }
  .mask {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 128px;
    background: #fff;
  }
</style>

<style>
  .slide-up-enter-active, .slide-up-leave-active {
    transition: all .3s;
    transform: translateY(0);
  }
  .slide-up-enter, .slide-up-leave-active {
    transform: translateY(100%);
  }
</style>