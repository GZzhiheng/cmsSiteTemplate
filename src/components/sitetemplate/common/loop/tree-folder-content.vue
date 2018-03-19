<template>
	<div>
		<ul v-for="lists in fileTree">
  			<template v-if="lists.name == 'META'">
	  			<li :style="'padding-left:' + paddingLeft + 'px'" @click.prevent="showChild" class='off' :data-list-type="lists.name" :datatype="lists.type">	
	  				模板元素目录<label datatype="child" class="off">[{{lists.path}}]</label>
	  				<template v-if="lists.type == 'dir'">
	  					<div v-if='lists.children'><span class="pinterStop">修改</span><span class="pinterStop" @click.stop="fileDownload(lists)">下载</span><span @click.stop='showAlert("updateFile", lists.path, "新建文件",openinput)'>新建文件</span><span @click.stop='showAlert("addFolder", lists.path, "新建文件夹", openinput)'>新建文件夹</span><span class="pinterStop">删除</span></div>
	  					<div v-else><span class="pinterStop">修改</span><span class="pinterStop" @click.stop="fileDownload(lists)">下载</span><span @click.stop='showAlert("updateFile", lists.path, "新建文件",openinput)'>新建文件</span><span @click.stop='showAlert("addFolder", lists.path, "新建文件夹", openinput)'>新建文件夹</span><span @click.stop="fileDelete(lists)">删除</span></div>
	  				</template>
	  				<template v-else>
	  					<div><span @click.stop="showAlert('updateFile',lists.path,'文件编辑',opentextarea)">修改</span><span @click.stop="fileDownload(lists)">下载</span><span class="pinterStop">新建文件</span><span class="pinterStop">新建文件夹</span><span @click.stop="fileDelete(lists)">删除</span></div>
	  				</template>
	  			</li>
  			</template>
  			<template v-else-if="lists.name == 'dynamic'">
  				<li :style="'padding-left:' + paddingLeft + 'px'" @click.prevent="showChild" class='off' :data-list-type="lists.name" :datatype="lists.type">
	  				动态页面目录<label datatype="child" class="off">[{{lists.path}}]</label>
	  				<template v-if="lists.type == 'dir'">
	  					<div v-if='lists.children'><span class="pinterStop">修改</span><span class="pinterStop" @click.stop="fileDownload(lists)">下载</span><span @click.stop='showAlert("updateFile", lists.path, "新建文件",openinput)'>新建文件</span><span @click.stop='showAlert("addFolder", lists.path, "新建文件夹", openinput)'>新建文件夹</span><span class="pinterStop">删除</span></div>
	  					<div v-else><span class="pinterStop">修改</span><span class="pinterStop" @click.stop="fileDownload(lists)">下载</span><span @click.stop='showAlert("updateFile", lists.path, "新建文件",openinput)'>新建文件</span><span @click.stop='showAlert("addFolder", lists.path, "新建文件夹", openinput)'>新建文件夹</span><span @click.stop="fileDelete(lists)">删除</span></div>
	  				</template>
	  				<template v-else>
	  					<div><span @click.stop="showAlert('updateFile',lists.path,'文件编辑',opentextarea)">修改</span><span @click.stop="fileDownload(lists)">下载</span><span class="pinterStop">新建文件</span><span class="pinterStop">新建文件夹</span><span @click.stop="fileDelete(lists)">删除</span></div>
	  				</template>
  				</li>
  			</template>
  			<template v-else-if="lists.name == 'pages'">
  				<li :style="'padding-left:' + paddingLeft + 'px'" @click.prevent="showChild" class='off' :data-list-type="lists.name" :datatype="lists.type">
	  				模板页面目录<label datatype="child" class="off">[{{lists.path}}]</label>
	  				<template v-if="lists.type == 'dir'">
	  					<div v-if='lists.children'><span class="pinterStop">修改</span><span class="pinterStop" @click.stop="fileDownload(lists)">下载</span><span @click.stop='showAlert("updateFile", lists.path, "新建文件",openinput)'>新建文件</span><span @click.stop='showAlert("addFolder", lists.path, "新建文件夹", openinput)'>新建文件夹</span><span class="pinterStop">删除</span></div>
	  					<div v-else><span class="pinterStop">修改</span><span class="pinterStop" @click.stop="fileDownload(lists)">下载</span><span @click.stop='showAlert("updateFile", lists.path, "新建文件",openinput)'>新建文件</span><span @click.stop='showAlert("addFolder", lists.path, "新建文件夹", openinput)'>新建文件夹</span><span @click.stop="fileDelete(lists)">删除</span></div>
	  				</template>
	  				<template v-else>
	  					<div><span @click.stop="showAlert('updateFile',lists.path,'文件编辑',opentextarea)">修改</span><span @click.stop="fileDownload(lists)">下载</span><span class="pinterStop">新建文件</span><span class="pinterStop">新建文件夹</span><span @click.stop="fileDelete(lists)">删除</span></div>
	  				</template>
	  			</li>
  			</template>
  			<template v-else-if="lists.name == 'res'">
  				<li :style="'padding-left:' + paddingLeft + 'px'" @click.prevent="showChild" class='off' :data-list-type="lists.name" :datatype="lists.type">
	  				模板静态资源<label datatype="child" class="off">[{{lists.path}}]</label>
	  				<template v-if="lists.type == 'dir'">
	  					<div v-if='lists.children'><span class="pinterStop">修改</span><span class="pinterStop" @click.stop="fileDownload(lists)">下载</span><span @click.stop='showAlert("updateFile", lists.path, "新建文件",openinput)'>新建文件</span><span @click.stop='showAlert("addFolder", lists.path, "新建文件夹", openinput)'>新建文件夹</span><span class="pinterStop">删除</span></div>
	  					<div v-else><span class="pinterStop">修改</span><span class="pinterStop" @click.stop="fileDownload(lists)">下载</span><span @click.stop='showAlert("updateFile", lists.path, "新建文件",openinput)'>新建文件</span><span @click.stop='showAlert("addFolder", lists.path, "新建文件夹", openinput)'>新建文件夹</span><span @click.stop="fileDelete(lists)">删除</span></div>
	  				</template>
	  				<template v-else>
	  					<div><span @click.stop="showAlert('updateFile',lists.path,'文件编辑',opentextarea)">修改</span><span @click.stop="fileDownload(lists)">下载</span><span class="pinterStop">新建文件</span><span class="pinterStop">新建文件夹</span><span @click.stop="fileDelete(lists)">删除</span></div>
	  				</template>
	  			</li>
  			</template>
  			<template v-else>
  				<li :style="'padding-left:' + paddingLeft + 'px'" @click.prevent="showChild" class='off' :data-list-type="lists.name" :datatype="lists.type">
	  				{{lists.name}}<label datatype="child" class="off">[{{lists.path}}]</label>
	  				<template v-if="lists.type == 'dir'">
	  					<div v-if='lists.children'><span class="pinterStop">修改</span><span class="pinterStop" @click.stop="fileDownload(lists)">下载</span><span @click.stop='showAlert("updateFile", lists.path, "新建文件",openinput)'>新建文件</span><span @click.stop='showAlert("addFolder", lists.path, "新建文件夹", openinput)'>新建文件夹</span><span class="pinterStop">删除</span></div>
	  					<div v-else><span class="pinterStop">修改</span><span class="pinterStop" @click.stop="fileDownload(lists)">下载</span><span @click.stop='showAlert("updateFile", lists.path, "新建文件",openinput)'>新建文件</span><span @click.stop='showAlert("addFolder", lists.path, "新建文件夹", openinput)'>新建文件夹</span><span @click.stop="fileDelete(lists)">删除</span></div>
	  				</template>
	  				<template v-else>
	  					<div><span @click.stop="showAlert('updateFile',lists.path,'文件编辑',opentextarea)">修改</span><span @click.stop="fileDownload(lists)">下载</span><span class="pinterStop">新建文件</span><span class="pinterStop">新建文件夹</span><span @click.stop="fileDelete(lists)">删除</span></div>
	  				</template>
  				</li>
  			</template>
	  		<div>
	  			<treeFolder :folder="lists" :childleft="paddingLeft"></treeFolder>
	  		</div>
		</ul>
	</div>
</template>

<script>
	import Dialogcommon from '../sitesedit/Dialog-common'
	export default{
	  data () {
	    return {
	      opentextarea: {open: true, input: false, textarea: true, type: "textarea"},
	      openinput: {open: true, input: true, textarea: false, type: 'input'},
	      openfile: {open: true, input: false, textarea: false, type: 'file'}
	    }
	  },
	  props: ['fileTree', 'leftSpace'],
	  computed: {
	    paddingLeft () {
	      let _left = this.leftSpace + 30
	      return _left
	    }
	  },
	  beforeCreate: function () {
	    this.$options.components.treeFolder = require('./tree-folder.vue')
	  },
	  methods: {
	    showChild (e) {
	      console.log(e.target.attributes.datatype.value)
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
