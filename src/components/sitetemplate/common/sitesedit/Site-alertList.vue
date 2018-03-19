<template>
  <!--listAlert-->
  <modal ref="dialog" title="添加列表" :show.sync="show" @ok="saveList()">
    <div class="listscorll">
      <!--默认为目录样式，判断后用点击事件加载列表-->
      <div class="listAlertContent" v-for="(item,index) in fieldList">
        <div class="settings-list" :data-name="item.name" :data-type="item.type" v-if="item.type === 'Category'">
          <div class="list-text">
            <span style="color: red;" v-if="item.required === true">*</span>{{ item.display }}:
          </div>
          <div class="list-information">
            <site-category v-model="valueMap[item.name]" :siteId="siteId" :editType="editType" :show="show"></site-category>
          </div>
        </div>
        <template v-if="item.type == 'String'">
          <div class="settings-list" v-if="item.attributes.texttype === 'richtext'"
               :data-value="valueMap[item.name]" :data-name="item.name" :data-type="item.type">
            <div class="list-text">
              <span style="color: red;" v-if="item.required === true">*</span>{{ item.display }} :
            </div>
            <div class="list-information">
              <rich-editor v-model="valueMap[item.name]" :z-index="2000"></rich-editor>
            </div>
          </div>
          <div class="settings-list" v-else-if="item.attributes.texttype === 'textarea'" :data-name="item.name"
               :data-type="item.type">
            <div class="list-text">
              <span style="color: red;" v-if="item.required === true">*</span>{{ item.display }} :
            </div>
            <div class="list-information">
                <textarea :placeholder="item.description" v-model="valueMap[item.name]">{{ valueMap[item.name]
                  }}</textarea>
            </div>
          </div>
          <div class="settings-list" v-else :data-name="item.name" :data-type="item.type">
            <div class="list-text">
              <span style="color: red;" v-if="item.required === true">*</span>{{ item.display }} :
            </div>
            <div class="list-information">
              <input type="text" :placeholder="item.description" v-model="valueMap[item.name]"/>
            </div>
          </div>
        </template>
        <div class="settings-list" v-if="item.type === 'Image'" :data-name="item.name" :data-type="item.type">
          <div class="list-text">
            <span style="color: red;" v-if="item.required === true">*</span>{{ item.display }} :
          </div>
          <div class="list-information">
            <image-uploader v-model="valueMap[item.name]" :field="item"></image-uploader>
          </div>
        </div>
        <div class="settings-list" v-if="item.type === 'Bool'" :data-name="item.name" :data-type="item.type">
          <div class="list-text">
            <span style="color: red;" v-if="item.required === true">*</span>{{ item.display }} :
          </div>
          <div class="list-information">
            <div class="checkbox">
              <switch-box v-model="valueMap[item.name]"></switch-box>
            </div>
          </div>
        </div>
        <div class="settings-list" v-if="item.type === 'Color'" :data-name="item.name" :data-type="item.type">
          <div class="list-text">
            <span style="color: red;" v-if="item.required === true">*</span>{{ item.display }} :
          </div>
          <div class="list-information">
            <el-color-picker size="mini" v-model="valueMap[item.name]"></el-color-picker>
          </div>
        </div>
      </div>
      <div class="listAlertContent">
        <div class="settings-list">
          <div class="list-text">
            顺序 :
          </div>
          <div class="list-information">
            <input v-model="sortNum" placeholder="默认为0"/>
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
  import RichEditor from './Site-editor.vue'
  import ImageUploader from './Site-image.vue'
  import SiteCategory from './Site-category.vue'
  import Modal from '../../../common/Modal.vue'
  import SwitchBox from '../../../common/SwitchBox.vue'

  export default {
    data() {
      return {
        visible: false,
        sortNum: 0,
        fieldList: [],
        valueMap: {},
        siteCategory: {},
        listMenuMask: false,
        menuId: '',
        showCategory: '123'
      }
    },
    props:
      {
        show: {
          type: Boolean,
          default: false
        },
        field: null,
        siteId: {
          required: true
        },
        pageId: {
          required: true
        },
        id: null,
        editType: {
          type: String,
          default: 'create'
        }
      },
    components: {
      RichEditor,
      SiteCategory,
      ImageUploader,
      Modal,
      SwitchBox
    },
    watch: {
      show(val) {
        this.$emit('update:show', val);
        if (val) {
          this.loadStruct()
        }
      }
    },
    created() {
      this.loadStruct()
    },
    methods: {
      loadStruct() {
        if (!this.pageId) {
        	this.pageId = ''
        }
        if (this.editType === 'create') {
          this.$rest.get('/cms/rest/siteFieldValue/getListItemMeta', {
            'field': this.field,
            'siteId': this.siteId,
            'pageId': this.pageId
          }).then(response => {
            for (let key in this.valueMap) {
              this.$delete(this.valueMap, key);
            }
            this.fieldList = response.data.meta.childFields
            this.sortNum = response.data.nextSortNum
            console.log('response.data.meta.childFields')
          })
        } else {
          //更新
          this.$rest.get('/cms/rest/siteFieldValue/getListItemData', {
            'id': this.id,
            'siteId': this.siteId,
            'pageId': this.pageId
          }).then(response => {
            this.fieldList = response.data.meta.childFields;
            this.valueMap = response.data.value;
            this.sortNum = this.valueMap['_sortNum'];
          })
        }
      },
      saveList() {
      	console.log('this.fieldList')
      	console.log(this.fieldList)
      	console.log(this.valueMap)

        if (!this.pageId) {
        	this.pageId = ''
        }
        var fieldValueJson = {}
        for (var key in this.fieldList) {
          var value = this.valueMap[key]
        	if(this.fieldList[key].required === true){
        		if(value === undefined || value === null){
        			this.$confirm('字段[' + this.fieldList[key].display + ']不能为空', '提示', {
			            confirmButtonText: '确定',
			            type: 'warning'
			          }
			        ).then(() => {
			        })
			        return
        		}
        	}
          fieldValueJson[key] = {value: value, type: this.fieldList[key].type}
        }
        var reg = /^[0-9]+.?[0-9]*$/;
        if(!reg.test(this.sortNum)){
      		this.$confirm('字段[排序]必须为数字', '提示', {
	            confirmButtonText: '确定',
	            type: 'warning'
	          }
	        ).then(() => {
	        })
	        return
      	}
        if (this.menuId !== '') {
          fieldValueJson.category = {value: this.menuId, type: 'category'}
        }
        var fieldValueJsonString = JSON.stringify(fieldValueJson)
        if (this.editType === 'edit') {
          this.$rest.post('/cms/rest/siteFieldValue/updateListItem.do', {
            'fieldValueJson': fieldValueJsonString,
            'templateId': this.$route.query.templateId,
            'pageId': this.pageId,
            'sortNumber': this.sortNum,
            'parentField': this.field,
            'parentFieldId': this.id
          }).then(() => {
            this.$emit('saved', this.field)
            this.$emit('update:show', false);
            this.$tip('修改成功', 'success')
          })
        } else if (this.editType === 'create') {
          this.$rest.post('/cms/rest/siteFieldValue/createListItem.do', {
            'fieldValueJson': fieldValueJsonString,
            'templateId': this.$route.query.templateId,
            'pageId': this.pageId,
            'sortNumber': this.sortNum,
            'parentField': this.field
          }).then(() => {
            this.$emit('saved', this.field)
            this.$emit('update:show', false);
            this.$tip('保存成功', 'success')
          })
        }
        this.menuId = ''
        this.emptySortNum()
      },
      emptySortNum() {
        this.sortNum = ''
      }
    }
  }
