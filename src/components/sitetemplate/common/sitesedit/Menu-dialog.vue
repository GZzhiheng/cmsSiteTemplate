<template>
  <!--模态框-->
  <modal :title="editType === 'create'?'创建子菜单':'编辑菜单'" @ok="pageEdit" width="40%" :show.sync="show">
    <div class="menuList">
      <ul class="menuRow" v-if="parent && parent.id">
        <li class=""><span>上级菜单：</span></li>
        <li><p class="form-control" style="margin: 0;background-color: #eee;cursor:no-drop;">
          {{parent.name}}</p>
        </li>
      </ul>
      <ul class="menuRow">
        <li class=""><b style="color: red;">*</b><span>菜单名称：</span></li>
        <li class="">
        	<input class="form-control" teype="text" v-model="name" v-on:input="verification($event)"/>
        	<p class="repeatText">菜单名称已存在</p>
        </li>
      </ul>
      <ul class="menuRow">
        <li class="">菜单状态：</li>
        <li class="">
          <switch-box v-model="status" @input="changeStatus" :disabled="changeData.isIndex"></switch-box>
        </li>
      </ul>
      <ul class="menuRow">
        <li class=""><b style="color: red;">*</b>引用页面：</li>
        <li>
          <el-select v-model="referPageId" filterable placeholder="请选择">
            <el-option
              v-for="page in pageList"
              :key="page.id"
              :label="page.original ? page.display : '*' + page.display"
              :value="page.id">
            </el-option>
          </el-select>
        </li>
      </ul>
      <ul class="menuRow">
        <li class="">菜单URL：</li>
        <li class=""><input type="text" class="form-control" v-model="urlSegment" @input="aaa"></li>
      </ul>
      <ul class="menuRow">
        <li class="">生成路径：</li>
        <li class="">
          <switch-box v-model="generateDirectory"></switch-box>
        </li>
      </ul>
      <ul class="menuRow">
        <li class=""><b style="color: red;">*</b>排序：</li>
        <li class=""><input type="text" class="form-control" v-model="sortNum"></li>
      </ul>
      <ul class="menuRow">
        <li class="">菜单说明：</li>
        <li class="">
          <textarea rows="3" class="form-control" v-model="remark"></textarea>
        </li>
      </ul>
      <ul class="menuRow">
        <li class="">菜单图片：</li>
        <li class="">
          <image-uploader v-model="changeData.img" :field="{attributes:{}}"></image-uploader>
        </li>
      </ul>
    </div>
  </modal>
  <!--end-模态框-->
</template>

<script>
  import ImageUploader from './Site-image.vue'
  import Modal from "../../../common/Modal.vue";
  import SwitchBox from "../../../common/SwitchBox.vue";

  export default {
    props: ['menuData', 'pageList', 'menuTitle', 'parent', 'show', 'editType'],
    components: {
      Modal,
      SwitchBox,
      ImageUploader
    },
    data () {
      return {
        selestOpen: false,
        data2: null,
        showCut: false,
        changeData: this.menuData,
        name: this.menuData.name,
        status: this.menuData.status,
        referPageId: this.menuData.referPageId,
        urlSegment: this.menuData.urlSegment,
        generateDirectory: this.menuData.generateDirectory,
        sortNum: this.menuData.sortNum,
        remark: this.menuData.remark
      }
    },
    mounted () {
    	console.log(this.changeData)
    	console.log(this.menuData)
    },
    watch: {
      show(val) {
        this.$emit('update:show', val)
      }
    },
    methods: {
      openType() {
        this.selestOpen === true ? this.selestOpen = false : this.selestOpen = true
      },
      closePagelist() {
        this.selestOpen = false
      },
      aaa () {
      	console.log(this.menuData)
      	console.log(this.urlSegment)
      },
      changeStatus(on) {
        this.status == on ? 1 : 0
        console.log(this.status)
      },
      selPage(listsId) {
        this.changeData.referPageId = listsId
        console.log(this.changeData.referPageId)
      },
      pageEdit() {
      	console.log('pageEdit')
      	let subChange = this.changeData
      	console.log(subChange)
      	subChange.name = this.name
      	subChange.status = this.status
      	subChange.referPageId = this.referPageId
      	subChange.urlSegment = this.urlSegment
      	subChange.generateDirectory = this.generateDirectory
      	subChange.sortNum = this.sortNum
      	subChange.remark = this.remark
      	console.log('changeSub')
      	console.log(subChange)
      	var reg = /^[0-9]+.?[0-9]*$/;
      	if(subChange.name === ''){
      		this.$tip('菜单名不能为空', 'error')
	        return
      	}else if(subChange.referPageId === '' || subChange.referPageId === null){
      		this.$tip('引用页面不能为空', 'error')
      		return
      	}else if(subChange.sortNum === ''){
      		this.$tip('排序不能为空', 'error')
      		return
      	}else if(!reg.test(subChange.sortNum)){
      		this.$tip('排序必须为数字', 'error')
      		return
      	}
      	console.log(this.changeData)
        let url = this.editType === 'create' ? '/cms/rest/siteCategory/create.do' : '/cms/rest/siteCategory/update.do'
        this.$rest.post(url, subChange).then(() => {
          this.$emit('success')
          this.$emit('update:show', false)
        })
      },
      verification(event){
      	console.log(event.target.value)
      	let parentId = ''
      	if(this.changeData.id === undefined){
      		this.changeData.id = ''
      	}
      	if(this.parent === undefined){
      		parentId = -1
      	}else{
      		parentId = this.parent.id
      	}
        this.$rest.post('/sys/rest/validate/siteCategory/name.do', {
          name: event.target.value,
          parentId: parentId,
          siteId: this.$route.query.siteId,
          excluded: this.changeData.id
        },{loading:false}).then(response => {
        	if(response.valid === false){
        		$(event.target).addClass('repeat')
        		$('.repeatText').show()
        	}else{
        		$(event.target).removeClass('repeat')
        		$('.repeatText').hide()
        	}
        })
      }
    }
  }
