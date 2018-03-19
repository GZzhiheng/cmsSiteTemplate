<template>
  <div class="edit-header">
    <ul class="edit-left">
      <li><a href="javascript:;" @click='changeCom($event,"Sitesettings")'>站点配置</a></li>
      <li><a href="javascript:;" @click='changeCom($event,"Sitemenusetting")'>菜单管理</a></li>
      <li><a href="javascript:;" @click='changeCom($event,"Sitepagesetting")'>页面管理</a></li>
      <li><a href="javascript:;" @click='changeCom($event,"Siteaccelerate")'>加速区域</a></li>
    </ul>
    <ul class="edit-right">
      <li v-if="showPreview"><a href="javascript:;" @click="preview()"><span style="background-position: -500px -200px"></span>预览</a></li>
      <li v-if="showSave"><a href="javascript:;" @click="savePage()"><span style="background-position: -700px -200px"></span>保存</a></li>
      <li v-if="$jurisdiction('2707')"><a href="javascript:;" @click="editTemplate()"><span
        style="background-position: -600px -200px"></span>修改模板</a></li>
      <li v-if="$jurisdiction('2708')"><a href="javascript:;" @click="release()"><span style="background-position: -300px -200px"></span>发布</a></li>
    </ul>
  </div>
</template>

<script>
  export default {
  	data() {
      return {
        showPreview: false,
        showSave: true
      }
    },
    props: ['currentView'],
    computed: {
      items() {
        return this.$store.state.sitetemplate.items
      },
      pageitems() {
        return this.$store.state.sitetemplate.pageitems
      },
      pageId() {
        return this.$store.state.sitetemplate.pageId
      },
      iframeSRC() {
        return this.$store.state.sitetemplate.iframeSRC
      },
      fieldUpdated() {
        return this.$store.state.sitetemplate.fieldUpdated
      }
    },
    methods: {
      changeCom(event,newCompoment) {
      	if(newCompoment === 'Sitepagesetting' || newCompoment === 'Sitesettings'){
      		if(newCompoment === 'Sitepagesetting'){
      			this.showPreview = true
      		}
        	this.showSave = true
      	}else{
      		this.showPreview = false
        	this.showSave = false
      	}
        if (this.fieldUpdated) {
          this.$conf('当前字段修改尚未保存，是否忽略？').then(() => this.jumpToView(newCompoment,event))
        } else {
          this.jumpToView(newCompoment,event)
        }
      },
      jumpToView(newCompoment,e) {
        this.$emit('changeComponent', newCompoment)
        $('.edit-left a').removeClass('active')
        $(e.target).addClass('active')
        if (newCompoment === 'Sitemenusetting') {
          this.$rest.post('/cms/rest/siteCategory/list', {siteId: this.$route.query.siteId}).then(() => {
            console.log('siteCategory/list success')
          })
        }
      },
      editTemplate() {
        this.$emit('changeComponent', 'Sitetemplate')
      },
      preview() {
        if (this.pageId) {
          window.open('cms/rest/sitePage/preview/' + this.$route.query.templateId + '/pages/' + this.pageId + '.html')
        }
      },
      savePage() {
        if (this.currentView === 'Sitesettings') {
          var fieldValueJson = {}
          for (var key in this.items) {
            var value = this.items[key].value
            fieldValueJson[this.items[key].name] = {value: value, type: this.items[key].type}
          }
          var fieldValueJsonString = JSON.stringify(fieldValueJson)
          this.$rest.post('/cms/rest/siteFieldValue/save.do', {
            'fieldValueJson': fieldValueJsonString,
            'templateId': this.$route.query.templateId,
            'pageId': ''
          }).then(() => {
            this.$store.commit('SITE_PAGE_FIELD_UPDATE', false)
            console.log('savePage success')
            this.$tip('保存成功', 'success')
          })
        } else if (this.currentView === 'Sitepagesetting') {
          var pageFieldValueJson = {}
          for (var pagekey in this.pageitems) {
            var pagevalue = this.pageitems[pagekey].value
            pageFieldValueJson[this.pageitems[pagekey].name] = {value: pagevalue, type: this.pageitems[pagekey].type}
          }
          var pageFieldValueJsonString = JSON.stringify(pageFieldValueJson)
          this.$rest.post('/cms/rest/siteFieldValue/save.do', {
            'fieldValueJson': pageFieldValueJsonString,
            'templateId': this.$route.query.templateId,
            'pageId': this.pageId
          }).then(() => {
            this.$store.commit('SITE_PAGE_FIELD_UPDATE', false)
            console.log('savePage success')
            this.$tip('保存成功', 'success')
            document.getElementById('showiframe').contentWindow.location.reload(true);
          })
        }
      },
      release() {
        this.$rest.post('/cms/rest/site/publish.do', {
          'id': this.$route.query.siteId
        }, {timeout: 1000 * 60 * 3}).then(() => {
          console.log('release success')
        	this.$tip('发布成功', 'success')
        })
      }
    }
  }
</script>

<style>
  .edit-header {
    padding: 11px 30px 11px 25px;
    background-color: #fff;
    position: fixed;
    top: 50px;
    z-index: 999;
    width: calc(100% - 220px);
    -webkit-box-shadow: #d6d6d6 0px 0px 2px 0px;
    -moz-box-shadow: #d6d6d6 0px 0px 2px 0px;
    box-shadow: #d6d6d6 0px 0px 2px 0px;
  }

  .edit-header:after {
    display: block;
    clear: both;
    visibility: hidden;
    height: 0;
    overflow: hidden;
    content: "";
  }

  .edit-header:before, .edit-left:before, .edit-left:after, .edit-header:after, .edit-right:before, .edit-right:after {
    content: '';
    display: table;
  }

  .edit-header:after, .edit-left:after, .edit-right:after {
    clear: both;
  }

  .edit-left {
    float: left;
  }

  .edit-left a {
    display: inline-block;
    padding: 4px 15px;
    font-size: 12px;
    color: #33c0cc;
    border: 1px solid #33c0cc;
    border-radius: 4px;
    text-decoration: none;
  }

  .edit-left li {
    float: left;
    margin-right: 15px;
  }

  .edit-left a:hover {
    color: #fff;
    background-color: #33c0cc;
  }

	.edit-left .active {
    color: #fff;
    background-color: #33c0cc;
  }
  
  .edit-right {
    float: right;
  }

  .edit-right li {
    display: inline-block;
  }

  .edit-right a {
    margin-left: 15px;
    font-size: 12px;
    color: #666;
    text-decoration: none;
  }

  .edit-right a span {
    display: inline-block;
    margin-right: 7px;
    width: 16px;
    height: 16px;
    vertical-align: -3px;
    background: url('/static/res/images/cms/icon.png');
  }
</style>
