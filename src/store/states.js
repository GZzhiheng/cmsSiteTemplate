export default {
  /***
   * 公共变量
   * ***/
  common: {
    dialogFormVisible: false,           // 弹窗变量
    dateGather: {                        // 日期变量
      value: '',
      bol: false,
      start: new Date((new Date().getTime() - 3600 * 1000 * 24 * 7)).getFullYear() + '-' + Number(new Date((new Date().getTime() - 3600 * 1000 * 24 * 7)).getMonth() + 1) + '-' + new Date((new Date().getTime() - 3600 * 1000 * 24 * 7)).getDate(),
      end: new Date().getFullYear() + '-' + Number(new Date().getMonth() + 1) + '-' + new Date().getDate(),
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  sitetemplate: {
  	jurisdiction: null,
    manageSite: null,
    reqtemplateid: '11',
    industry_list2: ['行业列表'],
    site_list: ['初始模板'],
    templatePage: {index: 1, rowCount: 1, size: 8},
    draftsList: {index: 1, pageCount: 1, rowCount: 1, size: 20},
    siteData: {
      id: null,
      daterangepicker: null,
      start: null,
      end: null,
      cmsType: null
    },
    siteCategory: null,
    menuList: {},
    createMenu: {},
    listdata: [],
    lists: [],
    items: [],
    pageitems: null,
    listsvalue: [],
    fileTree: null,
    filePath: '',
    fileOpentype: {open: false, input: false, textarea: false, type: ''},
    fileOperaType: '',
    fileOldpath: '',
    fileAction: '',
    pagelist: [],
    pageId: '',
    iframeSRC: '',
    fieldUpdated: false
  }
}
