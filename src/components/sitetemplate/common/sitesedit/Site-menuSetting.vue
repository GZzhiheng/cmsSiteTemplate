<template>
  <div class="meun-setting">
    <div class="topbtn-box text-right">
      <a href="javascript:;" @click="sortMenu">排序</a>
      <a href="javascript:;" @click="createMenu(lv1menu)">添加主菜单</a>
    </div>
    <div class="ms-table">
      <div class="mshead-box">
        <ul class="ms-head">
          <li class="mshead-menuName">
            <p>菜单名称</p>
          </li>
          <li class="mshead-menuImg">
            <p>菜单图</p>
          </li>
          <li class="mshead-menuState">
            <p>状态</p>
          </li>
          <li class="mshead-menuExplain">
            <p>菜单说明</p>
          </li>
          <li class="mshead-menuUrl">
            <p>URL</p>
          </li>
          <li class="mshead-menuOperation">
            <p>操作</p>
          </li>
        </ul>
      </div>
      <div class="msbody-box">
        <template v-for="(lists, index) in siteCategory">
          <ul class="ms-body">
            <li class="msbody-menuName first-msbody-menuName" @click="menuNameShow(index)">
              <p class="first-menuName"><input v-model="lists.sortNum" @focus="sortFocus(lists.sortNum)"
                        @blur="sortBlur(lists.sortNum,lists)"/>{{ lists.name }}
                        <i class="menu-triangle"></i>
                        <!--:class="{active: item.status == 'PAUSED'}"-->
                        <!--:class="item.status === 2?'btn-issue':'btn-online'"-->
              </p>
            </li>
            <li class="msbody-menuImg">
              <template v-if='!lists.img'>
                <p>--</p>
              </template>
              <template v-else>
                <a href="javascript:;" @click="showDialog(lists.img)">查看</a>
              </template>
            </li>
            <li class="msbody-menuState">
              <p>
              	<template v-if="index === 0">
              		<switch-box :value="lists.status == 1" style="cursor:no-drop"></switch-box>
              	</template>
              	<template v-else>
              		<switch-box :value="lists.status == 1" @input="changeState($event,lists)"></switch-box>
              	</template>
              </p>
            </li>
            <li class="msbody-menuExplain">
              <p>{{ lists.remark }}</p>
            </li>
            <li class="msbody-menuUrl">
              <p>{{ lists.urlSegment }}</p>
            </li>
            <li class="msbody-menuOperation">
              <p>
                <a class="btn-icon btn-add" href="javascript:;" @click="createMenu(lists)"></a>
                <span class="btn-icon btn-update" @click="editMenu(lists)"></span>
                <span class="btn-icon btn-del" @click='delMenu(lists.id)' v-if="index != 0"></span>
              </p>
            </li>
          </ul>
          <div class="chlid-menuName">
	          <template v-if="lists.childs">
	            <template v-for='(listsChild1, index) in lists.childs'>
	              <ul class="ms-body menu-second">
	                <li class="msbody-menuName">
	                  <p><input v-model="listsChild1.sortNum" @focus="sortFocus(listsChild1.sortNum)"
	                            @blur="sortBlur(listsChild1.sortNum,listsChild1)"/>{{ listsChild1.name }}</p>
	                </li>
	                <li class="msbody-menuImg">
	                  <template v-if='listsChild1.img === ""'>
	                    <p>--</p>
	                  </template>
	                  <template v-else>
	                    <a href="jacascript:;" @click="showDialog(listsChild1.img)">查看</a>
	                  </template>
	                </li>
	                <li class="msbody-menuState">
	                  <p>
	                    <switch-box :value="listsChild1.status == 1" @input="changeState($event,listsChild1)"></switch-box>
	                  </p>
	                </li>
	                <li class="msbody-menuExplain">
	                  <p>{{ listsChild1.remark }}</p>
	                </li>
	                <li class="msbody-menuUrl">
	                  <p>{{ listsChild1.urlSegment }}</p>
	                </li>
	                <li class="msbody-menuOperation">
	                  <p>
	                    <a class="btn-icon btn-add" href="javascript:;" @click="createMenu(listsChild1)"></a>
	                    <span class="btn-icon btn-update" @click="editMenu(listsChild1, lists)"></span>
	                    <span class="btn-icon btn-del" @click="delMenu(listsChild1.id)"></span>
	                  </p>
	                </li>
	              </ul>
	              <template v-if="listsChild1.childs">
	                <ul class="ms-body menu-three" v-for='(listsChild2, index) in listsChild1.childs'>
	                  <li class="msbody-menuName">
	                    <p><input v-model="listsChild2.sortNum" @focus="sortFocus(listsChild2.sortNum)"
	                              @blur="sortBlur(listsChild2.sortNum,listsChild2)"/>{{ listsChild2.name }}</p>
	                  </li>
	                  <li class="msbody-menuImg">
	                    <template v-if='listsChild2.img === ""'>
	                      <p>--</p>
	                    </template>
	                    <template v-else>
	                      <a href="javascript:;" @click="showDialog(listsChild2.img)">查看</a>
	                    </template>
	                  </li>
	                  <li class="msbody-menuState">
	                    <p>
	                      <switch-box :value="listsChild2.status == 1"
	                                  @input="changeState($event,listsChild2)"></switch-box>
	                    </p>
	                  </li>
	                  <li class="msbody-menuExplain">
	                    <p>{{ listsChild2.remark }}</p>
	                  </li>
	                  <li class="msbody-menuUrl">
	                    <p>{{ listsChild2.urlSegment }}</p>
	                  </li>
	                  <li class="msbody-menuOperation">
	                    <p>
	                    <span class="btn-icon btn-update"
	                          @click="editMenu(listsChild2, listsChild1)"></span>
	                      <span class="btn-icon btn-del" @click="delMenu(listsChild2.id)"></span>
	                    </p>
	                  </li>
	                </ul>
	              </template>
	            </template>
	          </template>
        	</div>
        </template>
      </div>
    </div>
    <menu-dialog :menuData='editCategory' :pageList='pageList' :parent="parentCategory" v-if="showEdit"
                 :show.sync="showEdit" :editType="editType" @success="loadCategories"></menu-dialog>
    <el-dialog title="查看图片" :visible.sync='showImg'><img :src="innerImg"/></el-dialog>
  </div>
