<template>
  <div>
    <Loding></Loding>
    <div class="page-setting">
      <div class="page-setting-header">
        <p class="remind">
          <span>页面选择</span>（注意：以下所有非列表数据修改需保存后方能生效）
          <i>
            <img src="/static/res/images/cms/pagelist-add.png" @click="showAddPage = true" v-if="$jurisdiction('2710')"/>
            <img src="/static/res/images/cms/pagelist-delete.png" v-if="!currentPage.original && $jurisdiction('2709')"
                 @click="deleteCurrentPage"/>
          </i>
        </p>
        <ul class="pageclassification">
          <li v-for="(page,index) in pagelist" >
            <div class="pagelistbtn-box">
              <a href="javascript:void(0)" class="pagelistbtn" @click="changePage(page.id, page)"
                 :data-page-id="page.id">
                <span v-if="!page.original">*</span>{{ page.display }}
              </a>
              <img class="delete-cha" @click="deletePageList(page.id)" v-if="!page.original && $jurisdiction('2709')"
                   src="/static/res/images/cms/delete.png"/>
            </div>
          </li>
        </ul>
      </div>
      <div class="page-setting-content">
        <p class="remind"><span>页面设置</span>
          <!--<a>模块顺序设置<img src="/static/res/images/cms/SequenceSetting.png"/></a>-->
        </p>
        <!--分块循环-->
        <div class="content-block">
          <h3 class="title">首页banner
            <div class="display">
              <div class="checkbox">
                <switch-box :disabled="true"></switch-box>
                <!--新功能，开关需要绑定数据-->
              </div>
              <span>已显示</span>
            </div>
          </h3>
          <div class="content">
            <!--单行文本与多行文本引用Site-settings样式与判断-->
            <div class="list-box" v-for="(item,index) in pageitems">
              <template v-if="item.type == 'String'">
                <div class="settings-list" v-if="item.attributes.texttype === 'textarea'">
                  <div class="list-text">
                    <span style="color: red;" v-if="item.required">*</span>{{ item.display }} :
                  </div>
                  <div class="list-information">
                    <textarea :placeholder="item.description" v-model="item.value"></textarea>
                  </div>
                </div>
                <div class="settings-list" v-else-if="item.attributes.texttype === 'richtext'">
                  <div class="list-text">
                    <span style="color: red;" v-if="item.required">*</span>{{ item.display }} :
                  </div>
                  <div class="list-information">
                    <rich-editor v-model="item.value"></rich-editor>
                  </div>
                </div>
                <div class="settings-list" v-else>
                  <div class="list-text">
                    <span style="color: red;" v-if="item.required">*</span>{{ item.display }} :
                  </div>
                  <div class="list-information">
                    <input type="text" :placeholder="item.description" v-model="item.value"/>
                  </div>
                </div>
              </template>
              <div class="settings-list" v-if="item.type === 'Image'">
                <div class="list-text">
                  <span style="color: red;" v-if="item.required">*</span>{{ item.display }} :
                </div>
                <div class="list-information">
                  <image-uploader v-model="item.value" :field="item"></image-uploader>
                </div>
              </div>
              <div class="settings-list" v-if="item.type === 'Bool'">
                <div class="list-text">
                  <span style="color: red;" v-if="item.required === true">*</span>{{ item.display }} :
                </div>
                <div class="list-information">
                  <div class="checkbox">
                    <switch-box v-model="item.value"></switch-box>
                  </div>
                </div>
              </div>
              <site-list-field v-if="item.type === 'List'" :field="item" :siteId="$route.query.siteId" :key="item.name"
                               :templateId="$route.query.templateId" :pageId="currentPage.id"></site-list-field>
              <div class="settings-list" v-if="item.type === 'Color'">
                <div class="list-text">
                  <span style="color: red;" v-if="item.required === true">*</span>{{ item.display }} :
                </div>
                <div class="list-information">
                  <el-color-picker size="mini" v-model="item.value"></el-color-picker>
                </div>
              </div>
              <div class="settings-list" v-if="item.type === 'Attachment'">
                <div class="list-text">
                  <span style="color: red;" v-if="item.required === true">*</span>{{ item.display }} :
                </div>
                <div class="list-information">
                  <uploadFile v-model="item.value"></uploadFile>
                </div>
              </div>
            </div>
            <modal title="添加页面" :show.sync="showAddPage" v-if="showAddPage" @ok="addPage" okBtnText="确认" width="40%">
              <div class="pagelistAddList">
                <div class="pagelistAddText"><span style="color: red;">*</span>选择页面</div>
                <div class="pagelistAddInformation">
                  <el-select style="width:100%" v-model="addPageModel.id" filterable placeholder="请选择">
                    <el-option
                      v-for="page in pagelist"
                      v-if="page.original"
                      :key="page.id"
                      :label="page.display"
                      :value="page.id">
                    </el-option>
                  </el-select>
                </div>
              </div>
              <div class="pagelistAddList">
                <div class="pagelistAddText"><span style="color: red;">*</span>名称</div>
                <div class="pagelistAddInformation">
                  <input type="text" placeholder="名称" v-model="addPageModel.display"/>
                </div>
              </div>
            </modal>
          </div>
        </div>
      </div>
      <SitePreview></SitePreview>
    </div>
  </div>
