<template>
  <div class="sites-box">
    <div class="sites-list" v-if="!modelManage">
      <div class="site-row">
        <EasyScrollbar :barOption="sitesListScrollbar">
          <div id="wrapper" class="scrollbar-box-height">
            <div class="box-out updata-model" @click="dialogFormVisible = true">
              <!--<img src="/static/res/images/cms/page-addBtnImg.png"  alt="选择模版" @click="openDislog">-->
              <el-dialog title="上传模版" :visible.sync="dialogFormVisible">
                <el-form :model="updataModel">
                  <el-form-item label="模版名称" :label-width="updataModel.formLabelWidth">
                    <el-input v-model="updataModel.name" placeholder="请输入模版名称"></el-input>
                  </el-form-item>
                  <el-form-item label="模版类型" :label-width="updataModel.formLabelWidth">
                    <el-select v-model="updataModel.modelClass" placeholder="请输入模版类型">
                      <el-option label="区域一" value="深圳"></el-option>
                      <el-option label="区域二" value="广州"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="行业分类" :label-width="updataModel.formLabelWidth">
                  <el-select v-model="updataModel.classification" placeholder="请输入行业分类">
                    <el-option label="区域一" value="深圳"></el-option>
                    <el-option label="区域二" value="广州"></el-option>
                  </el-select>
                </el-form-item>
                </el-form>
                <el-upload
                  class="upload-demo"
                  action="/cms/rest/siteTemplate/cover.do"
                  :on-change="uploadAttachment"
                  :file-list="fileList">
                  <el-button size="small" type="primary">请选择模版文件 + </el-button>
                </el-upload>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="dialogFormVisible = false">下一步</el-button>
                </div>
              </el-dialog>
            </div>
            <div class="box-out" v-for="site in site_list">
              <div class="site-box">
                <img :src="'http://dev.networkgrand.com:9080/'+site.smallImageUrl">
                <div class="site-confirm">
                  <div class="s-btn">
                    <span @click="redactModel()">编辑</span>
                    <span @click="removeModel(site.id, 'delete', site.smallImageUrl)">删除</span>
                  </div>
                  <p><span>NO.</span>{{ site.name }}</p>
                </div>
              </div>
            </div>
          </div>
        </EasyScrollbar>
        <Pagination :opt="pageOpt" @pageTurning="turnPage"></Pagination>
      </div>
    </div>
    <Sitetemplate @changeComponent='changeView' :currentView='currentView' v-if="modelManage"></Sitetemplate>
    <keep-alive>
      <component :is='currentView' @changeComponent='changeView'></component>
    </keep-alive>
  </div>
</template>

