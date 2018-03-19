<template>
  <div class="settings-list">
    <div class="list-text">
      <div class="list-title">
        <span style="color: red;" v-if="field.required === true">*</span>{{ field.display }} :
      </div>
    </div>
    <div class="list-information">
      <div class="listbuttom">
        <div class="editList" v-on:click="sort($event)">排序</div>
        <div @click="addList" class="addList">添加</div>
      </div>
    </div>
    <div class="list-text"></div>
    <div class="list-information list-field">
      <table>
        <thead>
        <tr class="tableHeader">
          <th v-for="child in field.childFields" :width="thWidth" v-if="child.showInList">{{ child.display }}</th>
          <th class="order">顺序</th>
          <th class="operation">操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-if="!field.value || field.value.length === 0">
          <td colspan="100" class="emptyList">点击添加按钮添加数据</td>
        </tr>
        <tr v-for='(rowData,index) in field.value'>
          <template v-for="child in field.childFields" v-if="child.showInList">
            <td v-if="child.type === 'Category'">
              <template v-if="rowData[child.name]">
                {{categoryMap[rowData[child.name]]}}
              </template>
            </td>
            <td v-if="child.type === 'DataUpdateTime'">{{ rowData[child.name] }}</td>
            <td v-if="child.type === 'Image'">
            	<div class="pageListImg-box">
              	<img :src="GLOBAL.IMAGE_ROOT + rowData[child.name]" class="pageListImg"
                   v-if="rowData[child.name]"/>
              </div>
            </td>
            <td v-if="child.type === 'Bool'">
              <div class="checkbox">
                <switch-box v-model="rowData[child.name]" :disabled="true"></switch-box>
              </div>
            </td>
            <td v-if="child.type === 'Color'">
              <div style="width:30px;height:30px" v-if="rowData[child.name]"
                   :style="'background-color:'+rowData[child.name]"></div>
            </td>
            <template v-if="child.type === 'String'">
              <td v-if="child.attributes.texttype === 'richtext'" class="changeRichtext">
                {{changeRichText(rowData[child.name])}}
              </td>
              <td v-else>{{rowData[child.name]}}</td>
            </template>
          </template>
          <td><input @change="order($event)" :data-id="rowData._id" class="sortNum"
                     v-model="rowData._sortNum"/></td>
          <td>
            <img v-on:click="editList(rowData['_id'])" class="edit"
                 src="/static/res/images/cms/edit.png"/>
            <img v-on:click="deleteListItem(rowData['_id'])"
                 class="delete"
                 src="/static/res/images/cms/pagelist-delete.png"/>
          </td>
        </tr>
        </tbody>
      </table>
    	<listPagination @changePage="loadList" :rowCount="rowCount" v-if="rowCount > 5"></listPagination>
    </div>
    <site-alert-list :pageId="pageId" :siteId="siteId" :field="field.name"
                     :editType="editType" :id="editId"
                     :show.sync="showListModal" @saved="loadList"></site-alert-list>
  </div>