</template>
<script>
  import SwitchBox from '../../../common/SwitchBox.vue'
  import RichEditor from './Site-editor.vue'
  import ImageUploader from './Site-image.vue'
  import SiteListField from './Site-list-field.vue'
  import Modal from '../../../common/Modal.vue'
  import uploadFile from './Site-file.vue'
  import SitePreview from './Site-preview.vue'

  export default {
    data() {
      return {
        active: false,
        parentFieldId: [],
        currentPage: {},
        idArray: '',
        sortNumArray: '',
        listId: '',
        showAddPage: false,
        addPageModel: {
          id: null,
          display: null
        },
        changed: false,
        fieldUnwatcher: []
      }
    },
    components: {
      SwitchBox,
      ImageUploader,
      RichEditor,
      Modal,
      SiteListField,
      uploadFile,
      SitePreview
    },
    computed: {
      pageitems() {
        return this.$store.state.sitetemplate.pageitems
      },
      listdata() {
        return this.$store.state.sitetemplate.listdata
      },
      listsvalue() {
        return this.$store.state.sitetemplate.listsvalue
      },
      lists() {
        return this.$store.state.sitetemplate.lists
      },
      pagelist() {
        return this.$store.state.sitetemplate.pagelist
      },
      fieldUpdated() {
        return this.$store.state.sitetemplate.fieldUpdated
      }
    },
    created() {
      this.$store.commit('SITE_PAGE_FIELD_UPDATE', false)
      this.$rest.get('/cms/rest/sitePage/list', {'templateId': this.$route.query.templateId}).then(response => {
        this.$store.commit('SITE_PAGELIST', response.data)
        this.changePage(this.pagelist[0].id)
      })
    },
    methods: {
      deletePageList(pageId) {
        this.$conf('是否确认删除当前页面？').then(() => {
          this.$rest.post('/cms/rest/sitePage/delete.do', {
            'templateId': this.$route.query.templateId,
            id: pageId
          }).then(() => this.refPageList())
        })
      },
      loadPageFields(selectedPage) {
        this.currentPage = selectedPage;
        this.$store.commit('SITE_PAGEID', selectedPage.id)
        this.$rest.get('/cms/rest/siteFieldValue/fieldValuesMap', {
          'templateId': this.$route.query.templateId,
          'pageId': selectedPage.id
        }).then(response => {
          this.$store.commit('SITE_PAGE_FIELD_UPDATE', false)
          if (this.fieldUnwatcher.length) {
            this.fieldUnwatcher.forEach((item) => item())
            this.fieldUnwatcher.splice(0, this.fieldUnwatcher.length)
          }
          this.$store.commit('SITE_PAGEITEMS', response.data)
          if (this.pageitems) {
            for (let i = 0; i < this.pageitems.length; i++) {
              if (this.pageitems[i].type === 'List') {
                continue
              }
              this.fieldUnwatcher.push(this.$watch(function () {
                return this.pageitems[i].value
              }, () => {
                this.$store.commit('SITE_PAGE_FIELD_UPDATE', true)
                this.fieldUnwatcher.forEach((item) => item())
                this.fieldUnwatcher.splice(0, this.fieldUnwatcher.length)
              }))
            }
          }
        })
        this.$nextTick(() => {
          $('.pagelistbtn').removeClass('active').filter('[data-page-id="' + this.currentPage.id + '"]').addClass('active');
        });
      },
      changePage(id) {
        let selectedPage = null
        for (let i = 0; i < this.pagelist.length; i++) {
          let page = this.pagelist[i];
          if (page.id === id) {
            selectedPage = page
            break;
          }
        }
        if (!selectedPage || this.currentPage.id === selectedPage.id) {
          return
        }
        if (this.fieldUpdated) {
          //字段变更?
          this.$conf('当前字段修改未保存，是否忽略？').then(() => this.loadPageFields(selectedPage))
        } else {
          this.loadPageFields(selectedPage)
        }
      },
      addPage() {
        this.$rest.post('/cms/rest/sitePage/create.do', Object.assign({'templateId': this.$route.query.templateId}, this.addPageModel))
          .then(() => {
            this.showAddPage = false
            this.addPageModel.id = null
            this.addPageModel.display = null
            this.refPageList()
          })
      },
      deleteCurrentPage() {
        this.deletePageList(this.currentPage.id)
      },
      refPageList() {
        this.$rest.get('/cms/rest/sitePage/list', {
          'templateId': this.$route.query.templateId
        }).then(response => {
          this.$store.commit('SITE_PAGELIST', response.data)
        })
      }
    }
  }
