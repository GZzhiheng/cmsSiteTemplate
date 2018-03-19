<style>
  /*css for page*/
  .manage-bottom {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    color: #999;
    font-size: 12px;
  }
  .page-show {
    font-size: 14px
  }
  .page-show input.form-control,
  .page-show input.btn-default {
    padding: 4px 10px;
    width: 47px;
    display: inline;
    height: auto;
    vertical-align: inherit;
    color: #767676;
  }
  .page-show input.btn-default {
    width: auto;
  }
  /***分页组件样式***/
  .page-ele{background-color: #fff;border-top-right-radius: 3px;border-top-left-radius: 3px;margin: 0 15px;}
  .page-ele-view{padding-bottom: 15px;height: 45px;min-width: 1099px;padding-top: 6px;}
  .page-ele-view .page-tip{font-size: 14px;line-height: 30px;margin-left: 20px;color: #999;}
  .page-ele .el-pagination{float: right;display: inline-block;margin-right: 10px;padding-top: 10px;}
  .el-icon-arrow-right:before, .el-icon-d-arrow-right:before, .el-icon-arrow-left:before, .el-icon-d-arrow-left:before{content: none;}
  .el-icon-arrow-right{height: 28px; width: 28px; background: url("/static/res/images/cms/icon.png") no-repeat -670px -21px;}
  .el-icon-arrow-left{height: 28px; width: 28px; background: url("/static/res/images/cms/icon.png") no-repeat -670px -61px;}
  .el-icon-arrow-left:hover{background: url("/static/res/images/cms/icon.png") no-repeat -640px -61px;}
  .el-icon-arrow-right:hover{background: url("/static/res/images/cms/icon.png") no-repeat -640px -21px;}
  .el-pager li.active{color: #499fda; cursor: default;border: 1px #499fda solid;color: #499fda;}
  .el-pager li:hover{color: #499fda; cursor: pointer;}
  .el-pager li.active+li{border-left: 1px solid #d1dbe5}
  .el-pager li{margin: 0 5px;border: 1px solid #d1dbe5;min-width: 30px;}
  .el-pager li.el-icon-more{height: 25px; width: 13px;border: none;background: url("/static/res/images/cms/icon.png") no-repeat -192px -498px;margin: 0;}
  .el-pager li.el-icon-more:before{content: none;}
  .el-pager li.el-icon-d-arrow-left{height: 25px; width: 12px; background: url("/static/res/images/cms/icon.png") no-repeat -552px -23px;margin: 0;border: none;}
  .el-pager li.el-icon-d-arrow-right{height: 25px; width: 12px; background: url("/static/res/images/cms/icon.png") no-repeat -552px 7px;margin: 0;border: none;}
  .is-in-pagination{width: 30px}
  .el-pagination .btn-prev{border: 1px solid #d1dbe5;padding: 0;min-width: 28px;}
  .el-pagination .btn-next{border: 1px solid #d1dbe5;padding: 0;min-width: 28px;}
  .btn-next:hover,.btn-prev:hover{border: 1px #499fda solid;}
  .is-in-pagination{width: 35px;height: 26px;background-color: #ffffff;line-height: 28px;border: 1px solid #d1dbe5;}
  .el-pagination__editor.el-input .el-input__inner{width: 36px;height: 20px;padding: 0 5px;border: none;appearance:none;line-height: 20px;}
  .is-in-pagination{width: 35px;height: 28px;background-color: #ffffff;}
  .is-in-pagination .el-input__inner{width: 30px;height: 20px;padding: 0 5px;line-height: 20px;border-color: #ccc}
  input::-webkit-outer-spin-button, input::-webkit-inner-spin-button {-webkit-appearance: none;}
  input[type="number"]{-moz-appearance: textfield;}
  .go-page-list{width: 28px;height: 28px;line-height: 28px;text-align: center;border:1px #d1dbe5 solid;display: inline-block;cursor: pointer;text-decoration:none;margin-left: 10px;color: #d1dbe5;}
  .go-page-list:hover{text-decoration: none;color: #00aabb;border:1px #00aabb solid;}
  .el-date-editor .el-range-separator{line-height:20px; vertical-align: middle;}
  /*end-css for page*/
</style>

<template>
  <div class="manage-bottom">
    <div class="page-tip">
      {{(this.opt.index - 1) < 1 ? 1 : (this.opt.index - 1) * this.opt.size}}-{{
        (this.opt.index * this.opt.size) > this.opt.rowCount ? this.opt.rowCount : (this.opt.index * this.opt.size)}}条/共{{this.opt.rowCount}}条
    </div>
    <div class="page-show">
    </div>
    <div class="page-ele-view">
      <el-pagination
        @current-change="changeToPage"
        :current-page="currentPage"
        :page-size="this.opt.size"
        :page-sizes="[4, 6, 8, 10]"
        layout="prev, pager, next, jumper, slot"
        :total="this.opt.rowCount">
        <a class="go-page-list">GO</a>
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        currentPage: 1
      }
    },
    props: ['opt'],
    mounted () {
      console.log(this.opt)
    },
    methods: {
      changeToPage (turnTopage) {
      	this.currentPage = turnTopage
      	this.$emit('pageTurning', {index: this.currentPage, size: this.opt.size, rowCount: this.opt.rowCount})
      }
    }
  }
</script>