</template>
<script>
  import SiteAlertList from './Site-alertList'
  import listPagination from './ListPagination'
  import SwitchBox from '../../../common/SwitchBox.vue'

  export default {
    data() {
      return {
        deleteId: null,
        editId: null,
        editType: 'create',
        showListModal: false,
        idArray: '',
        sortNumArray: '',
        categoryMap: {},
        currentPage: 1,
        pageSize: 5,
        thWidth: ''
      }
    },
    props: {
      field: {
        type: Object,
        required: true
      },
      pageId: null,
      siteId: null,
      templateId: null
    },
    components: {
      SwitchBox,
      SiteAlertList,
      listPagination
    },
    watch: {
      pageId() {
        this.loadList()
      }
    },
    created() {
      this.loadList(this.currentPage)
      this.trLength = 0
      for(let i in this.field.childFields){
      	if(this.field.childFields[i].showInList === true){
      		this.trLength++
      	}
      }
      this.thWidth = (86 / this.trLength)+'%'
    },
    methods: {
      loadList: function (currentPage) {
        if (!this.pageId) {
          this.pageId = ''
        }
        if (!this.templateId) {
          return
        }
        this.currentPage = currentPage
        this.$rest.get('/cms/rest/siteFieldValue/getListData', {
            'field': this.field.name,
            'templateId': this.templateId,
            'pageId': this.pageId,
            'index': this.currentPage,
            'size': this.pageSize
          }
        ).then(response => {
          this.field.value = response.data.fieldValuesMap
          this.rowCount = response.data.rowCount
          let categoryIdMap = {}
          for (let key in this.field.childFields) {
            let field = this.field.childFields[key]
            if (field.type === 'Category') {
              //目录字段
              for (let i = 0; i < this.field.value.length; i++) {
                let row = this.field.value[i];
                if (row[field.name]) {
                  categoryIdMap[row[field.name]] = 1
                }
              }
            }
          }
          let categoryIds = Object.keys(categoryIdMap)
          if (categoryIds.length) {
            this.$rest.get('/cms/rest/siteCategory/list4Page', {'ids': categoryIds.join(',')}).then(response => {
              this.categoryMap = response.data
            })
          }
        })
      },
      deleteListItem(id) {
        this.$confirm('是否确认删除列表项？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          this.$rest.post('/cms/rest/siteFieldValue/deleteListItem.do', {'id': id}).then(() => {
            this.loadList()
          })
        })
      },
      addList() {
        this.editType = 'create';
        this.showListModal = true
      },
      editList(id) {
        this.editId = id;
        this.editType = 'edit';
        this.showListModal = true
      },
      changeRichText(input) {
        if (!input) return input
        let c = document.createElement('div')
        c.innerHTML = input
        let text = $.trim(c.innerText)
        if (text.length > 50) {
          text = text.substr(0, 50) + '...'
        }
        return text
      },
      sort(event) {
      	if(this.idArray === ''){
      		return
      	}
        this.idArray = this.idArray.substr(0, this.idArray.length - 1)
        this.sortNumArray = this.sortNumArray.substr(0, this.sortNumArray.length - 1)
        this.$rest.post('/cms/rest/siteFieldValue/updateSortNum.do', {
          'idArray': this.idArray,
          'sortNumArray': this.sortNumArray
        }).then(() => {
          this.loadList()
          this.idArray = ''
          this.sortNumArray = ''
        })
      },
      order(event) {
        this.idArray += event.target.getAttribute('data-id') + ','
        this.sortNumArray += Number(event.target.value) + ','
      }
    }
  }
</script>
<style>
  /*.page-list-text:after {
    display: block;
    clear: both;
    visibility: hidden;
    height: 0;
    overflow: hidden;
    content: "";
  }*/

  /*.page-list-title {
    display: inline-block;
    margin-top: 10px;
  }*/
	.pageListImg-box{
		max-width: 130px;
	}
  .pageListImg {
    max-width: 100%;
    margin: 0 auto;
    height: 42px;
    display: block;
    margin-top: 9px;
  }

  .list-field table {
    width: 100%;
  }

  .list-field table thead th {
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    padding: 10px;
  }

  .list-field table tbody tr {
    border-bottom: 1px solid #eee;
  }

  .list-field table tbody tr:nth-child(odd) {
    background: #f4f7fb;
  }

  .list-field table tbody td {
    padding: 16px;
  }
  
  @media (max-width: 1600px) {
  	.list-field table tbody td {
	    padding: 16px 10px;
	  }
  }
  
  .list-field table tbody td:last-child{
    padding: 16px 1px;
  }

  .list-field table .order {
    width: 6%;
  }

  .list-field .sortNum {
    border: 1px solid #d0d5d7;
    color: #666666;
    border-radius: 5px;
    height: 34px;
    width: 100%;
    text-indent: 10px;
  }

  table .operation {
    width: 8%;
  }

  table .edit {
    margin-right: 10px;
    margin-top: 3px;
  }

  table .edit, table .delete {
    cursor: pointer;
  }

  .el-pagination {
    float: right;
    margin-right: 0px;
    margin-top: 5px;
  }

  .go-page-list {
    display: inline-block;
  }
</style>

