<template>
	<ul>
		<template v-for="files in folder.children">
			<template>
				<li @click.prevent="showChild" class="off" :datatype="files.type" :style="'padding-left:' + addleft + 'px'" v-if="files.name == 'global.html'">站点全局配置文件<label datatype="child" class="off">[{{files.path}}]</label>
					<template v-if="files.type == 'dir'">
	  					<div v-if='files.children'><span class="pinterStop">修改</span><span class="pinterStop" @click.stop="fileDownload(files)">下载</span><span @click.stop='showAlert("updateFile", files.path, "新建文件",openinput)'>新建文件</span><span @click.stop='showAlert("addFolder", files.path, "新建文件夹", openinput)'>新建文件夹</span><span class="pinterStop">删除</span></div>
	  					<div v-else><span class="pinterStop">修改</span><span class="pinterStop" @click.stop="fileDownload(files)">下载</span><span @click.stop='showAlert("updateFile", files.path, "新建文件",openinput)'>新建文件</span><span @click.stop='showAlert("addFolder", files.path, "新建文件夹", openinput)'>新建文件夹dd</span><span @click.stop="fileDelete(files)">删除</span></div>
	  				</template>
	  				<template v-else>
	  					<div><span @click.stop="showAlert('updateFile',files.path,'文件编辑',opentextarea)">修改</span><span @click.stop="fileDownload(files)">下载</span><span class="pinterStop">新建文件</span><span class="pinterStop">新建文件夹</span><span @click.stop="fileDelete(files)">删除</span></div>
	  				</template>
	  			</li>
				<li @click.prevent="showChild" class="off" :datatype="files.type" :style="'padding-left:' + addleft + 'px'" v-else>{{files.name}}<label datatype="child" class="off">[{{files.path}}]</label>
					<template v-if="files.type == 'dir'">
	  					<div v-if='files.children'><span class="pinterStop">修改</span><span class="pinterStop" @click.stop="fileDownload(files)">下载</span><span @click.stop='showAlert("updateFile", files.path, "新建文件",openinput)'>新建文件</span><span @click.stop='showAlert("addFolder", files.path, "新建文件夹", openinput)'>新建文件夹</span><span class="pinterStop">删除</span></div>
	  					<div v-else><span class="pinterStop">修改</span><span class="pinterStop" @click.stop="fileDownload(files)">下载</span><span @click.stop='showAlert("updateFile", files.path, "新建文件",openinput)'>新建文件</span><span @click.stop='showAlert("addFolder", files.path, "新建文件夹", openinput)'>新建文件夹</span><span @click.stop="fileDelete(files)">删除</span></div>
	  				</template>
	  				<template v-else>
	  					<div><span @click.stop="showAlert('updateFile',files.path,'文件编辑',opentextarea)">修改</span><span @click.stop="fileDownload(files)">下载</span><span class="pinterStop">新建文件</span><span class="pinterStop">新建文件夹</span><span @click.stop="fileDelete(files)">删除</span></div>
	  				</template>
				</li>
			</template>
			<treeFolderContent v-if="files.children" :fileTree='files.children' :leftSpace='addleft'></treeFolderContent>
		</template>
	</ul>
</template>

<script>
	import treeFolderContent from './tree-folder-content'
	
	export default{
	  data () {
	    return {
	      opentextarea: {open: true, input: false, textarea: true, type: "textarea"},
	      openinput: {open: true, input: true, textarea: false, type: 'input'},
	      openfile: {open: true, input: false, textarea: false, type: 'file'}
	    }
	  },
	  props: ['folder', 'childleft'],
	  computed: {
	    addleft () {
	      let left = this.childleft + 20
	      return left
	    }
	  },
	  components: {treeFolderContent},
	  methods: {
	    showChild (e) {
	      let fileType = e.target.attributes.datatype.value
	      if (fileType === 'dir') {
	        let thisName = e.target.className
	        if (thisName === 'off') {
	          e.target.attributes.class.value = 'on'
	        } else {
	          e.target.attributes.class.value = 'off'
	        }
	      } else if (fileType === 'child') {
	      	let thisName = e.target.parentNode.className
	      	if (thisName === 'off') {
	          e.target.parentNode.attributes.class.value = 'on'
	        } else {
	          e.target.parentNode.attributes.class.value = 'off'
	        }
	      }
	    },
	    fileDownload (file) {
	      console.log(file)
	      window.open('/cms/rest/siteTemplate/binaryFileContent?id=' + this.$route.query.templateId + '&path=' + file.path)
	    },
	    fileDelete (tfile) {
	      console.log(tfile)
	      this.$conf('是否确认删除？').then(() => this.$rest.post('/cms/rest/siteTemplate/fileOperate.do', {'id': this.$route.query.templateId, 'operation': 'delete', 'path': tfile.path}).then(response => {
	        console.log('删除成功')
	        this.$tip('删除成功', 'success')
	        this.$rest.get('/cms/rest/siteTemplate/getDetail', {'id': this.$route.query.templateId}).then(response => {
	          console.log('列表更新成功')
	          this.$store.commit('SITE_FILETREE', response.data.fileTree.children)
	        })
	      }))
	    },
	    showAlert (operation, path, action, opentype) {
	      console.log(operation)
	      console.log(path)
	      console.log(opentype)
	      let extStart = path.lastIndexOf('.')
	      let ext = path.substring(extStart, path.length).toLowerCase()
	      if(ext == '.bmp' || ext == '.png' || ext == '.gif' || ext == '.jpg' || ext =='.jpeg'){
	      	console.log('openFile----===')
	      	this.$store.commit('SITE_OPENTYPE', this.openfile)
	      } else {
	      	this.$store.commit('SITE_OPENTYPE', opentype)
	      }
	      this.$store.commit('SITE_OPERATYPE', operation)
	      this.$store.commit('SITE_OLDPATH', path)
	      this.$store.commit('SITE_ACTION', action)
	    }
	  }
	}
</script>

<style>
</style>
