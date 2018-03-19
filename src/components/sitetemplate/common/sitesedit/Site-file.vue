<template>
  <div>
    <div class="attachment-box">
		<span>
			上传文件
			<input @change="uploadAttachment($event)" type="file" title="选择文件" class="attachment"/>
		</span>
      <span class="deleteAttachment" v-if="showAttachment" @click="deleteAttachment">删除</span>
      <a class="attachmentLink" target="_blank" :href="GLOBAL.IMAGE_ROOT + attachmentLink"
         v-if="showAttachment">下载附件</a>
    </div>
  </div>
</template>
<script>

  export default {
    data() {
      return {
        attachmentLink: '',
        uploadFile: null,
        showAttachment: false
      }
    },
    props: ['value'],
    mounted() {
      if (this.value !== '') {
        this.showAttachment = true
      }
    },
    methods: {
      uploadAttachment(e) {
        this.uploadFile = e.target.files[0]
        var data = new FormData()
        data.append('file', this.uploadFile)
        this.$rest.post('/cms/rest/common/upload_attachment.do', data).then((rs) => {
          this.$emit('input', rs.data)
          this.attachmentLink = rs.data
          this.showAttachment = true
        })
      },
      deleteAttachment() {
        this.$emit('input', '')
        this.showAttachment = false
      }
    }
  }
</script>
<style>
  .attachment-box {
    margin-top: 8px;
  }

  .attachment-box span {
    color: #fff;
    background: #33c0cc;
    padding: 10px;
    position: relative;
    border-radius: 5px;
    cursor: pointer;
  }

  .attachment-box .attachment {
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
    display: block;
    outline: 0;
    height: 100%;
    width: 100%;
    border: none;
    opacity: 0;
    cursor: pointer;
  }

  .deleteAttachment {
    margin-left: 5px;
    background: #e63624 !important;
  }

  .attachment-box a {
    margin-left: 5px;
  }
</style>
