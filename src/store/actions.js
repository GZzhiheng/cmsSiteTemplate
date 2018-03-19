import * as types from './mutation-types'

export default {
	/** ====权限获取==== **/
	Root_jurisdiction (context, params){
		context.commit('SITE_JURISDICTION', params)
		console.log('jursidiction action')
	}
}
