import { request } from '@/utils/request.js' 
export function loginRequest(params) {
	return request('/user/login', 'POST', params)	
}
export function getCodeRequest(params) {
	return request('/user/getCode', 'POST', params)	
}
export function getQuestionList(params) {
	return request('/user/getQuestionList', 'GET', params)	
}
getQuestionList
export function resultCreate(params) {
	return request('/user/createResult', 'POST', params)	
}

export function getSysInfo(params) {
	return request('/user/getInfo', 'GET', params)	
}

export function getRecordReq(params) {
	return request('/user/getRecord', 'GET', params)	
}

