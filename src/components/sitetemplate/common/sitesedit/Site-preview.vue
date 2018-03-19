<template>
	<div class="iframe-box" :class="{'show':showiframe === true}">
		<div class="showiframetext" @click="show()">
			<span v-if="showiframe === true">收起预览<img src="/static/res/images/cms/showiframeshow.png"/></span>
			<span v-if="showiframe === false">实时预览<img src="/static/res/images/cms/showiframehide.png"/></span>
		</div>
		<iframe name="showiframe" height="100%" width="100%" :src="iframeSRC" frameborder="0" id="showiframe">
		</iframe>
	</div>
</template>

<script>
	export default{
	  data() {
        return {
          showiframe: false
        }
      },
	  computed: {
	    iframeSRC () {
	      return this.$store.state.sitetemplate.iframeSRC
	    },
	    pageId () {
	      return this.$store.state.sitetemplate.pageId
	    }
	  },
	  methods: {
	  	show(){
	  		this.showiframe = !this.showiframe
	  	}
	  },
	  created () {
	  	this.$store.commit('SITE_IFRAMESRC', 'cms/rest/sitePage/preview/' + this.$route.query.templateId + '/pages/' + this.pageId + '.html')
	  },
	  watch: {
	  	pageId(val) {
	  		this.$store.commit('SITE_IFRAMESRC', 'cms/rest/sitePage/preview/' + this.$route.query.templateId + '/pages/' + val + '.html')
	    }
	  }
	}
</script>

<style>
	.iframe-box.show{
		position: fixed;
		top: 250px;
		right: 25px;
		width: 30%;
		height: auto;
		z-index: 999;
		/*box-shadow: 0px 0px 5px -1px #777;
	    -moz-box-shadow: 0px 0px 5px -1px #777;
	    -webkit-box-shadow: 0px 0px 5px -1px #777;*/
	}
	.iframe-box iframe{
		border-radius: 5px;
	    position: absolute;
	    width: 100vw;
		height: 1800px;
	    top: 0;
	    left: 0;
	    transform: translate(-50%,-50%) scale(0.3);
	    -ms-transform: translate(-50%,-50%) scale(0.3);
		-moz-transform: translate(-50%,-50%) scale(0.3);
		-webkit-transform: translate(-50%,-50%) scale(0.3);
		-o-transform: translate(-50%,-50%) scale(0.3);
	    margin-left: 50%;
	    margin-top: 30%;
		box-shadow: 0px 0px 20px 5px #777;
	    -moz-box-shadow: 0px 0px 20px 5px #777;
	    -webkit-box-shadow: 0px 0px 20px 5px #777;
	}
	.iframe-box{
		position: fixed;
		top: 250px;
		right: -30.5%;
		width: 30%;
		height: 1800px;
		z-index: 999;
	    transition: 0.8s all ease;
	    -moz-transition: 0.8s all ease;
	    -webkit-transition: 0.8s all ease;
	    -o-transition: 0.8s all ease;
	}
	.showiframetext{
		position: absolute;
		top: 10px;
		left: -33px;
		width: 29px;
		height: 110px;
		color: #888888;
		font-size: 12px;
		padding: 10px;
		background: url('/static/res/images/cms/showiframe.png');
	}
	.showiframetext span{
		margin-top: 10px;
		line-height: 14px;
		display: block;
		cursor: pointer;
	}
	.showiframetext span img{
		margin-left: 3px;
	}
</style>