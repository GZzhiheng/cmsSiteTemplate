<template>
  <el-dialog ref="dialog" custom-class="cst-dialog"
             :title="title"
             :visible.sync="show"
             :close-on-click-modal="false"
             :close-on-press-escape="false"
             :width="width" append-to-body>
    <slot></slot>
    <div class="addListBottom" slot="footer" v-if="showOk || showCancel">
      <button class="addListCancel" v-on:click="onCancel()" v-if="showCancel">{{ cancelBtnText }}</button>
      <button class="addListSave" v-on:click="onOk()" v-if="showOk">{{ okBtnText }}</button>
    </div>
 </el-dialog>
</template>

<script>
  export default {
  	data() {
      return {
      	screenHeight: document.body.screenHeight
      }
    },
    name: 'modal',
    props:
      {
        show: {
          type: Boolean,
          default: false
        },
        showCancel: {
          type: Boolean,
          default: true
        },
        showOk: {
          type: Boolean,
          default: true
        },
        width: {
          default: '80%'
        },
        cancelBtnText: {
          default: '取消'
        },
        okBtnText: {
          default: '保存'
        },
        closeOnOk: {
          type: Boolean,
          default: false
        },
        title: null
      },
    components: {},
    watch: {
      show(val) {
        this.$emit('update:show', val);
      },
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
    methods: {
      closeModal() {
        this.show = false
      },
      onCancel() {
        this.$emit('cancel');
        this.closeModal();
      },
      onOk() {
        this.$emit('ok');
        if (this.closeOnOk) {
          this.closeModal();
        }
      },
      changescrollbarHeight () {
	      var clientHeight = document.body.clientHeight
	      var scrollbarHeight = document.getElementsByClassName('listscorll')
	      for (var i = 0; i < scrollbarHeight.length; i++) {
	        scrollbarHeight[i].style.maxHeight = (clientHeight - 285) + 'px'
	      }
	    }
    },
    mounted () {
	    this.changescrollbarHeight()
	    const that = this
	    window.onresize = () => {
	      return (() => {
	        window.screenHeight = document.body.clientHeight
	        that.screenHeight = window.screenHeight
	      })()
	    }
	  }
  }
</script>

<style>
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
    top: 50px;
    left: 50%;
    margin-left: -35%;
    /*height: 75%;*/
    z-index: -1;
    border-radius: 5px 5px 0 0;
  }

  .listMenuBox {
    width: 50%;
    margin-left: -25%;
    height: 60%;
  }

  .listscorll {
    /*height: 100%;*/
    overflow-x: hidden;
    overflow-y: auto;
    background-color: #fff;
    padding-top: 16px;
    /*max-height: 500px;*/
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

  .listMenu img {
    position: absolute;
    right: 10px;
    top: 13px;
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

  .listDeleteBox h3 {
    padding: 20px;
    border-bottom: 1px solid #e5e5e5;
    font-size: 18px;
  }

  .listDeleteButton button {
    float: left;
    font-size: 14px;
    border: 1px solid transparent;
    margin: 15px 15px 15px 0;
    padding: 5px 10px;
  }

  .cst-dialog .el-dialog__footer {
    padding: 0px;
  }
</style>

