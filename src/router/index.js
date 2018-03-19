import Vue from 'vue'
import Router from 'vue-router'
import Siteaddsite from '@/components/sitetemplate/Site-addsite'
import Sitemanage from '@/components/sitetemplate/Site-manage'
import Sitedraft from '@/components/sitetemplate/Site-draft'
import Siteselect from '@/components/sitetemplate/Site-select'
import Sitedata from '@/components/sitetemplate/Site-data'
import Siteinquiry from '@/components/sitetemplate/Site-inquiry'
import SiteinquiryDetail from '@/components/sitetemplate/Site-inquiryDetail'
import SiteinquiryStatistics from '@/components/sitetemplate/Site-inquiryStatistics'
import Siteedit from '@/components/sitetemplate/Site-edit'
import templateEdit from '@/components/sitetemplate/Site-templateEdit'
import templateManage from '@/components/sitetemplate/Site-templateManage'
// import templateList from '@/components/sitetemplate/Site-templateList'
import { sitedata } from '@/store/testData.js'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '站点管理',
      component: Sitemanage
    },
    {
      path: '/sitetemplate/site-manage',
      name: '站点管理',
      component: Sitemanage
    },
    {
      path: '/sitetemplate/site-draft',
      name: '草稿箱',
      component: Sitedraft
    },
    {
      path: '/sitetemplate/site-addsite',
      name: '添加站点',
      component: Siteaddsite
    },
    {
      path: '/sitetemplate/site-select',
      name: '选择站点模板',
      component: Siteselect
    },
    {
      path: '/sitetemplate/site-data',
      name: '网站数据',
      component: Sitedata
    },
    {
      path: '/sitetemplate/site-inquiry',
      name: '询盘列表',
      component: Siteinquiry
    },
    {
      path: '/sitetemplate/site-inquiryDetail',
      name: '询盘详情',
      component: SiteinquiryDetail
    },
    {
      path: '/sitetemplate/site-inquiryStatistics',
      name: '询盘统计',
      component: SiteinquiryStatistics
    },
    {
      path: '/sitetemplate/site-edit',
      name: '站点编辑',
      component: Siteedit
    },
    {
      path: '/sitetemplate/site-templateEdit',
      name: '模板编辑',
      component: templateEdit
    },
    {
      path: '/sitetemplate/site-templatemanage',
      name: '模板列表',
      component: templateManage
    }
  ]
})