</script>

<style>
  .page-setting {
    margin-top: 60px;
  }

  .list-box.active .list-text {
    width: 22%;
  }

  .list-box.active .list-information {
    width: 75%;
  }

  .page-setting-header, .page-setting-content {
    margin: 10px 20px 0px 20px;
    min-width: 1084px;
    background-color: #fff;
    border-radius: 10px;
    /*max-width: 1090px;**********测试用-加了右侧样式去掉**************/
  }

  .page-setting-content {
    padding-bottom: 50px;
    margin-bottom: 20px;
  }

  .page-setting-header {
    margin-bottom: 10px;
  }

  .page-setting-content .remind, .page-setting-header .remind {
    color: #33c0cc;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 30px;
    border-bottom: 1px solid #ededed;
    padding: 20px;
  }

  .remind span {
    color: #666666;
    margin-right: 10px;
    font-weight: bold;
  }

  .remind i {
    float: right;
  }

  .remind i img {
    margin-left: 20px;
  }

  .remind a {
    float: right;
    text-decoration: none;
    color: #999999;
  }

  .remind a img {
    margin-top: -2px;
    margin-left: 8px;
  }

  .pageclassification {
    padding: 20px;
    padding-top: 0;
  }

  .pageclassification li {
    float: left;
    margin-right: 20px;
    margin-bottom: 20px;
    position: relative;
  }

  .pageclassification li a {
    display: block;
    color: #33c0cc;
    border: 1px solid #33c0cc;
    padding: 8px 15px;
    border-radius: 18.5px;
    background: #fff;
    text-decoration: none;
  }

  .pageclassification li a.active {
    background: #33c0cc;
    color: #fff;
  }

  .pagelistbtn-box {
    position: relative;
  }

  .pageclassification:after, .pagelistAddList:after {
    display: block;
    clear: both;
    visibility: hidden;
    height: 0;
    overflow: hidden;
    content: "";
  }

  .pageclassification .delete-cha {
    position: absolute;
    top: -7px;
    right: 8px;
    display: none;
    cursor: pointer;
  }

  .pageclassification .pagelistbtn-box:hover .delete-cha {
    display: block;
  }

  .content-block h3 {
    padding: 16px 20px;
    border-bottom: 1px solid #ededed;
    color: #33c0cc;
    font-weight: bold;
    font-size: 14px;
    background: #fafafa;
  }

  .content-block h3 .display {
    float: right;
    position: relative;
  }

  .content-block .display .checkbox {
    position: absolute;
    left: -45px;
    top: -12px;
  }

  label {
    margin: 0;
  }

  .deleteInformation {
    position: absolute;
    background: #fff;
    border: 1px solid #d0d5d7;
    box-shadow: 0px 5px 10px -3px #d0d5d7;
    -moz-box-shadow: 0px 5px 10px -3px #d0d5d7;
    -webkit-box-shadow: 0px 5px 10px -3px #d0d5d7;
    padding: 25px 25px 25px 20px;
    border-radius: 5px;
    width: 274px;
    right: -17px;
    top: 25px;
    z-index: 999;
    display: none;
  }

  .deleteInformation p {
    color: #333333;
    font-size: 14px;
    margin-bottom: 25px;
  }

  .deleteInformation .deleteButton {
    float: right;
  }

  .deleteInformation .deleteButton button {
    border: none;
    border-radius: 5px;
    font-size: 12px;
    padding: 8px 18px;
    margin-left: 10px;
  }

  .deleteInformation .deleteButton .sure {
    color: #fff;
    background: #ff9933;
  }

  .deleteInformation .deleteButton .cancel {
    color: #333;
    background: #d3d3d3;
  }

  .deleteInformation img {
    position: absolute;
    top: -6px;
    right: 27px;
  }

  .deleteInformation.active {
    display: block;
  }

  .settings-list {
    display: block;
    font-size: 14px;
    margin-bottom: 16px;
  }

  .settings-list:after {
    display: block;
    clear: both;
    visibility: hidden;
    height: 0;
    overflow: hidden;
    content: "";
  }

  .page-setting-content .listbuttom {
    margin-right: 24px;
  }

  .remind img {
    cursor: pointer;
  }

  .pagelistAddAlertMask {
    background: rgba(0, 0, 0, 0);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1030;
    visibility: hidden;
    transition: 0.5s all ease;
    -moz-transition: 0.5s all ease;
    -webkit-transition: 0.5s all ease;
    -o-transition: 0.5s all ease;
  }

  .pagelistAddAlertMask {
    border: none;
  }

  .pagelistAddAlertMask.in {
    background: rgba(0, 0, 0, 0.5);
    visibility: visible;
  }

  .pagelistAdd {
    opacity: 0;
    -webkit-transform: translate(0, -5%);
    transform: translate(0, -5%);
    transition: 0.5s all ease;
    -moz-transition: 0.5s all ease;
    -webkit-transition: 0.5s all ease;
    -o-transition: 0.5s all ease;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.2);
    background-clip: padding-box;
    margin: 30px auto;
    width: 70%;
    position: fixed;
    top: 5%;
    left: 50%;
    margin-left: -35%;
    height: 75%;
    z-index: -1;
    border-radius: 5px 5px 0 0;
  }

  .pagelistAdd {
    width: 40%;
    margin-left: -20%;
    height: auto;
  }

  .pagelistAdd.in {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
    opacity: 1;
    z-index: 9999;
  }

  .pagelistAdd h4 {
    padding: 15px;
    margin: 0;
    border-bottom: 1px solid #e5e5e5;
  }

  .pagelistAddText {
    width: 20%;
    float: left;
    text-align: right;
    margin-top: 7px;
  }

  .pagelistAddInformation {
    width: calc(80% - 30px);
    float: left;
    margin-left: 30px;
  }

  .pagelistAddInformation input, .pagelistAddInformation select {
    border: 1px solid #d0d5d7;
    color: #666666;
    border-radius: 5px;
    height: 34px;
    width: 100%;
    text-indent: 10px;
  }

  .pagelistAddList {
    margin-top: 20px;
  }

  .pagelistAddBottom .pagelistAddCancel {
    background: #cfd5d8;
    color: #333;
  }

  .pagelistAddBottom .pagelistAddSure {
    background: #33c0cc;
    color: #fff;
  }

  .pagelistAddBottom button {
    font-size: 14px;
    border: none;
    border-radius: 3px;
    padding: 8px 25px;
    margin-left: 5px;
  }

  .pagelistAddBottom {
    background: #f2f4f5;
    padding: 15px 20px;
    text-align: right;
    border-radius: 0 0 5px 5px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
    margin-top: 30px;
  }

  .originallistselected {
    border: 1px solid #d0d5d7;
    color: #666666;
    border-radius: 0 0 5px 5px;
    width: 80%;
    text-indent: 10px;
    background: #fff;
    z-index: 9999;
    position: absolute;
    padding-top: 2px;
    top: 31px;
    border-top: none;
    display: none;
  }

  .originallistselected p {
    height: 34px;
    line-height: 34px;
    padding: 0;
    margin: 0;
  }

  .pagelistAddInformation {
    position: relative;
  }

  .changeData {
    border: 1px solid #d0d5d7;
    color: #666666;
    border-radius: 5px;
    width: 80%;
    text-indent: 10px;
    height: 34px;
    line-height: 34px;
    display: inline-block;
  }

  .pagelistAddInformation.in .originallistselected {
    display: block;
  }
  /***颜色选择器***/
  .el-color-picker__panel .el-color-picker__empty:before{content: none;}
  .el-color-picker__panel .el-color-picker__empty{background: url("/static/res/images/cms/icon.png")no-repeat -100px -1000px;top:10px;left: 8px;width: 15px;height: 10px;}
  .el-color-picker__panel .el-color-dropdown__main-wrapper .el-color-hue-slider{width: 16px;cursor: pointer;z-index: 100;}
  .el-color-picker__panel .el-color-svpanel{width: 270px;cursor: pointer;}
</style>
