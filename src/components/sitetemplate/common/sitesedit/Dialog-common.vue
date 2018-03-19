<template>
	<div>
		<div class="listAlertMask in"></div>
		<div class="listAlert" :class="{'in':appear.type == 'input'}" style="height: auto">
			<h4>{{aheadpath}}[{{aheadpath}}] <button type="button" data-dismiss="modal" aria-hidden="true" class="close" @click="closethis">×</button></h4>
			<div class="listscorllin">
				<div class="listAlertContent">
					<div class="settings-list">
						<div class="list-text">
							名称 :
						</div>
						<div class="list-information">
							<input type="text" v-model="newfiel"/>
						</div>
					</div>
				</div>
			</div>
			<div class="addListBottom">
				<button class="addListCancel" @click="closethis">取消</button>
				<button class="addListSave" @click='summitCreate()'>保存</button>
			</div>
		</div>
		<div class="listAlert" :class="{'in':appear.type == 'textarea'}" style="width: 90%;margin-left: -45%;height: auto;">
			<h4>文件编辑[{{aheadpath}}/{{newfiel}}] <button type="button" data-dismiss="modal" aria-hidden="true" class="close" @click="closethis">×</button></h4>
			<div class="listscorllin">
				<div class="listAlertContent">
					<div class="settings-list">
						<div class="list-information" style="width: 100%; padding-right: 0;height:500px;">
							<textarea id='fileTextarea'></textarea>
						</div>
					</div>
				</div>
			</div>
			<div class="addListBottom">
				<button class="addListCancel" @click="closethis">取消</button>
				<button class="addListSave" @click='submitUpdata()'>保存</button>
			</div>
		</div>
		<div class="listAlert" :class="{'in':appear.type == 'file'}" style="height: auto">
			<h4>图片编辑[{{aheadpath}}] <button type="button" data-dismiss="modal" aria-hidden="true" class="close" @click="closethis">×</button></h4>
			<div class="listscorllin">
				<div class="listAlertContent">
					<div class="settings-list">
						<div class="list-text">
							文件 :
						</div>
						<div class="list-information">
							<input type="file" @change="fileChange($event)" style="width:40%;visibility: hidden;position:absolute;" ref="inputfile"/>
							<div class="fileSelect" @click="refinput">{{fileName}}</div>
						</div>
					</div>
				</div>
			</div>
			<div class="addListBottom">
				<button class="addListCancel" @click="closethis">取消</button>
				<button class="addListSave" @click='submitFile'>保存</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
	  data () {
	    return {
	      newfiel: '',
	      newtextarea: '',
	      editor: null,
	      uploadFile: {},
	      fileName: '请选择文件 +'
	    }
	  },
	  mounted () {
	    if (this.appear.type === 'textarea') {
	      this.getFile()
	    }
	  },
	  computed: {
	    wholepath () {
	      return this.$store.state.sitetemplate.filePath
	    },
	    appear () {
	      return this.$store.state.sitetemplate.fileOpentype
	    },
	    operaType () {
	      return this.$store.state.sitetemplate.fileOpera
	    },
	    aheadpath () {
	      return this.$store.state.sitetemplate.fileOldpath
	    },
	    action () {
	      return this.$store.state.sitetemplate.fileAction
	    }
	  },
	  methods: {
	    closethis () {
	      this.newfiel = ''
	      this.newtextarea = ''
	      this.uploadFile = {}
	      this.$store.commit('SITE_OPENTYPE', {open: false, input: false, textarea: false, type: ''})
	    },
	    summitCreate () {
	      console.log(this.operaType)
	      let extStart = this.newfiel.lastIndexOf('.')
	      let ext = this.newfiel.substring(extStart, this.newfiel.length).toLowerCase()
	      if (this.newfiel === '') {
	        this.$tip('请填写文件名称')
	        return
	      } else if(ext == '.bmp' || ext == '.png' || ext == '.gif' || ext == '.jpg' || ext =='.jpeg'){
	      	this.$store.commit('SITE_OPENTYPE', {open: true, input: false, textarea: false, type: 'file'})
	      	return
	      }
	      this.$store.commit('SITE_FILEPATH', this.aheadpath + '/' + this.newfiel)
	      if (this.operaType === 'addFolder') {
	        this.$rest.post('/cms/rest/siteTemplate/fileOperate.do', {'id': this.$route.query.templateId, 'operation': this.operaType, 'path': this.wholepath}).then(response => {
	          this.updataTree()
	          console.log('新建文件夹成功')
	          this.$tip('新建文件夹成功', 'success')
	          this.$store.commit('SITE_OPENTYPE', {open: false, input: false, textarea: false, type: ''})
	        })
	      } else if (this.operaType === 'updateFile') {
	        this.$rest.post('/cms/rest/siteTemplate/fileOperate.do', {'id': this.$route.query.templateId, 'operation': this.operaType, 'path': this.wholepath, 'content': ''}, {timeout: 10000, emulateJSON: true}).then(response => {
	          this.updataTree()
	          this.getFile()
	          this.$tip('新建文件成功', 'success')
	        })
	      }
	    },
	    submitUpdata () {
	      console.log('Path===>' + this.wholepath)
	      this.newtextarea = this.editor.getValue()
	      this.$rest.post('/cms/rest/siteTemplate/fileOperate.do', {'id': this.$route.query.templateId, 'path': this.wholepath, 'content': this.newtextarea, operation: 'updateFile'}).then(response => {
	        this.closethis()
	        this.newtextarea = ''
	        this.$tip('修改成功', 'success')
	      }, response => {
	        console.log('ssd')
	      }
	      )
	    },
	    fileChange (e) {
	    	console.log(e)
	    	console.log(e.target.value)
	    	this.fileName = e.target.files.length === 1? e.target.files[0].name : '请选择文件 +'
	    	this.uploadFile = e.target.files[0]
	    },
	    refinput () {
	    	console.log('refClick')
	    	console.log(this.$refs.inputfile)
	    	this.$refs.inputfile.click()
	    },
	    submitFile () {
	        console.log(this.uploadFile.name)
	        if (this.uploadFile.name === undefined) {
	        	this.$message({message: '请选择文件',type: 'warning'})
	        	return
	        }
	        if (this.newfiel === '') {
		        this.$store.commit('SITE_FILEPATH', this.aheadpath)
		    } else {
		        this.$store.commit('SITE_FILEPATH', this.aheadpath + '/' + this.newfiel)
		    }
	        let data = new FormData()
	        data.append('id', this.$route.query.templateId)
	        data.append('file', this.uploadFile)
	        data.append('path', this.wholepath)
	        data.append('operation', 'updateFile')
	        let that = this
	        $.ajax({
	          type: 'POST',
	          global: false,
	          url: '/cms/rest/siteTemplate/fileOperate.do',
	          dataType: 'json',
	          data: data,
	          processData: false,
	          contentType: false,
	          success: function (rsp) {
	          	that.$message({message: '文件上传成功',type: 'success'})
	          	that.updataTree()
	          	that.closethis()
	          	console.log(rsp)
	          }, complete: function () {
	          }
	        })
	    },
	    getFile () {
	      this.newtextarea = ''
	      if (this.newfiel === '') {
	        this.$store.commit('SITE_FILEPATH', this.aheadpath)
	      } else {
	        this.$store.commit('SITE_FILEPATH', this.aheadpath + '/' + this.newfiel)
	      }
	      if (this.appear.type == 'file'){
	      	return
	      }
	      this.$store.commit('SITE_OPENTYPE', {open: true, input: false, textarea: true, type: 'textarea'})
	      console.log('getFile---------->' + this.wholepath)
	      this.$rest.get('/cms/rest/siteTemplate/textFileDetails', {'id': this.$route.query.templateId, 'path': this.wholepath}).then(response => {
	        this.newtextarea = response.data.content
	        this.codemirrorInit()
	        this.$store.commit('SITE_OPENTYPE', {open: true, input: false, textarea: true, type: 'textarea'})
	      }, response => {
	        console.log('fail')
	      }
	      )
	    },
	    updataTree () {
	    	this.$rest.get('/cms/rest/siteTemplate/getDetail', {'id': this.$route.query.templateId}).then(response => {
	            console.log('列表更新成功')
	            this.$store.commit('SITE_FILETREE', response.data.fileTree.children)
	        })
	    },
	    codemirrorInit (txt) {
	      let mode = 'text/plain'
	      if (this.wholepath.indexOf('.css') !== -1) {
	        console.log('css')
	        mode = 'text/css'
	      } else if (this.wholepath.indexOf('.js') !== -1) {
	        console.log('js')
	        mode = 'application/javascript'
	      } else if (this.wholepath.indexOf('.html') !== -1) {
	        console.log('html')
	        mode = 'text/html'
	      }
	      this.editor = window.CodeMirror.fromTextArea(document.getElementById('fileTextarea'), {
	        styleActiveLine: true,
	        lineNumbers: true,
	        lineWrapping: true,
	        indentWithTabs: true,
	        smartIndent: true,
	        matchBrackets: true,
	        autofocus: true,
	        highlightSelectionMatches: {showToken: /\w/, annotateScrollbar: true},
	        mode: mode,
	        extraKeys: {
	          'Alt-/': 'autocomplete'
	        }
	      }
	      )
	      console.log('-----------------+++ this.newtextarea')
	      console.log(this.newtextarea)
	      this.editor.setValue(this.newtextarea)
	    }
	  }
	}
