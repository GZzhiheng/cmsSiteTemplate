<template>
	<div>
		<Siteeditheader @changeComponent='changeView' :currentView='currentView' v-if="currentView !== 'Sitetemplate'"></Siteeditheader>
		<keep-alive>
			<component :is='currentView' @changeComponent='changeView'></component>
		</keep-alive>
	</div>
</template>

<script>
	import Siteeditheader from './common/sitesedit/Site-editheader'
	import Sitesettings from './common/sitesedit/Site-settings'
	import Sitemenusetting from './common/sitesedit/Site-menuSetting'
	import Sitepagesetting from './common/sitesedit/Site-pageSetting'
	import Siteaccelerate from './common/sitesedit/Site-accelerate'
	import Sitetemplate from './Site-templateEdit'

	export default {
	  data () {
	    return {
	      currentView: 'Sitesettings'
	    }
	  },
	  components: {
	    Sitesettings,
	    Siteeditheader,
	    Sitemenusetting,
	    Sitepagesetting,
	    Siteaccelerate,
	    Sitetemplate
	  },
	  methods: {
	    changeView (newComponent) {
	      this.currentView = newComponent
	      console.log(this.currentView)
    	}
	  }
	}
</script>

<style>
	.list-text,.list-information{
		float: left;
		display: inline;
	}
	.list-text{
		width: 15%;
		text-align: right;
		color: #666666;
		margin-top: 7px;
	}
	.list-information{
		width: 84%;
		margin-left: 1%;
		padding-right: 5%;
	}
	.list-information input,.list-information textarea{
		border: 1px solid #d0d5d7;
		color: #666666;
		border-radius: 5px;
		height: 34px;
		width: 100%;
		text-indent: 10px;
	}
	.list-information .uploadLogoBtn{
		height: 100%;
	}
	.list-information textarea{
		height: 82px;
	}
	.list-information input::-webkit-input-placeholder {
		color: #d0d5d7;
	}
	.list-information input:-moz-placeholder {
		color: #d0d5d7;
	}
	.list-information input:-ms-input-placeholder {
	/* IE10+ */
		color: #d0d5d7;
	}
	.list-information textarea::-webkit-input-placeholder {
		color: #d0d5d7;
	}
	.list-information textarea:-moz-placeholder {
		color: #d0d5d7;
	}
	.list-information textarea:-ms-input-placeholder {
	/* IE10+ */
		color: #d0d5d7;
	}
	.settings-box .img-box{
		width: 176px;
		height: 176px;
	}
	.img-box{
		margin-top: 36px;
		background: #eeeeee;
		overflow: hidden;
		position: relative;
		display: block;
		white-space: nowrap;
    	text-align: center;
    	cursor: pointer;
    	position: relative;
	     box-shadow: 0px 0px 5px -1px #777;
	    -moz-box-shadow: 0px 0px 5px -1px #777;
	    -webkit-box-shadow: 0px 0px 5px -1px #777;
	}

	.uploadBtnBox{
		position: absolute;
		height: 28px;
		top: 50%;
		left: 50%;
		margin-top: -14px;
		margin-left: -58px;
		display: none;
	}
	.uploadBtnBox button{
		width: 56px;
		height: 28px;
		border: none;
		border-radius: 5px;
		font-size: 12px;
		text-align: center;
		outline:none;
	}
	.uploadBtnBox .checkBigImg{
		color: #33c0cc;
		background: #fff;
		margin-right: 4px;
	}
	.uploadBtnBox .clearImage{
		background: #33c0cc;
		color: #fff;
	}
	.img-box:hover .uploadBtnBox{
		display: block;
	}
	.showBigImg{
		opacity: 0;
		-webkit-transform: translate(0, -5%);
	    transform: translate(0, -5%);
	    transition: 0.5s all ease;
	    -moz-transition: 0.5s all ease;
	    -webkit-transition: 0.5s all ease;
	    -o-transition: 0.5s all ease;
	    box-shadow: 0 5px 15px rgba(0,0,0,0.5);
	    background-color: #fff;
	    border: 1px solid rgba(0,0,0,0.2);
	    background-clip: padding-box;
	    margin: 30px auto;
	    width: 900px;
	}
	.showBigImg h4{
		padding: 15px;
		margin: 0;
		border-bottom: 1px solid #e5e5e5;
	}
	.showBigImg img{
		max-width: 100%;
		margin: 0 auto;
		display: block;
		padding: 15px;
	}
	.showBigImg.in{
		-webkit-transform: translate(0, 0);
    	transform: translate(0, 0);
		opacity: 1;
	}
	.showBigImg button{
		outline:none;
	}
	.add-img{
		visibility: visible;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -27.5px;
		margin-top: -27.5px;
	}
	.img-box .active{
		visibility: hidden;
	}
	.open1{
        width: 38px;
        height: 22px;
        border-radius: 11px;
        position: relative;
        background: rgba(51,192,204,0.8);
        margin-top: 7px;
        cursor: pointer;
    }
    .open2{
        width: 20px;
        height: 20px;
        border-radius: 10px;
        position: absolute;
        background: white;
        top: 1px;
        right: 1px;
    }
    .close1{
        background: rgba(255,255,255,0.4);
        border:2px solid rgba(0,0,0,0.15);
    }
    .close2{
        left: 0px;
        top: -1px;
        border:1px solid rgba(0,0,0,0.1);
    }
    .list-information table{
    	width: 100%;
    	max-width: 100%;
    	border: 1px solid #ddd;
    	text-align: center;
    }
    .list-information table th,.list-information table td{
    	padding: 8px;
	    line-height: 1.42857;
	    vertical-align: middle;
	    text-align: center;
	    border-top: 1px solid #ddd;
	    word-break: break-all;
    	border: 1px solid #ddd;
    }
    .list-information table td{
    }

    .listbuttom{
		float: right;
	}
	.editList,.addList{
		float: left;
		color: #33c0cc;
		border: 1px solid #33c0cc;
		border-radius: 5px;
		padding: 7px 12px;
		margin-bottom: 8px;
		margin-left: 10px;
		cursor: pointer;
	}
	.sortNum{
		text-indent: 0 !important;
		text-align: center;
	}
	.uploadLogoBtn{
		height: 100%;
	}
	.el-color-picker__panel{
		z-index: 99999 !important;
	}
	.avatar-uploader{
		height: 0 !important;
	}
	.page-show-img{
		max-height: 86px;
		max-width: 218px;
	}
	.emptyList{
		background: #f5f5f5;
		text-align: center !important;
	}
</style>