<script>
  import Pagination from './Pagination'
  import Sitetemplate from './../Site-templateEdit'
  import Sitesettings from './sitesedit/Site-settings'

  export default{
    data () {
      return {
        modelManage: false,
        operation: '',
        showSite: 0,
        dialogFormVisible: false,
        queryUrl: '/cms/rest/siteTemplate/list',
        previewShow: {preview: false, previewImg: '', previewno: '', previewUrl: ''},
        screenHeight: document.body.screenHeight,
        site_list2: [
          {type: 0, name: 'PC0001', smallImageUrl: '/static/res/images/cms/sites01.jpg', largeImageUrl: '/static/res/images/cms/preview01.jpg'},
          {sitetype: 'PC', siteno: 'PC0002', img: '/static/res/images/cms/sites02.jpg', previewImg: '/static/res/images/cms/preview02.jpg'}
        ],
        sitesListScrollbar: {
          barColor: '#33c0cc',
          barWidth: 10,
          railColor: '#f0f0f0',
          barMarginRight: 33,
          barOpacityMin: 0.5,
          zIndex: 'auto',
          autohidemode: true
        },
        updataModel: {               // 弹窗数据
          name: '',
          modelClass: '',
          classification: '',
          formLabelWidth: '100px'
        },
        fileList: [],
        currentView: 'Sitesettings'
      }
    },
    computed: {
      site_list () {
        return this.$store.state.sitetemplate.site_list
      },
      pageOpt () {
        return this.$store.state.sitetemplate.templatePage
      }
    },
    mounted () {
      console.log('currentView')
      console.log(this.currentView)
      this.changescrollbarHeight()
      this.modelList()
      const that = this
      window.onresize = () => {
        return (() => {
          window.screenHeight = document.body.clientHeight
          that.screenHeight = window.screenHeight
        })()
      }
    },
    methods: {
      changeView (newComponent) {
        debugger
        this.currentView = newComponent
        console.log(this.currentView)
      },
      turnPage (params) {
        console.log(params)
        this.$rest.post(this.queryUrl, {index: params.index, size: params.size, industryCategoryId: this.pageOpt.industryCategoryId || ''}).then(response => {
          this.$store.commit('SITE_SITETEMPLATE', response.data.datas)
          this.$store.commit('SITE_TEMPLATEPAGE', {index: params.index, rowCount: response.data.rowCount, size: 8})
        }, response => {
          console.log('下一页请求失败')
        })
      },
      selType (type) {
        this.showSite = type
      },
      modelList () {
        this.$rest.post(this.queryUrl, {index: 1, size: 8, industryCategoryId: ''}).then(response => {
          console.log('网站模板获取成功')
          console.log(response.data)
          this.$store.commit('SITE_SITETEMPLATE', response.data.datas)
          this.$store.commit('SITE_TEMPLATEPAGE', {index: 1, rowCount: response.data.rowCount, size: 8})
        }, response => {
          console.log('addsites fail')
        })
      },
      changescrollbarHeight () {
        var clientHeight = document.body.clientHeight
        var scrollbarHeight = document.getElementsByClassName('scrollbar-box-height')
        var siteCrumbs = document.getElementsByClassName('site-crumbs')[0].offsetHeight
        var topNav = document.getElementsByClassName('top-nav')[0].offsetHeight
        for (var i = 0; i < scrollbarHeight.length; i++) {
          // 距离底部50px,115是部分padding和margin
          scrollbarHeight[i].style.height = (clientHeight - siteCrumbs - topNav - 115 - 50) + 'px'
        }
      },
      redactModel () {
//        this.$rest.get('/cms/rest/siteTemplate/getDetail', {'id': id}).then(response => {
//          console.log('模板编辑请求成功')
//          console.log(response.data)
//          this.$store.commit('SITE_FILETREE', response.data.fileTree.children)
//        })
        this.$emit('changeComponent','Sitesettings')
        this.modelManage = true
        console.log(1)
      },
      removeModel (id, operation, url) {
        let siteData = {
          id: id,
          operation: operation,
          path: url
        }
        console.log(siteData)
        this.$rest.post('/cms/rest/siteTemplate/fileOperate.do', siteData).then(response => {
          alert('删除成功')
          this.$rest.get('/cms/rest/siteTemplate/getDetail', {'id': siteData.id}).then(response => {
              alert('列表更新成功')
              this.$store.commit('SITE_FILETREE', response.data.fileTree.children)
            }, response => {
              console.log('列表更新失败')
            })
        }, response => {
          console.log('DELETE-MODEL-Fail 删除未成功!')
        })
      },
      uploadAttachment(uploadFileData, e) {
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
    },
    watch: {
      screenHeight (val) {
        if (!this.timer) {
          this.screenHeight = val
          this.timer = true
          let that = this
          setTimeout(function () {
            that.changescrollbarHeight()
            that.timer = false
          }, 1000)
        }
      }
    },
    components: {
      Pagination,
      Sitetemplate
    }
  }
</script>

<style>
  .sites-box{
    flex: 1;
    margin-left:20px;
  }
  .sites-header>div{
    position: relative;
    display: inline-block;
    padding: 7px 0;
    width: 49%;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    font-family: "microsoft yahei";
    color: #33c0cc;
    background-color: #fff;
    border-radius: 4px;
    cursor: pointer;
  }
  .sites-header>div img{
    margin-right: 8px;
    vertical-align: -5px;
  }
  .sites-header .c-open{
    position: absolute;
    width: 100%;
    height:30px;
    background-color: #fff;
    opacity: 0;
  }
  .sites-header>div.active .c-open{
    opacity: 1;
  }
  .sites-header .pc-btn{
    margin-right: 2%;
  }
  .sites-list{
    padding: 25px 25px 15px 25px;
    background-color: #fff;
    border-radius: 5px;
  }
  .sites-list .site-row{
    margin-left: -12px;
    margin-right: -12px;
  }
  .sites-list .box-out{
		margin-bottom: 19px;
		display: inline-block;
		padding: 0 12px;
		margin-top: 5px;
  }
  .sites-list .site-box{
    position: relative;
    box-shadow: 0 0 8px #333;
    cursor: pointer;
  }
  .sites-list .site-box img{
    width: 190px;
    height: 270px;
  }
  .sites-list .site-box .site-confirm{
    visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height:100%;
    background-color: rgba(0,0,0,0.6);
    opacity: 0;
    transition: opacity .5s;
    -ms-transition: opacity .5s;
    -moz-transition: opacity .5s;
    -webkit-transition: opacity .5s;
  }
  .sites-list .site-box:hover .site-confirm{
    visibility: visible;
    opacity: 1;
  }
  .sites-list .site-confirm p{
    position: absolute;
    bottom: 0;
    width: 100%;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    color: #fff;
  }
  .sites-list .site-confirm p span{
    color: #33c0cc;
  }
  .sites-list .site-confirm .s-btn{
    position: absolute;
    top: 50%;
    margin-top: -65px;
    width: 100%;
  }
  .sites-list .s-btn span{
    display: block;
    margin: 15px auto;
    width: 75px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #33c0cc;
    border: 1px solid #33c0cc;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
  }
  .sites-list .s-btn span:first-child:hover{
    color: #fff;
    background-color: #33c0cc;
  }
  .sites-list .s-btn span:last-child:hover{
     color: #fff;
     background-color: #ff9933;
     border: 1px solid #ff9933;
   }
  .sites-list .esay-scrollbar__bar.is-vertical{
    margin: 5% 0;
  }
  .box-out{float: left;}
  .updata-model{
    background: url("/static/res/images/cms/page-addBtnImg.png") no-repeat 50% 50%;
    width: 214px;
    height: 270px;
    cursor: pointer;
  }
  .el-message-box{
    width: 724px;
    height: 304px;
  }
  .updata-model .el-dialog__wrapper{cursor: default;}
  .updata-model .el-dialog__body{margin-left: 100px;}
  .updata-model .el-dialog__header{border-bottom: 1px #ddd solid}
  .updata-model .el-form-item__content{width: 552px;}
  .updata-model .el-form-item__content .el-input__inner{width: 552px;height: 36px;}
  .upload-demo{margin-left: 100px;}
  .upload-demo .el-button--primary{background-color: #fff;border: 1px solid #00aabb;height: 36px;}
  .upload-demo span{color: #00aabb;}
  .upload-demo .el-upload--text input[type="file"]{display: none;}
</style>
