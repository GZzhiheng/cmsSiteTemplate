<template>
  <div>
    <Sitecrumbs :currentPage="this.currentPage">
    	<div class="crumb-back">
				<a href="javascript:;" @click="goBack">上一步</a>
			</div>
    </Sitecrumbs>
    <div class="template-edit">
      <div class="template-btnBox text-right">
        <a href="javascript:'';" class="btn-uploadtemplate">重新上传<input type="file" class="upload-input" @change="uploadAttachment($event)"/></a>
        <a :href="'/cms/rest/siteTemplate/download?id='+$route.query.templateId" class="btn-exporttemplate">导出</a>
      </div>
      <div class="template-show">
        <treeFolderContent :fileTree="fileTree" :leftSpace="space"></treeFolderContent>
      </div>
    </div>
    <Dialogcommon v-if="showD.open" @currentImage="currentImg"></Dialogcommon>
    <el-dialog title="修改图片" :visible.sync='showImg'><img :src="innerImg"/></el-dialog>
  </div>
</template>

<script>
  import Sitecrumbs from './common/Site-crumbs'
  import treeFolderContent from './common/loop/tree-folder-content'
  import Dialogcommon from './common/sitesedit/Dialog-common'

  export default {
    data () {
      return {
        currentPage: '模板编辑',
        space: 0,
        uploadFile: null,
        showImg: false,
        innerImg: ''
      }
    },
    components: {
      Sitecrumbs,
      treeFolderContent,
      Dialogcommon
    },
    computed: {
      fileTree () {
        return this.$store.state.sitetemplate.fileTree
      },
      showD () {
        return this.$store.state.sitetemplate.fileOpentype
      }
    },
    mounted () {
      this.loadTemplate()
    },
    methods: {
      downloadTem () {
      	window.open('/cms/rest/siteTemplate/download?id='+this.$route.query.templateId)
      },
      loadTemplate () {
      	this.$rest.get('/cms/rest/siteTemplate/getDetail', {'id': this.$route.query.templateId}).then(response => {
	        console.log('模板编辑请求成功')
	        console.log(response.data)
	        this.$store.commit('SITE_FILETREE', response.data.fileTree.children)
	      })
      },
      goBack () {
	  	  this.$emit('changeComponent','Sitesettings')
	  	},
	  	currentImg () {
	  		this.showImg = true
	  	},
      uploadAttachment(e, uploadFileData) {
        this.uploadFile = e.target.files[0]
        var data = new FormData()
        data.append('id', this.$route.query.templateId)
        data.append('file', this.uploadFile)
        var that = this
        $.ajax({
          type: 'POST',
          global: false,
          url: '/cms/rest/siteTemplate/cover.do',
          dataType: 'json',
          data: data,
          processData: false,
          contentType: false,
          success: function (rsp) {
          	that.$message({message: '模板上传成功',type: 'success'});
          	that.loadTemplate()
          	console.log(rsp)
          }, complete: function () {
          }
        })
      }
    }
  }
</script>

