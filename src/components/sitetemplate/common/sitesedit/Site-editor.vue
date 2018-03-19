<style scoped>
</style>
<template>
  <Ue @ready="ready" ueditorPath="/static/ueditor1_4_3_3/" :ueditorConfig="editorConfig"></Ue>
</template>

<script>
  import Ue from 'vue-ueditor'

  export default {
    data() {
      return {
        UE: null,
        internalValue: this.value || '',
        isReady: false
      }
    },
    props: ['value', 'zIndex'],
    computed: {
      editorConfig() {
        let cfg = {
          maximumWords: 4000,
          initialFrameHeight: 450,
          // 图片上传回调
          imageUploadCallback: function (serverRsp, success) {
            if (serverRsp.code === 0) {
              success("/res/download?id=" + serverRsp.data);
            }
          },
          toolbars: [[
            'fullscreen', 'source', '|', 'undo', 'redo', '|',
            'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
            'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
            'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
            'directionalityltr', 'directionalityrtl', 'indent', '|',
            'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
            'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
            'insertimage', 'insertvideo', 'insertframe', 'pagebreak', '|',
            'horizontal', 'date', 'time', 'spechars', '|',
            'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
            'searchreplace'
          ]],
          zIndex: this.zIndex || 900
        }
        return cfg;
      }
    },
    components: {
      Ue
    },
    watch: {
      value: function (val) {
        val = val ? (val + '') : ''
        if (val.length === this.internalValue.length && val === this.internalValue) {
          return
        }
        this.internalValue = val
        if (this.UE) {
          this.UE.setContent(this.internalValue, false)
        }
      }
    },
    methods: {
      ready(instance) {
        this.isReady = true
        let me = this
        this.UE = instance
        let value = me.internalValue;
        if (value !== null && typeof value !== 'undefined') {
          instance.setContent(value + '', false)
        }
        this.UE.addListener('contentChange', function () {
          me.updateValue(this.getContent())
        })
      },
      updateValue: function (val) {
        this.internalValue = val
        this.$emit('input', val);
      }
    }
  }
</script>
<style>
  .edui-editor-iframeholder, .edui-editor {
    width: 100% !important;
  }
</style>
