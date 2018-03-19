<style scoped>
  /***Loading 样式****/
  .loading .uil-spin-css{width: 200px;height: 200px;position: fixed;left: 50%;top: 50%;z-index: 1100;-webkit-transform: translate(-50%, -50%);transform: translate(-50%, -50%);}
  .loading .uil-spin-css-backdrop{background: none;}
  /*@-webkit-keyframes uil-spin-css{0%{opacity: 1;-webkit-transform: scale(1.5);transform: scale(1.5);} 100%{opacity: 0.1;-webkit-transform: scale(1);transform: scale(1);}}*/
  /*@-moz-keyframes uil-spin-css{ 0%{opacity: 1;-webkit-transform: scale(1.5);transform: scale(1.5);} 100%{opacity: 0.1;-webkit-transform: scale(1);transform: scale(1);}}*/
  /*@-webkit-keyframes uil-spin-css{0%{opacity: 1;-webkit-transform: scale(1.5);transform: scale(1.5);} 100%{opacity: 0.1;-webkit-transform: scale(1);transform: scale(1);}}*/
  /*@-o-keyframes uil-spin-css{0%{opacity: 1;-webkit-transform: scale(1.5);transform: scale(1.5);} 100%{opacity: 0.1;-webkit-transform: scale(1);transform: scale(1);}}*/
  /*@keyframes uil-spin-css{0%{opacity: 1;-webkit-transform: scale(1.5);transform: scale(1.5);} 100%{opacity: 0.1;-webkit-transform: scale(1);transform: scale(1);}} .uil-spin-css > div{width: 24px;height: 24px;margin-left: 4px;margin-top: 4px;position: absolute;}*/
  /*.loading .uil-spin-css > div > div{width: 100%;height: 100%;border-radius: 100px;background: #000;}*/
  /*.loading .uil-spin-css > div:nth-of-type(1) > div{-webkit-animation: uil-spin-css 1s linear infinite;animation: uil-spin-css 1s linear infinite;-webkit-animation-delay: -0.87s;animation-delay: -0.87s;}*/
  /*.loading .uil-spin-css > div:nth-of-type(1){-webkit-transform: translate(84px, 84px) rotate(45deg) translate(70px, 0);transform: translate(84px, 84px) rotate(45deg) translate(70px, 0);}*/
  /*.loading .uil-spin-css > div:nth-of-type(2) > div{-webkit-animation: uil-spin-css 1s linear infinite;animation: uil-spin-css 1s linear infinite;-webkit-animation-delay: -0.75s;animation-delay: -0.75s;}*/
  /*.loading .uil-spin-css > div:nth-of-type(2){-webkit-transform: translate(84px, 84px) rotate(90deg) translate(70px, 0);transform: translate(84px, 84px) rotate(90deg) translate(70px, 0);}*/
  /*.loading .uil-spin-css > div:nth-of-type(3) > div{-webkit-animation: uil-spin-css 1s linear infinite;animation: uil-spin-css 1s linear infinite;-webkit-animation-delay: -0.62s;animation-delay: -0.62s;}*/
  /*.loading .uil-spin-css > div:nth-of-type(3){-webkit-transform: translate(84px, 84px) rotate(135deg) translate(70px, 0);transform: translate(84px, 84px) rotate(135deg) translate(70px, 0);}*/
  /*.loading .uil-spin-css > div:nth-of-type(4) > div{-webkit-animation: uil-spin-css 1s linear infinite;animation: uil-spin-css 1s linear infinite;-webkit-animation-delay: -0.5s;animation-delay: -0.5s;}*/
  /*.loading .uil-spin-css > div:nth-of-type(4){-webkit-transform: translate(84px, 84px) rotate(180deg) translate(70px, 0);transform: translate(84px, 84px) rotate(180deg) translate(70px, 0);}*/
  /*.loading .uil-spin-css > div:nth-of-type(5) > div{-webkit-animation: uil-spin-css 1s linear infinite;animation: uil-spin-css 1s linear infinite;-webkit-animation-delay: -0.37s;animation-delay: -0.37s;}*/
  /*.loading .uil-spin-css > div:nth-of-type(5){-webkit-transform: translate(84px, 84px) rotate(225deg) translate(70px, 0);transform: translate(84px, 84px) rotate(225deg) translate(70px, 0);}*/
  /*.loading .uil-spin-css > div:nth-of-type(6) > div{-webkit-animation: uil-spin-css 1s linear infinite;animation: uil-spin-css 1s linear infinite;-webkit-animation-delay: -0.25s;animation-delay: -0.25s;}*/
  /*.loading .uil-spin-css > div:nth-of-type(6){-webkit-transform: translate(84px, 84px) rotate(270deg) translate(70px, 0);transform: translate(84px, 84px) rotate(270deg) translate(70px, 0);}*/
  /*.loading .uil-spin-css > div:nth-of-type(7) > div{-webkit-animation: uil-spin-css 1s linear infinite;animation: uil-spin-css 1s linear infinite;-webkit-animation-delay: -0.12s;animation-delay: -0.12s;}*/
  /*.loading .uil-spin-css > div:nth-of-type(7){-webkit-transform: translate(84px, 84px) rotate(315deg) translate(70px, 0);transform: translate(84px, 84px) rotate(315deg) translate(70px, 0);}*/
  /*.loading .uil-spin-css > div:nth-of-type(8) > div{-webkit-animation: uil-spin-css 1s linear infinite;animation: uil-spin-css 1s linear infinite;-webkit-animation-delay: -0s;animation-delay: -0s;}*/
  /*.loading .uil-spin-css > div:nth-of-type(8){-webkit-transform: translate(84px, 84px) rotate(360deg) translate(70px, 0);transform: translate(84px, 84px) rotate(360deg) translate(70px, 0);}*/
 /**/
  .loading .mask{width:100%; height:100%; position: fixed; top:0; left:0; z-index:999; background-color: rgba(0, 0, 0, 0.09);}
</style>
<template>
  <div v-show="publicLoading" class="loading">
    <div class="mask"></div>
    <div class="uil-spin-css">
      <img src="../../assets/images/loading_1.gif" alt="">
      <!--<div>-->
        <!--<div></div>-->
      <!--</div>-->
      <!--<div>-->
        <!--<div></div>-->
      <!--</div>-->
      <!--<div>-->
        <!--<div></div>-->
      <!--</div>-->
      <!--<div>-->
        <!--<div></div>-->
      <!--</div>-->
      <!--<div>-->
        <!--<div></div>-->
      <!--</div>-->
      <!--<div>-->
        <!--<div></div>-->
      <!--</div>-->
      <!--<div>-->
        <!--<div></div>-->
      <!--</div>-->
      <!--<div>-->
        <!--<div></div>-->
      <!--</div>-->
    </div>
  </div>

</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'loading',
    data () {
      return {
        title: 'this is public loading'
      }
    },
    computed: mapState(['publicLoading'])
  }
</script>