<style>
  .template-btnBox{
    margin-bottom: 20px;
  }
  .template-edit{
  	min-width: 1028px;
    background-color: #fff;
    margin: 10px 20px;
    padding:20px;
    border-radius: 5px;
  }
  .btn-uploadtemplate,.btn-exporttemplate{
  	position: relative;
    display: inline-block;
    padding: 4px 15px;
    font-size: 12px;
    color: #33c0cc;
    border: 1px solid #33c0cc;
    border-radius: 4px;
    text-decoration: none;
  }
  .btn-exporttemplate{
    border: none;
    color:#333;
  }
  .btn-uploadtemplate:hover,
  .btn-exporttemplate:hover{
    color: #fff;
    background-color: #33c0cc;
    text-decoration: none;
  }
  .upload-input{
  	position: absolute;
  	left: 0;
  	top: 0;
  	z-index: 2px;
  	cursor: pointer;
  	opacity: 0;
  }
  .template-show ul,.template-show li{
    line-height: 40px;
    color: #666666;
  }
  .template-show li{
  	position: relative;
    padding-left: 20px;
    padding-right: 20px;
    border-bottom: 1px solid #ededed;
    cursor: pointer;
  }
  .template-show li img{
  	position: absolute;
  	top: 50%;
  	margin-top: -9px;
    margin-left: -21px;
  }
  .template-show li[datatype='dir'].off:before{
  	content: '';
  	position: absolute;
  	top: 50%;
  	margin-top: -9px;
    margin-left: -21px;
    width: 18px;
    height: 18px;
    background: url('/static/res/images/cms/folderOff.png') no-repeat center;
  }
  .template-show li[datatype='dir'].on:before{
  	content: '';
  	position: absolute;
  	top: 50%;
  	margin-top: -9px;
    margin-left: -21px;
    width: 18px;
    height: 18px;
    background: url('/static/res/images/cms/folderOn.png') no-repeat center;
  }
  .template-show li[datatype='file']:before{
  	content: '';
  	position: absolute;
  	top: 50%;
  	margin-top: -9px;
    margin-left: -21px;
    width: 18px;
    height: 18px;
    background: url('/static/res/images/cms/file.png') no-repeat center;
  }
  .template-show li[data-list-type='META']:before{
    background: url('/static/res/images/cms/META.png') no-repeat center !important;
  }
  .template-show li[data-list-type='dynamic']:before{
    background: url('/static/res/images/cms/dynamic.png') no-repeat center !important;
  }
  .template-show li[data-list-type='pages']:before{
    background: url('/static/res/images/cms/pages.png') no-repeat center !important;
  }
  .template-show li[data-list-type='res']:before{
    background: url('/static/res/images/cms/res.png') no-repeat center !important;
  }
  .template-show li:hover{
  	background-color: #fcfcfc;
  }
  .template-show>ul>ul>li{
    padding-left: 40px;
  }

  .template-show>ul>ul>ul>li{
    padding-left: 60px;
  }
  .template-show>ul>ul>ul>ul>li{
    padding-left: 80px;
  }
  .template-show>ul>ul>ul>ul>ul>li{
    padding-left: 100px;
  }
  .template-show li>div{
    text-align: right;
    float: right;
    display: none;
  }
  .template-show li:hover div{
    display: inline;
  }
  .template-show li+div{
  	display:none;
  }
  .template-show li.on+div{
  	display: block;
  }
  .template-show label{
    font-weight: normal;
    margin-bottom: 0;
    font-size: 12px;
    color: #b2b2b2;
  }

  .template-show li>div>span{
    padding-left: 20px;
    color: #00aabb;
    font-size: 12px;
  }
  .template-show li>div>span.pinterStop{
  	cursor: no-drop;
  	color: #ccc;
  }
  .template-show{
    border: 1px solid #ededed;
    border-bottom: 0;
  }
  /*modal*/
  .menuRow{
    display: block;
    overflow: hidden;
    width:80%;
    margin: 0 auto;;
  }
  .menuRow>li{
    float: left;
    line-height:34px;
    margin: 7px 0;
  }
  .menuRow>li.form-control{
    border-radius: 3px;
  }
  .menuRow>li:first-child{
    width:20%;
    text-align: right;
  }
  .menuRow>li:last-child{
    width:80%;
  }
  .modal-footer .btn-default{
    font-size: #333;
    background-color: #cfd5d8;
    border-color: #cfd5d8;
  }
  .modal-footer .btn-default:active:hover,
  .modal-footer .btn-default:active:focus{
    outline: none;
    box-shadow: none;
  }
  .modal-footer .btn-next{
    color:#fff;
    background-color: #33c0cc;
    border-color: #33c0cc ;
  }
  .modal-footer .btn-next:active:hover,
  .modal-footer .btn-next:active:focus{
    color:#fff;
    outline: none;
    box-shadow: none;
    background-color: #33c0cc;
    border-color: #33c0cc ;
  }
  /*end-modal*/
</style>