</script>

<style>
	.CodeMirror{
		height: 500px;
	}
	.listAlertMask{
	    background: rgba(0,0,0,0);
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
	.listAlertMask.in{
	    background: rgba(0,0,0,0.5);
	    visibility: visible;
	}
	.fileSelect {
		display: inline-block;
		padding: 0 10px;
		height: 34px;
        line-height: 33px;
        text-indent: 0px;
        color: #30C3CD;
    	border: 1px solid #30C3CD;
    	cursor: pointer
	}
	.listAlert{
	    opacity: 0;
	    -webkit-transform: translate(0, -5%);
	    transform: translate(0, -5%);
	    transition: 0.5s all ease;
	    -moz-transition: 0.5s all ease;
	    -webkit-transition: 0.5s all ease;
	    -o-transition: 0.5s all ease;
	    box-shadow: 0 5px 15px rgba(0,0,0,0.5);
	    background-color: #fff;
	    border: 1px solid rgba(0,0,0,0.2);
	    background-clip: padding-box;
	    margin: 30px auto;
	    width: 70%;
	    position: fixed;
	    top: 5%;
	    left: 50%;
	    margin-left: -35%;
	    z-index: -1;
	    border-radius: 5px 5px 5px 5px;
	}
	.listAlert.in{
	    -webkit-transform: translate(0, 0);
	    transform: translate(0, 0);
	    opacity: 1;
	    z-index: 9999;
	}
	.listAlert h4{
	    padding: 15px;
	    margin: 0;
	    border-bottom: 1px solid #e5e5e5;
	}
	.addListBottom{
	    background: #f2f4f5;
	    padding: 15px 20px;
	    text-align: right;
	    border-radius: 0 0 15px 15px;
	    box-shadow: 0 5px 15px rgba(0,0,0,0.5);
	}
	.addListBottom button {
	    font-size: 14px;
	    border: none;
	    border-radius: 3px;
	    padding: 8px 25px;
	    margin-left: 5px;
	}
	.addListBottom .addListCancel{
	    background: #cfd5d8;
	    color: #333;
	}
	.addListBottom .addListSave {
	    background: #33c0cc;
	    color: #fff;
	}
	.listscorllin {
		padding: 25px 0 20px;
	    overflow-x: hidden;
	    overflow-y: auto;
	    background-color: #fff;
	}
	.listAlertContent {
	    padding: 0 50px;
	}
	.settings-list {
	    display: block;
	    font-size: 14px;
	    margin-bottom: 16px;
	}
	.settings-list:before, .settings-list:after {
		content: '';
		display: table;
	}
	.settings-list:after {
		clear: both;
	}
	.list-text, .list-information {
	    float: left;
	    display: inline;
	}
	.list-information {
		position: relative;
	    width: 84%;
	    margin-left: 1%;
	    padding-right: 5%;
	}
	.list-text {
	    width: 15%;
	    text-align: right;
	    color: #666666;
	    margin-top: 7px;
	}
	.list-information input, .list-information textarea {
	    border: 1px solid #d0d5d7;
	    color: #666666;
	    border-radius: 5px;
	    height: 34px;
	    width: 100%;
	    text-indent: 10px;
	}
</style>