</template>

<script>
  import MenuDialog from './Menu-dialog'
  import SwitchBox from '../../../common/SwitchBox.vue'

  export default {
    data() {
      return {
        siteTemp: {},
        resMenu: null,
        pageList: [],
        pageId: '',
        pageName: '',
        originNo: null,
        newNo: null,
        idArray: [],
        sortNumArray: [],
        lv1menu: {
          siteId: this.$route.query.siteId,
          id: '',
          parentId: '',
          pareName: '',
          name: '',
          status: 1,
          referPageId: '',
          urlSegment: '',
          generateDirectory: true,
          sortNum: 0,
          remark: '',
          img: ''
        },
        showImg: false,
        innerImg: '',
        siteCategory: [],
        editType: 'create',
        showEdit: false,
        editCategory: null,
        parentCategory: null
      }
    },
    components: {MenuDialog, SwitchBox},
    mounted() {
      this.loadCategories()
    },
    methods: {
      loadCategories() {
        this.$rest.post('/cms/rest/siteCategory/list', {siteId: this.$route.query.siteId}).then(response => {
        	console.log('菜单获取')
          this.siteCategory = response.data
          this.siteCategory.menuNameShow = true
          this.$rest.post('/cms/rest/sitePage/list', {templateId: this.$route.query.templateId}).then(res => {
          	this.pageList = res.data
          })
        }, response => {
          console.log('菜单获取 Fail')
        })
      },
      menuNameShow(index){
      	var thisChlid = $('.chlid-menuName').eq(index)
      	if(thisChlid.hasClass('hide')){
      		thisChlid.removeClass('hide')
      		$('.menu-triangle').eq(index).removeClass('packUp')
      	}else{
      		thisChlid.addClass('hide')
      		$('.menu-triangle').eq(index).addClass('packUp')
      	}
      },
      editMenu(category, parent) {
        this.editType = 'edit'
        this.editCategory = category
        this.parentCategory = parent
        this.showEdit = true
      },
      changeState(on, menu) {
        let status = on ? 1 : 0
        this.$rest.post('/cms/rest/siteCategory/updateStatus.do', {
          'id': menu.id,
          'status': status
        }).then(() => this.loadCategories())
      },
      createMenu(createList) {
      	console.log(createList)
        let category = {
          siteId: createList.siteId,
          parentId: createList.id,
          name: '',
          status: 1,
          referPageId: '',
          urlSegment: '',
          generateDirectory: true,
          sortNum: '',
          remark: '',
          img: ''
        }
        this.editType = 'create'
        this.editCategory = category
        this.parentCategory = createList
        this.showEdit = true
      },
      sortMenu() {
        let _id = this.idArray.toString()
        let _scort = this.sortNumArray.toString()
        if (_id === '') {
        	this.$tip('请修改页面排序')
        	return
        }
        console.log(_id)
        console.log(_scort)
        this.$rest.post('/cms/rest/siteCategory/updateSortNum.do', {
          idArray: _id,
          sortNumArray: _scort
        }).then(() => {
          this.$tip('排序成功', 'success')
          this.loadCategories()
        })
        this.idArray = []
        this.sortNumArray = []
      },
      sortFocus(no) {
        console.log('sortFocus')
        this.originNo = no
        console.log(this.originNo)
      },
      sortBlur (no, obj) {
        console.log(no)
        if (!isNaN(no)) {
          this.newNo = no
        } else {
          this.$tip('排序只能填入数字', 'warning')
          obj.sortNum = this.originNo
          console.log(obj.sortNum)
          return
        }
        this.idArray.push(obj.id)
        this.sortNumArray.push(this.newNo)
      },
      delMenu(id) {
        this.$conf('是否确认删除菜单？').then(() => this.$rest.post('/cms/rest/siteCategory/delete.do', {id: id}).then(() => this.loadCategories()))
      },
      showDialog(Img) {
        this.innerImg = this.GLOBAL.IMAGE_ROOT + Img
        this.showImg = true
      }
    }
  }
