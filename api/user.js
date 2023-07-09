import { request } from '@/utils/request.js' 
export function loginRequest(params) {
	return request('/account/result/login', 'POST', params)	
}
export function getCodeRequest(params) {
	return request('/account/result/getCode', 'POST', params)	
}
export function getQuestionList(params) {
	return request('/account/question/list', 'GET', params)	
}

export function resultCreate(params) {
	return request('/account/result/create', 'POST', params)	
}

export function getQudaoInfo(params) {
	return request('/admin/qudao/getInfo', 'GET', params)	
}

