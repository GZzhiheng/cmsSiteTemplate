<template>
  <div>
    <div class="img-box">
      <span class="helper"></span>
      <img class="add-img" :class="value ? 'active' : ''" src="/static/res/images/cms/page-addBtnImg.png"
           @click="triggerUpload"/>
      <img class="show-img" v-if="value" :src="GLOBAL.IMAGE_ROOT + value" :title="field.description"/>
      <input type="file" name="file" title="图片大小不能超过2M" class="uploadLogoBtn" ref="fileInput"
             @change="preUpload($event)"
             accept="image/gif,image/jpeg,image/png,image/ico,image/x-icon"/>
      <div class="uploadBtnBox" v-if="value">
        <button class="checkBigImg" @click="showView = true">查看</button>
        <button class="clearImage" @click="clearImage">删除</button>
      </div>
    </div>
    <modal title="图片剪裁" v-if="showCut" ref="cutModal" :show.sync="showCut" @ok="upload" width="60%">
      <div class='width100 cutImgBox'></div>
    </modal>
    <modal title="查看图片" :show.sync="showView" v-if="value" :showCancel="false" width="60%" :closeOnOk="true"
           okBtnText="确认">
      <img :src="GLOBAL.IMAGE_ROOT + value" class="seeImg"/>
    </modal>
  </div>
</template>
<script>
  import Modal from '../../../common/Modal.vue'
  import '../../../jcrop/css/jquery.Jcrop.css'
  import '../../../jcrop/js/jquery.Jcrop.js'

  export default {
    data() {
      return {
        showCut: false,
        showView: false,
        uploadFile: null,
        x1: 0,
        x2: 0,
        y1: 0,
        y2: 0
      }
    },
    props: ['value', 'field'],
    components: {
      Modal
    },
    methods: {
      triggerUpload: function () {
        $(this.$refs.fileInput).trigger('click')
      },
      clearImage: function () {
        this.$emit('input', '')
      },
      resetCut() {
        this.x1 = 0
        this.y1 = 0
        this.x2 = 0
        this.y1 = 0
      },
      preUpload: function (e) {
        this.resetCut()
        let me = this;
        me.showCut = true;
        this.$nextTick(() => {
          var modalObj = $(this.$refs.cutModal.$el)
          modalObj.find('img').remove()
          var setData = function (src) {
            e.target.value = ''
            var originalH, currentH, originalW, currentW, ratioH, ratioW;
            var image = new Image();
            var $img = $(image);
            image.src = src;
            $img.on('load', function () {
              //取消禁用确定按钮
              //原始尺寸
              originalW = image.width;
              originalH = image.height;

              //添加到模态框
              modalObj.find('.cutImgBox').append($img);
              $img.addClass('img-responsive').addClass('center-block');
              currentH = $img.height();
              currentW = $img.width();

              ratioH = parseFloat(originalH) / currentH;
              ratioW = parseFloat(originalW) / currentW;

              function updateCoords(c) {//裁剪的坐标，宽高
                me.x1 = parseInt(c.x * ratioW);
                me.x2 = parseInt(c.x2 * ratioW);
                me.y1 = parseInt(c.y * ratioH);
                me.y2 = parseInt(c.y2 * ratioH);
              }

              var limitHeight = me.field.attributes.height, limitWidth = me.field.attributes.width,
                ratio = me.field.attributes.ratio;
              var cutOption = {
                onChange: updateCoords,
                onSelect: updateCoords,
                onRelease: () => me.resetCut()
              };
              if (limitWidth && limitHeight) {
                //指定宽高时候限制可以剪裁的大小，只可以拖动
                var sizeLimit = [Math.min((limitWidth ? parseInt(limitWidth) : 0) / ratioW, currentW),
                  Math.min((limitHeight ? parseInt(limitHeight) : 0) / ratioH, currentH)];
                cutOption.setSelect = ([0, 0, sizeLimit[0] == 0 ? currentW : sizeLimit[0], sizeLimit[1] == 0 ? currentH : sizeLimit[1]] );
                cutOption = $.extend(cutOption, {
                  //只有在限制了宽或者高的时候才初始化一个剪裁区域，剪裁区域默认是限制的宽高，如果只指定宽或者高，另一个为图片原始大小
                  setSelect: ([0, 0, sizeLimit[0] == 0 ? currentW : sizeLimit[0], sizeLimit[1] == 0 ? currentH : sizeLimit[1]] ),
                  minSize: sizeLimit,
                  maxSize: sizeLimit
                })
              } else if (ratio) {
                //指定宽高比
                ratio = parseFloat(ratio);
                let initSel = [0, 0, 0, 0], selW, selH;
                selW = currentW;
                selH = selW / ratio;
                if (selW <= currentW && selH <= currentH) {
                  initSel[2] = selW;
                  initSel[3] = selH;
                } else {
                  initSel[2] = currentH * ratio;
                  initSel[3] = currentH;
                }
                cutOption = $.extend(cutOption, {
                  aspectRatio: ratio,
                  setSelect: initSel
                });
              }
              $img.Jcrop(cutOption);
            })
          }
          if (window.FileReader) {//chrome,firefox7+,opera,IE10,IE9，IE9也可以用滤镜来实现
            var oFReader = new FileReader();
            this.uploadFile = e.target.files[0]
            oFReader.readAsDataURL(this.uploadFile)
            oFReader.onload = function (oFREvent) {
              setData(oFREvent.target.result)
            };

            //判断ie
          } else {
            if (navigator.userAgent.indexOf("Firefox") >= 1) {
              if (e.target.files) {
                this.uploadFile = e.target.files.item(0)
                setData(window.URL.createObjectURL(this.uploadFile))
              } else {
                this.uploadFile = e.target.value
                setData(this.uploadFile);
              }
            } else if (navigator.userAgent.indexOf("Chrome") >= 1) {// Chrome
              this.uploadFile = e.target.files.item(0)
              setData(window.URL.createObjectURL(this.uploadFile))
            }
          }
        })
      },
      upload: function () {
        let data = new FormData();
        data.append('x1', this.x1)
        data.append('y1', this.y1)
        data.append('x2', this.x2)
        data.append('y2', this.y2)
        data.append('file', this.uploadFile)
        this.$rest.post('/cms/rest/common/upload.do', data).then((rs) => {
          this.$emit('input', rs.data)
          this.showCut = false
        })
      }
    }
  }
</script>
<style>

  .img-box {
    width: 222px;
    height: 90px;
  }

  .img-box .show-img {
    max-width: 176px;
    vertical-align: middle;
    margin-left: -4px;
    max-height: 100%;
  }

  .helper {
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }

  .uploadLogoBtn {
    height: 100%;
  }

  .jcrop-holder {
    margin: 0 auto;
  }

  .seeImg {
    margin: 0 auto;
    display: block;
    max-width: 100%;
  }
</style>