</script>

<style>
  .menuList .el-select{
  	width: 100%;
  }
  .el-dialog{
  	min-width: 350px;
  }
  .menuList .img-box {
    margin-top: 36px;
    width: 176px;
    height: 176px;
    background: #eeeeee;
    overflow: hidden;
    position: relative;
    display: inline-block;
    white-space: nowrap;
    text-align: center;
    cursor: pointer;
  }

  .menuList .img-box .show-img {
    max-width: 176px;
    max-height: 176px;
    vertical-align: middle;
    margin-left: -4px;
  }

  .helper {
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }

  .uploadBtnBox {
    position: absolute;
    height: 28px;
    top: 50%;
    left: 50%;
    margin-top: -14px;
    margin-left: -58px;
    display: none;
  }

  .uploadBtnBox button {
    width: 56px;
    height: 28px;
    border: none;
    border-radius: 5px;
    font-size: 12px;
    text-align: center;
    outline: none;
  }

  .uploadBtnBox .checkBigImg {
    color: #33c0cc;
    background: #fff;
    margin-right: 4px;
  }

  .uploadBtnBox .clearImage {
    background: #33c0cc;
    color: #fff;
  }

  .img-box:hover .uploadBtnBox {
    display: block;
  }

  /*end-添加图片-复用*/
  .deletemenu {
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
    top: 35px;
    z-index: 999;
    display: none;
  }

  .deletemenu.activemenu {
    display: block;
  }

  .deletemenu p {
    color: #333333;
    font-size: 14px;
    margin-bottom: 15px;
  }

  .deletemenu .deleteBtn button {
    border: none;
    border-radius: 5px;
    font-size: 12px;
    padding: 0px 18px;
    margin-left: 10px;
  }

  .deletemenu .deleteBtn {
    float: right;
  }

  .deletemenu .deleteBtn .sure {
    color: #fff;
    background: #ff9933;
  }

  .deletemenu .deleteBtn .cancel {
    color: #333;
    background: #d3d3d3;
  }

  .deletemenu img {
    position: absolute;
    top: -6px;
    right: 27px;
  }

  .meun-setting {
    margin: 10px 20px 0px 20px;
    padding: 20px 0;
    min-width: 1084px;
    background-color: #fff;
    border-radius: 10px;
    min-height: 810px;
    margin-top: 60px;
  }

  .topbtn-box {
    padding: 0 20px 10px 20px;
    border-bottom: 1px solid #e6ecf5;
  }

  .topbtn-box a {
    display: inline-block;
    margin-left: 10px;
  }

  .topbtn-box a {
    display: inline-block;
    padding: 4px 15px;
    font-size: 12px;
    color: #33c0cc;
    border: 1px solid #33c0cc;
    border-radius: 4px;
    text-decoration: none;
  }

  .topbtn-box a:hover {
    color: #fff;
    background-color: #33c0cc;
  }

  ul.ms-head {
    overflow: hidden;
    background: #fff;
    padding: 10px;
    border-radius: 3px;
    border-bottom: 1px solid #e6ecf5;
  }

  ul.ms-head > li {
    font-size: 14px;
    color: #666;
    line-height: 35px;
    height: 35px;
    overflow: hidden;
    border-right: 1px solid #d8dde6;
    font-weight: bold;
  }

  ul.menu-second > li.msbody-menuName > p {
    padding-left: 50px;
  }

  ul.menu-three > li.msbody-menuName > p {
    padding-left: 100px;
  }

  ul.ms-head > li > p,
  ul.ms-body > li > p {
    display: table-cell;
    vertical-align: middle;
  }
	.first-msbody-menuName{
		cursor: pointer;
	}
  ul.ms-head > li:last-child {
    border-right: none;
  }

  ul.ms-head > li,
  ul.ms-body > li {
    float: left;
    padding: 0 15px;
    box-sizing: border-box;
    display: table;
  }

  ul.ms-body:nth-of-type(even) {
    background-color: #f4f7fb;
  }

  ul.ms-body {
  	transition: 0.5s all ease;
    -moz-transition: 0.5s all ease;
    -webkit-transition: 0.5s all ease;
    -o-transition: 0.5s all ease;
    background: #fff;
    padding: 0 10px;
    height: 60px;
    border-bottom: 1px solid #e6ecf5;
    position: relative; /*z-index 需要在定位下才起作用，此代码为解决box-shadow被隐藏*/

  }

  ul.ms-body:hover {
    z-index: 99; /*z-index 需要在定位下才起作用，此代码为解决box-shadow被隐藏*/
    box-shadow: 0px -1px 20px 3px #dce0e5;
  }

  ul.ms-body > li {
    height: 60px;
    line-height: 15px;
  }

  ul.ms-body > li > p,
  ul.ms-body > li > a {
    display: table-cell;
    vertical-align: middle;
    margin: 0;
  }

  .mshead-menuName,
  .msbody-menuName {
    width: calc(100% - 690px);
  }

  .mshead-menuImg,
  .msbody-menuImg {
    width: 80px;
    text-align: center;
  }

  .mshead-menuState,
  .msbody-menuState {
    width: 70px;
    text-align: center;
  }

  .mshead-menuExplain,
  .msbody-menuExplain {
    width: 230px;
    text-align: left;
  }

  .mshead-menuUrl,
  .msbody-menuUrl {
    width: 170px;
    text-align: left;
  }

  .mshead-menuOperation,
  .msbody-menuOperation {
    width: 140px;
    position: relative;
  }

  .msbody-menuName span, .msbody-menuName input {
    width: 25px;
    height: 25px;
    font-size: 12px;
    display: inline-block;
    text-align: center;
    line-height: 25px;
    color: #999999;
    border: 1px solid #dcdcdc;
    margin-right: 10px;
  }

  a.btn-icon {
    display: inline-block;
  }

  .btn-icon:hover:before,
  .btn-icon:hover:after {
    display: block;
  }

  /*.btn-del:hover:before,
  .btn-del:hover:after {
    display: none;
  }*/

  .btn-icon:after {
  	transition: 0.5s all ease;
    -moz-transition: 0.5s all ease;
    -webkit-transition: 0.5s all ease;
    -o-transition: 0.5s all ease;
    opacity: 0;
    width: 76px;
    height: 30px;
    line-height: 30px;
    color: #fff;
    background-color: #33c0cc;
    position: absolute;
    top: -35px;
    left: -25px;
    border-radius: 2px;
  }

  .btn-icon:before {
  	transition: 0.s all ease;
    -moz-transition: 0.5s all ease;
    -webkit-transition: 0.5s all ease;
    -o-transition: 0.5s all ease;
    opacity: 0;
    content: "";
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid #33c0cc;
    position: absolute;
    top: -6px;
    left: 3px;
  }

  .btn-icon {
    position: relative;
    margin-right: 5px;
    background-image: url('/static/res/images/cms/icon.png');
    width: 22px;
    height: 20px;
    cursor: pointer;
  }

  .btn-del:after {
    content: "删除";
  }

  .btn-add:after {
    content: "添加子菜单";
  }

  .btn-update:after {
    content: "修改";
  }

  .btn-del {
    background-position: -499px -97px;
  }

  .btn-del:hover {
    background-position: -499px 2px;
  }

  .btn-add {
    background-position: -398px -297px;
  }

  .btn-update {
    background-position: -598px -297px;
  }

  .btn-add:hover {
    background-position: -398px -197px;
  }

  .btn-update:hover {
    background-position: -598px -197px;
  }

  .btn-sure,
  .btn-cancel {
    width: 60px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    font-size: 12px;
    display: inline-block;
    border-radius: 5px;
    margin-left: 10px;
    text-decoration: none;
  }

  .btn-sure:hover,
  .btn-cancel:hover {
    text-decoration: none;
  }

  .btn-sure {
    background: #ff9933;
    color: #fff;
  }

  .btn-cancel {
    background: #d3d3d3;
    color: #333333;
  }

  .ms-btnbox {
    padding: 10px;
    text-align: right;
  }

  .btn-del {
    position: relative;
  }

  .btn-del:hover .popover {
    display: block;
  }

  .popover {
    width: 280px;
    top: 25px;
    left: -220px;
    display: none;
    border: 1px solid #ddd;
  }

  .popover.bottom > .arrow {
    left: 84%;
    border-bottom-color: #ddd
  }
  
  .first-menuName{
  	font-weight: bold;
  }
  /*.chlid-menuName{
  	transition: 0.8s all ease;
    -moz-transition: 0.8s all ease;
    -webkit-transition: 0.8s all ease;
    -o-transition: 0.8s all ease;
    height: auto;
  }
  .chlid-menuName.hide{
  	height: 0;
  }*/
  .menu-triangle.packUp{
  	background: url('/static/res/images/cms/menu-down-triangle.png');
  }
  .menu-triangle{
  	width: 10px;
  	height: 6px;
  	margin-left: 12px;
  	display: inline-block;
  	background: url('/static/res/images/cms/top-triangle.png');
  }
</style>
