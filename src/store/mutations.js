import * as types from './mutation-types'

export default {
  /** ***** loading动画 ******** **/
  // 打开加载动画
  [types.LOADING_OPEN](state) {
    //state.publicLoading = true
  },

  // 关闭加载动画
  [types.LOADING_CLOSE](state) {
    //state.publicLoading = false
  },
  // cms模块
  // 请求模板
  [types.SITE_JURISDICTION](state, params) {
    state.sitetemplate.jurisdiction = params
    console.log('sitetemplate权限管理 commit')
  },
  [types.SITE_MANAGESITE](state, params) {
    state.sitetemplate.manageSite = params
    console.log('管理站点列表 commit')
  },
  [types.SITE_SITETEMPLATE](state, params) {
    state.sitetemplate.site_list = params
    console.log('模板列表 commit')
  },
  [types.SITE_TEMPLATEPAGE](state, params) {
    state.sitetemplate.templatePage = params
    console.log('模板分页commit')
  },
  [types.SITE_SITEDATA](state, params) {
    state.sitetemplate.siteData = params
    console.log('网站数据commit')
  },
  [types.SITE_SITECATEGORY](state, params) {
    state.sitetemplate.siteCategory = params
    console.log('菜单获取commit')
  },
  [types.SITE_MENULIST](state, params) {
    state.sitetemplate.menuList = params
    console.log('菜单修改commit')
  },
  [types.SITE_FILETREE](state, params) {
    state.sitetemplate.fileTree = params
    console.log('模板树更新commit')
  },
  [types.SITE_FILEPATH](state, params) {
    state.sitetemplate.filePath = params
    console.log('文件路径commit')
  },
  [types.OPEN_DIALOG] (state, params) {
    state.common.dialogFormVisible = params    // 弹框
  },
  [types.SITE_OPENTYPE] (state, params) {
    state.sitetemplate.fileOpentype = params
    console.log('弹出框打开方式commit')
  },
  [types.SITE_OPERATYPE](state, params) {
    state.sitetemplate.fileOpera = params
    console.log('文件操作方式commit')
  },
  [types.SITE_OLDPATH](state, params) {
    state.sitetemplate.fileOldpath = params
    console.log('原文件路径commit')
  },
  [types.SITE_ACTION](state, params) {
    state.sitetemplate.fileAction = params
    console.log('文件标题commit')
  },
  [types.SITE_CREATEMENU](state, params) {
    state.sitetemplate.createMenu = params
    console.log('菜单创建commit')
  },
  [types.SITE_ITEMS](state, params) {
    state.sitetemplate.items = params
    console.log('站点页面列表结构commit')
  },
  [types.SITE_PAGEITEMS](state, params) {
    state.sitetemplate.pageitems = params
    console.log('页面列表结构commit')
  },
  [types.SITE_LISTDATA](state, params) {
    state.sitetemplate.listdata = params
    console.log('列表数据commit')
  },
  [types.SITE_LISTS](state, params) {
    state.sitetemplate.lists = params
    console.log('列表结构commit')
    console.log(params)
  },
  [types.SITE_LISTSVALUE](state, params) {
    state.sitetemplate.listsvalue = params
    console.log('列表数据commit')
    console.log(params)
  },
  [types.SITE_PAGEID](state, params) {
    state.sitetemplate.pageId = params
    console.log('列表数据commit')
    console.log(params)
  },
  [types.SITE_PAGELIST](state, params) {
    state.sitetemplate.pagelist = params
    console.log('页面菜单数据commit')
    console.log(params)
  },
  [types.SITE_PAGE_FIELD_UPDATE](state, params) {
    state.sitetemplate.fieldUpdated = params
  },
  [types.SITE_IFRAMESRC](state, params) {
    state.sitetemplate.iframeSRC = params
    console.log('iframeSRC commit')
    console.log(params)
  },
  // 请求模板翻页
  /** ***** 全局通用模态框 ******** **/
  /**
   * 打开模态框
   * 参数说明
   * @param state      状态对象
   * @param argus      参数对象
   *  type    string   模态框类型 [ info , success , error , confirm ]
   *  noTitle string   是否需要标题
   *  title   string   模态框标题
   *  content string   模态框内容
   *  html    boolean  内容是否以html渲染 default false
   *  ani     string   模态框载入动画 [ zoom , fade , flip , door , rotate , slideUp , slideDown , slideLeft , slideRight ] default slideDown
   *  height  int      模态框高度 default 240
   *  width   int      模态框宽度 default 400
   *  yes     function 确认回调
   *  close   function 关闭回调
   *  show    boolean  控制开关 true显示，false隐藏
   *  btn     boolean  是否显示按钮 default true
   *  btnText array    按钮文本 default ['取消', '确认']
   */

  // 获取所有管理员
  [types.QUERY_GET_ADMINS](state, argus) {
    let admins = [{name: '所有客户经理', id: null, no: null}, ...argus]
    state.query.admins = admins
    console.log(admins)
  },

  // 获取GET_CUSTOMERS
  [types.QUERY_GET_CUSTOMERS](state, argus) {
    let customers = [{name: '所有客户', id: null, no: null}, ...argus]
    state.query.customers = customers
  },

  // 获取accounts
  [types.QUERY_GET_ACCOUNTS](state, argus) {
    let accounts = [{name: '所有账号', id: null, account: null}, ...argus]
    state.query.accounts = accounts
  },

  // 已选管理员状态改变
  [types.QUERY_CHECK_ADMIN](state, val) {
    state.query.customers = [{name: '所有客户', id: null, no: null}]
    state.query.accounts = [{name: '所有账号', id: null, account: null}]
    state.query.checkCustomer = {name: '所有客户', id: null, no: null}
    state.query.checkAccount = {name: '所有账号', id: null, account: null}
    state.query.checkAdmin = val
  },

  // 已选客户状态改变
  [types.QUERY_CHECK_CUSTOMER](state, val) {
    state.query.accounts = [{name: '所有账号', id: null, account: null}]
    state.query.checkAccount = {name: '所有账号', id: null, account: null}
    state.query.checkCustomer = val
  },

  // 已选账号状态改变
  [types.QUERY_CHECK_ACCOUNT](state, val) {
    state.query.checkAccount = val
  },

  // 获取服务器快捷时间
  [types.QUERY_GET_SERVER_DATE](state, val) {
    state.query.checkDate = val.L_7
    state.query.startTime = val.L_7[0]
    state.query.endTime = val.L_7[1]
    state.query.serverDate = val
  },

  // 设定时间
  [types.QUERY_SET_SEARCH_DATE](state, val) {
    state.query.checkDate = val
    state.query.startTime = val[0]
    state.query.endTime = val[1]
  },

  // 点击按钮状态改变
  [types.QUERY_CHANGE_STATE](state) {
    state.query.changeState = !state.query.changeState
  },

  // copy一份query全局状态
  [types.QUERY_COPY](state, argus) {
    state[argus.module].query.account.id = argus.query.checkAccount.id
    state[argus.module].query.account.name = argus.query.checkAccount.name
    state[argus.module].query.account.account = argus.query.checkAccount.account
    state[argus.module].query.startTime = argus.query.startTime
    state[argus.module].query.endTime = argus.query.endTime
    state[argus.module].query.clientId = argus.query.checkCustomer.id
    state[argus.module].query.pageNum = argus.query.pageNum
    state[argus.module].query.pageSize = argus.query.pageSize
  }
}