</script>

<style>
	.el-dialog{
		border-radius: 15px !important;
	}
	
	.addListBottom{
	    border-radius: 0 0 15px 15px;
	}
	
	.el-dialog__header{
		border-bottom: 1px solid #d0d5d7;
	}
	
  .settings-list {
    display: block;
    font-size: 14px;
    margin-bottom: 16px;
  }

  .listMenuMask {
    z-index: 9999;
  }

  .settings-list:after {
    display: block;
    clear: both;
    visibility: hidden;
    height: 0;
    overflow: hidden;
    content: "";
  }

  .listAlertContent {
    padding: 0 50px;
  }

  .listAlertMask, .listMenuMask, .listDeleteMask {
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

  .listMenuMask {
    border: none;
  }

  .listAlertMask.in, .listMenuMask.in, .listDeleteMask.in {
    background: rgba(0, 0, 0, 0.5);
    visibility: visible;
  }

  .listAlert, .listMenuBox, .listDeleteBox {
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
    z-index: -1;
    border-radius: 5px 5px 0 0;
  }

  .listMenuBox {
    width: 50%;
    margin-left: -25%;
    height: 60%;
  }

  .listscorll {
    overflow-x: hidden;
    overflow-y: auto;
    background-color: #fff;
    padding-top: 16px;
  }

  .listAlert.in, .listMenuBox.in, .listDeleteBox.in {
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
    opacity: 1;
    z-index: 9999;
  }

  .listAlert h4, .listMenuBox h4 {
    padding: 15px;
    margin: 0;
    border-bottom: 1px solid #e5e5e5;
  }

  .listAlertContent {
    padding: 0 50px;
  }

  .listAlert .img-box {
    margin-top: 0;
  }

  .addListBottom, .listMenuBoxBottom {
    background: #f2f4f5;
    padding: 15px 20px;
    text-align: right;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  }

  .addListBottom button {
    font-size: 14px;
    border: none;
    border-radius: 3px;
    padding: 8px 25px;
    margin-left: 5px;
  }

  .addListBottom .addListCancel, .listMenuBox .listMenuCancel {
    background: #cfd5d8;
    color: #333;
  }

  .addListBottom .addListSave {
    background: #33c0cc;
    color: #fff;
  }

  .listMenu {
    border: 1px solid #d0d5d7;
    color: #666666;
    border-radius: 5px;
    height: 34px;
    width: 100%;
    text-indent: 10px;
    position: relative;
    color: #aaaaaa;
    padding-top: 6px;
  }

  .listMenu img {
    position: absolute;
    right: 10px;
    top: 13px;
  }

  .choiceListBox {
    background: #fff;
  }

  .choiceListBox .in {
    background: #F5F5F5;
  }

  .choiceListBox li:hover {
    background: #F5F5F5;
  }

  .choiceListBox {
    overflow-x: hidden;
    overflow-y: auto;
    margin: 20px;
    border: 1px solid #ededed;
    height: calc(100% - 90px);
  }

  .choiceListBox li {
    border-top: 1px solid #ededed;
    padding: 13px 13px;
    font-size: 14px;
    color: #333;
		text-align: left;
  }

  .choiceListBox li:hover {
    background: #f5f5f5;
  }

  .choiceListBox li:nth-of-type(1) {
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

  .choiceListBox .listsChild1 {
    padding-left: 40px;
  }

  .choiceListBox .listsChild2 {
    padding-left: 80px;
  }

  .choiceListBox li {
    cursor: pointer;
  }
  
  .el-dialog{
  	margin-top: 3% !important;
  }
</style>
