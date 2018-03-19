<template>
	<div class="preview-box" :class="{'active':previewData.preview}">
		<div class="preview-header">
			<span>NO.{{ previewData.previewno }}</span>
			<ul>
				<li class="p-back" @click="backSites">返回列表</li>
				<li v-if="previewData.previewUrl" class="p-web" @click="pCreatesite(previewData.previewUrl)">页面参考链接</li>
				<li class="p-sure" @click="confirmPresite(previewData.id)">确定模板</li>
			</ul>
			<p>注：非实际尺寸预览</p>
		</div>
		<div class="previewImageScrollbar">
			<EasyScrollbar :barOption="previewImageScrollbar">
				<div id="wrapper">
					<div class="preview-img">
						<img :src="'http://cms.networkgrand.com:81/'+previewData.previewImg"/>
					</div>
				</div>
			</EasyScrollbar>
		</div>
	</div>
</template>

<script>

	export default{
	  props: ['show', 'previewImage', 'previewName', 'previewData'],    // 父组件传递参数
	  data: () => {
	    return {
	      previewImageScrollbar: {
	        barColor: '#33c0cc',
	        barWidth: 10,
	        railColor: '#626262',
	        barMarginRight: 100,
	        zIndex: 'auto',
	        autohidemode: true
	      }
	    }
	  },
	  methods: {
	    confirmPresite (id) {
	      this.$emit('createSite', id)
	    },
	    backSites () {
	      this.$emit('showaction')
	    },
	    pCreatesite (url) {
	      window.open(url)
	    }
	  }
	}
</script>

<style>
	.preview-box{
		display: none;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1100;
		width: 100%;
		background-color: #000;
	}
	.preview-box.active{
		display: block;
	}
	.preview-img{
		/*overflow-y: scroll;*/
	}
	.preview-img img{
		padding: 0 10%;
		max-width: 100%;
		margin: 0 auto;
		display: block;
	}
	.preview-header{
		position: relative;
		background-color: #32C0CC;
	}
	.preview-header span{
		position: absolute;
		padding-left: 20px;
		line-height: 55px;
		font-size: 14px;
		font-weight: bold;
		font-family: "microsoft yahei";
		color: #fff;
	}
	.preview-header p{
		position: absolute;
		top: 0;
		right: 20px;
		margin-bottom: 0px;
		line-height: 55px;
		font-size: 14px;
		font-family: "microsoft yahei";
		color: #fff;
	}
	.preview-header ul{
		text-align: center;
	}
	.preview-header li{
		display: inline-block;
		margin-left: 4.5%;
		padding: 16px 5px 16px 35px;
		font-size: 16px;
		font-weight: bold;
		font-family: "microsoft yahei";
		color: #fff;
		border-bottom: 4px solid transparent;
		background-repeat: no-repeat;
		background-position: left center;
		cursor: pointer;
		transition: 0.5s all ease;
	    -moz-transition: 0.5s all ease;
	    -webkit-transition: 0.5s all ease;
	    -o-transition: 0.5s all ease;
	}
	.preview-header li:hover{
		border-bottom: 4px solid #fff;
	}
	.preview-header li.p-back{
		margin-left:0;
		background-image: url('/static/res/images/cms/left-triangle.png')
	}
	.preview-header li.p-web{
		background-image: url('/static/res/images/cms/bookmark.png')
	}
	.preview-header li.p-sure{
		background-image: url('/static/res/images/cms/sure.png')
	}
	.previewImageScrollbar .esay-scrollbar__bar.is-vertical{
		margin: 5% 0;
	}
</style>
