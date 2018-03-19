<style>
 #search  #date-field{height:40px;}
 #search  #date-field .form-control,#searchDateField .btn{height:40px !important;}
 #search  #date-field .form-control{padding-top:0;padding-bottom:0;}
 #search  #date-field .input-group .form-control{border-radius: 5px 0 0 5px;}
 #search  #date-field .input-group .btn{height:40px;border-radius:0 5px 5px 0;}
 #search  #date-field .input-group .form-control .input-wrapper{height:40px;border:0 !important;}
 #search  #date-field .input-group .form-control .input{height:40px; line-height: 40px;white-space: nowrap; overflow: hidden;}
 #search  .search-btn{height:40px; width:100px;}
 #search .multiselect__option--selected.multiselect__option--highlight,#search .multiselect__option--highlight{background-color: #1C7EBB !important; color:#fff}
</style>
<template>
  <div id="search" class="creation">
    <div class="padding">
      <form class="form-horizontal" role="form" id="form">
        <fieldset>
          <div class="row">
            <div class="col-sm-12">
              <div class="form-group">
                <div class="col-sm-2 plr10">
                  <multiselect
                    v-model="checkAdmin"
                    :options="query.admins"
                    placeholder=""
                    :maxHeight="350"
                    :selectLabel="''"
                    :allowEmpty="allowEmpty"
                    :selectedLabel="'当前'"
                    :deselectLabel="''"
                    :custom-label="filterVal"
                    label="name"
                    track-by="name">
                  </multiselect>
                </div>
                <div class="col-sm-2 plr10">
                  <multiselect
                    v-model="checkCustomer"
                    :options="query.customers"
                    :selectLabel="''"
                    :maxHeight="350"
                    :allowEmpty="allowEmpty"
                    :selectedLabel="'当前'"
                    :deselectLabel="''"
                    :custom-label="filterVal"
                    placeholder="客户名称"
                    label="name"
                    track-by="name">
                  </multiselect>
                </div>
                <div class="col-sm-3 plr10">
                    <multiselect
                      v-model="checkAccount"
                      :options="query.accounts"
                      :selectLabel="''"
                      :maxHeight="350"
                      :allowEmpty="allowEmpty"
                      :selectedLabel="'当前'"
                      :custom-label="accountFilterVal"
                      :deselectLabel="''"
                      placeholder="账户名称/CID"
                      label="name"
                      track-by="name">
                    </multiselect>
                </div>
                <div class="col-sm-3 plr10" id="date-field" style="display: block;">
                  <div class="input-group">
                    <datepicker
                      class="form-control"
                      v-model="checkDate"
                      :range="datePicker.range"
                      :max="datePicker.variable"
                      :language="datePicker.language"
                    >
                    </datepicker>
                    <div class="input-group-btn">
                      <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">快速选择 <span class="caret"></span></button>
                      <ul class="dropdown-menu dropdown-menu-right">
                        <li><a @click="selectDate('D_0')" href="javascript:void(0)">今天</a></li>
                        <li><a @click="selectDate('L_1')" href="javascript:void(0)">昨天</a></li>
                        <li><a @click="selectDate('L_W')" href="javascript:void(0)">上个星期</a></li>
                        <li><a @click="selectDate('L_7')" href="javascript:void(0)">过去七天</a></li>
                        <li><a @click="selectDate('M_0')" href="javascript:void(0)">本月</a></li>
                        <li><a @click="selectDate('L_M')" href="javascript:void(0)">上个月</a></li>
                        <li><a @click="selectDate('L_30')" href="javascript:void(0)">过去三十天</a></li>
                        <li><a @click="selectDate('L_90')" href="javascript:void(0)">过去九十天</a></li>
                      </ul>
                    </div>
                  </div>

                </div>

                <div class="col-sm-2  text-left plr10">
                  <button @click="action" type="button" class="btn btn-default search-btn">查询</button>
                </div>

              </div>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
  import Multiselect from 'vue-multiselect'
  import 'vue-multiselect/dist/vue-multiselect.min.css'
  var moment = require('moment')
  import datepicker from 'vue-date'
  export default {
    name: 'search',
    data () {
      return {
        // 时间选择器选项
        datePicker: {
          variable: moment().format('YYYY-MM-DD'),
          language: 'ch',
          range: true
        },
        isWatchAdmin: false,
        allowEmpty: false
      }
    },
    computed: {
      query () {
        return this.$store.state.query
      },
      checkAdmin: {
        get () {
          return this.$store.state.query.checkAdmin
        },
        set (val) {
          this.$store.commit('QUERY_CHECK_ADMIN', val)
        }
      },
      checkCustomer: {
        get () {
          return this.$store.state.query.checkCustomer
        },
        set (val) {
          this.$store.commit('QUERY_CHECK_CUSTOMER', val)
        }
      },
      checkAccount: {
        get () {
          return this.$store.state.query.checkAccount
        },
        set (val) {
          this.$store.commit('QUERY_CHECK_ACCOUNT', val)
        }
      },
      checkDate: {
        get () {
          return this.$store.state.query.checkDate
        },
        set (val) {
          this.$store.commit('QUERY_SET_SEARCH_DATE', val)
        }
      },
      allMainView () {
        return this.$store.state.AllModule.mainView
      },
      AllModule () {
        return this.$store.state.AllModule
      }

    },
    components: {
      datepicker,
      Multiselect
    },
    mounted: function () {
      // 默认读取所有用户
      this.$store.dispatch('Root_getAdmins')
      this.$store.dispatch('Root_getCustomers')
      this.$store.dispatch('Root_getServicesTime')
    },
    methods: {
      // 下拉内容过滤
      filterVal (object) {
        if (!object.no) {
          return object.name
        }
        return `${object.no}/${object.name}`
      },
      // 账号下拉内容过滤
      accountFilterVal (object) {
        if (!object.account) {
          return object.name
        }
        return `${object.account}/${object.name}`
      },
      // 选中时间
      selectDate (key) {
        this.checkDate = this.query.serverDate[key]
      },
      // 查询操作
      action () {
        // 视图切换
        this.$store.commit('COMPONENT_VIEW', {path: 'AllSeries'})
        // 判断是否选中account账号
        if (!this.query.checkAccount.account) {
          this.$store.commit('MODAL_OPEN', {
            type: 'error',
            content: '请选择账号信息！',
            btn: false,
            width: 250,
            height: 120
          })
          return
        }

        // 判断是否选中日期
        if (this.query.startTime === '' && this.query.endTime === '') {
          this.$store.commit('MODAL_OPEN', {
            type: 'error',
            content: '请选择时间段！',
            btn: false,
            width: 250,
            height: 120
          })
          return
        }
        // 注入一份account到其他 model
        this.$store.commit('QUERY_COPY', {module: 'AllModule', query: this.query})
        this.$store.commit('QUERY_COPY', {module: 'DisplayModule', query: this.query})
        this.$store.commit('QUERY_COPY', {module: 'SearchModule', query: this.query})
        // 点击了搜索按钮，状态变一下(处理所有分页归位)
        this.$store.commit('QUERY_CHANGE_STATE')
        // 获取sortMenu
        this.$store.dispatch('Root_getSortMenu')
        switch (this.allMainView) {
          case 'A-Series':
            this.$store.dispatch('All_getSeriesAllList')
            break
          case 'A-Group':
            this.$store.dispatch('All_getGroupAllList')
            break
          case 'A-Setting':
            // 判断当前settingView
            switch (this.AllModule.settingView) {
              case 'SettingAll':
                this.$store.dispatch('All_getSettingAll')
                break
              case 'SettingLocation':
                this.$store.dispatch('All_getSettingLocation')
                break
              case 'SettingDeliveryTime':
                this.$store.dispatch('All_getSettingDeliveryTime')
                break
              case 'SettingDevice':
                this.$store.dispatch('All_getSettingDeviceAll')
                break
            }
            break
          case 'A-Adverts':
            this.$store.dispatch('All_getAdvertsList')
            break
        }
      }
    },
    watch: {
      // 观测选中客户经理
      checkAdmin (val, oldVal) {
        this.isWatchAdmin = true
        if (Object.is(val, oldVal) === false) {
          this.$store.dispatch('Root_getCustomers', this.checkAdmin.id)
        }
      },
      // 观测选中客户
      checkCustomer (val, oldVal) {
        if (this.isWatchAdmin) {
          this.isWatchAdmin = false
          return
        }
        if (Object.is(val, oldVal) === false) {
          this.$store.dispatch('Root_getAccounts', this.checkCustomer.id)
        }
      },
      // 观测选中账号
      checkAccount () {
        if (this.AllModule.query.account.account !== null && this.query.checkAccount.account !== null) {
          this.$store.commit('MODAL_OPEN', {
            type: 'confirm',
            content: '账号已变更是否重新加载数据？',
            height: 180,
            yes: this.action
          })
        }
      }
    }
}

</script>
