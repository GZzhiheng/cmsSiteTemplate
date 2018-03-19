<template>
  <div class="accelerate-setting">
    <!--<label for="" class="label-tip">（注意：以下所有非列表数据修改需保存后方能生效）</label>-->
    <div class="input-box" v-for="cdn in cdnList">
      <input type="checkbox" @click="submitCdn()" checked="cdn.checked" id="cdn-checkbox">
      <label class="input-text" for="cdn-checkbox">{{cdn.area}}</label>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        cdnList: []
      }
    },
    mounted() {
      this.$rest.get('/cms/rest/site/cdn', {id: this.$route.query.siteId, type: 'site'}).then(response => {
        this.cdnList = response.data
      })
    },
    methods: {
      submitCdn() {
        let newId = ''
        console.log(this.cdnList[0].checked)
        this.cdnList[0].checked == true ? newId = '' : newId = 1
        console.log('newId-->' + newId)
        this.$rest.post('/cms/rest/site/updateCdn.do', {cdnId: newId, id: this.$route.query.siteId}).then(response => {
          console.log('修改cdn成功')
          this.$rest.get('/cms/rest/site/cdn', {id: this.$route.query.siteId, type: 'site'}).then(response => {
            this.cdnList = response.data
            console.log(response.data)
          })
        })
      }
    }
  }
</script>


<style>
  .accelerate-setting {
    margin: 10px 20px 0px 20px;
    padding: 20px;
    min-width: 1084px;
    background-color: #fff;
    border-radius: 10px;
    min-height: 830px;
    margin-top: 60px;
  }

  @media (max-width: 1366px) {
    .accelerate-setting {
      min-height: 650px;
    }
  }

  .input-box {
    margin-left: 10px;
  }

  .input-box input {
    margin-top: 5px;
    float: left;
    margin-right: 6px;
  }

  .label-tip {
    color: #33c0cc;
    font-weight: normal;
    font-size: 14px;
    display: block;
    margin-bottom: 10px;
  }

  .input-text {
    color: #666666;
    display: inline;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: -10px;

  }
</style>