</script>

<style scoped>
  /*modal*/
  .repeat{
 		border-color: red !important;
 		box-shadow: 0px 0px 3px 0px red;
  }
  .repeatText{
  	color: red;
  	display: none;
  }
  .menuRow {
    display: block;
    width: 80%;
    margin: 0 auto;
  }

  .menuRow:before, .menuRow:after {
    content: '';
    display: table;
  }

  .menuRow:after {
    clear: both;
  }

  .menuRow > li {
    float: left;
    line-height: 34px;
    margin: 7px 0;
  }

  .menuRow > li.form-control {
    border-radius: 3px;
  }

  .menuRow > li:first-child {
    width: 20%;
    text-align: right;
  }

  .menuRow > li:last-child {
    width: calc(80% - 10px);
    margin-left: 10px;
    text-align: left;
  }

  .modal-footer .btn-default {
    color: #333;
    background-color: #cfd5d8;
    border-color: #cfd5d8;
  }

  .modal-footer .btn-default:active:hover,
  .modal-footer .btn-default:active:focus {
    outline: none;
    box-shadow: none;
  }

  .modal-footer .btn-primary {
    color: #fff;
    background-color: #33c0cc;
    border-color: #33c0cc;
  }

  .modal-footer .btn-primary:active:hover,
  .modal-footer .btn-primary:active:focus {
    color: #fff;
    outline: none;
    box-shadow: none;
    background-color: #33c0cc;
    border-color: #33c0cc;
  }

  /*end-modal*/
  .menuList:before, .menuList:after {
    content: '';
    display: table;
  }

  .menuList:after {
    clear: both;
  }

  . {
    position: relative;
    border: 1px solid #CBD5DD;
    width: 100%;
    height: 34px;
    padding: 6px 20px 6px 12px;
    font-size: 14px;
    line-height: 1.42857;
    color: #555;
    border-radius: 2px;
    transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  }

  .pageSelect:before {
    content: '';
    position: absolute;
    top: 50%;
    right: 5px;
    z-index: 100;
    width: 11.2px;
    height: 6.4px;
    background: url('/static/res/images/cms/down-triangle.png') no-repeat center;
    background-size: cover;
    transform: translateY(-50%);
  }

  .pageSelect span {
    display: inline-block;
    width: 100%;
    height: 19px;
    overflow: hidden;
  }

  .pageOption {
    position: absolute;
    left: 0;
    max-height: 0;
    margin-top: 3px;
    margin-left: -1px;
    margin-right: -1px;
    width: 100%;
    border: 1px solid #CBD5DD;
    background-color: #fff;
    border-top: none;
    z-index: 2;
    box-sizing: content-box;
    overflow: hidden;
    transition: all .3s;
    -moz-transition: all .3s;
    -webkit-transition: all .3s;
    -ms-transition: all .3s;
  }

  .pageSelect.open .pageOption {
    max-height: 350px;
    overflow: auto;
  }

  .pageOption p {
    margin-bottom: 0;
    padding-left: 12px;
    width: 100%;
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
  }

  .pageOption p:hover {
    color: #fff;
    background-color: #1C7EBB
  }
</style>
