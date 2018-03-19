<template>
  <div>
    <div class="settings-box">
      <div class="settings-content">
        <p class="remind">（注意：以下所有非列表数据修改需保存后方能生效）</p>
        <div class="list-box" v-for="(item,index) in items">
          <div class="settings-list" v-if="item.type === 'String' && item.attributes.texttype === 'richtext'">
            <div class="list-text">
              <span style="color: red;" v-if="item.required === true">*</span>{{ item.display }} :
            </div>
            <div class="list-information">
              <Editor v-model="richText"></Editor>
            </div>
          </div>
          <div class="settings-list" v-if="item.type === 'String' && JSON.stringify(item.attributes) == '{}'">
            <div class="list-text">
              <span style="color: red;" v-if="item.required === true">*</span>{{ item.display }} :
            </div>
            <div class="list-information">
              <input type="text" :placeholder="item.description" v-model="item.value"/>
            </div>
          </div>
          <div class="settings-list" v-if="item.type === 'String' && item.attributes.texttype === 'textarea'">
            <div class="list-text">
              <span style="color: red;" v-if="item.required === true">*</span>{{ item.display }} :
            </div>
            <div class="list-information">
              <textarea :placeholder="item.description" v-model="item.value">{{ item.value }}</textarea>
            </div>
          </div>
          <div class="settings-list" v-if="item.type === 'Image'">
            <div class="list-text">
              <span style="color: red;" v-if="item.required === true">*</span>{{ item.display }} :
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
          <site-list-field v-if="item.type === 'List'" :field="item" :siteId="$route.query.siteId"
                           :templateId="$route.query.templateId"></site-list-field>
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
      </div>
    </div>
  </div>
</template>

<script>

  import SiteListField from './Site-list-field.vue'
  import Editor from './Site-editor'
  import ImageUploader from './Site-image.vue'
  import uploadFile from './Site-file.vue'
  import SwitchBox from "../../../common/SwitchBox.vue";

  export default {
    data() {
      return {
        listDeleteMask: false,
        parentFieldId: [],
        listId: '',
        clickList: '',
        richText: '',
        idArray: '',
        sortNumArray: '',
        listEditId: '',
        listEditField: '',
        listEditType: 'create',
        showListModal: false,
        currentPageId: '',
        imageUrl: '/static/res/images/cms/default-addBtnImg.jpg',
        fieldUnwatcher: []
      }
    },
    components: {
      SwitchBox,
      SiteListField,
      ImageUploader,
      Editor,
      uploadFile
    },
    computed: {
      items() {
        return this.$store.state.sitetemplate.items
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
      fieldUpdated() {
        return this.$store.state.sitetemplate.fieldUpdated
      }
    },
    created() {
      this.$rest.get('/cms/rest/siteFieldValue/fieldValuesMap', {'templateId': this.$route.query.templateId}).then(response => {
        this.$store.commit('SITE_PAGE_FIELD_UPDATE', false)
	      if (this.fieldUnwatcher.length) {
	        this.fieldUnwatcher.forEach((item) => item())
	        this.fieldUnwatcher.splice(0, this.fieldUnwatcher.length)
	      }
	      this.$store.commit('SITE_ITEMS', response.data)
	      if (this.items) {
	        for (let i = 0; i < this.items.length; i++) {
	          if (this.items[i].type === 'List') {
	            continue
	          }
	          this.fieldUnwatcher.push(this.$watch(function () {
	            return this.items[i].value
	          }, () => {
	            this.$store.commit('SITE_PAGE_FIELD_UPDATE', true)
	            this.fieldUnwatcher.forEach((item) => item())
	            this.fieldUnwatcher.splice(0, this.fieldUnwatcher.length)
	          }))
	        }
	      }
      })
    }
  }
</script>
<style scoped>
  .settings-box {
    position: relative;
    overflow: hidden;
  }

  .settings-content {
    margin: 10px 25px 0px 25px;
    padding: 20px;
    margin-bottom: 20px;
    min-width: 1084px;
    background-color: #fff;
    border-radius: 10px;
    margin-top: 60px;
  }

  .remind {
    color: #33c0cc;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 30px;
  }

  .listMenuBox ul {
    overflow-x: hidden;
    overflow-y: auto;
    margin: 20px;
    border: 1px solid #ededed;
    height: calc(100% - 90px);
  }

  .listMenuBox ul li {
    border-top: 1px solid #ededed;
    padding: 13px 13px;
    font-size: 14px;
    color: #333;
  }

  .listMenuBox ul li:hover {
    background: #f5f5f5;
  }

  .listMenuBox ul li:nth-of-type(1) {
    border-top: none;
  }

  .listDeleteBox {
    width: 300px;
    margin-left: -150px;
    height: auto;
  }

  .listDeleteBox h3 {
    padding: 20px;
    border-bottom: 1px solid #e5e5e5;
    font-size: 18px;
  }

  .listDeleteButton {
    float: right;
  }

  .listDeleteButton button {
    float: left;
    font-size: 14px;
    border: 1px solid transparent;
    margin: 15px 15px 15px 0;
    padding: 5px 10px;
  }

  .listDeleteButton .listDeleteCancel {
    color: #333;
    background-color: #fff;
    border-color: #ccc;
  }

  .listDeleteButton .listDeleteSure {
    color: #fff;
    background-color: #1C7EBB;
    border-color: #196fa5;
  }

  .uploadLogoBtn {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
  }

  .settingListImg {
    width: 130px;
    height: 42px;
    display: block;
    margin-top: 9px;
  }

  .uploadLogoBtn {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .el-icon-plus:before {
    content: none;
  }
</style>
