import {
	baseURL
} from '@/config/index.js'
import { ACCESS_TOKEN, USER_INFO } from "@/common/util/constants"
let modelShow = false
uni.addInterceptor('request', {
	invoke(args) { //拦截前触发
		args.url = `${baseURL}${args.url}`
		args.header["Content-Type"] = "application/json;charset=UTF-8"
		//获取token
		let token = uni.getStorageSync('Access-Token')
		if (token) {
			args.header["Access-Token"] = token
		}
	},
	success(args) { //成功回调拦截
		if (!args || !args.statusCode) {
			return Promise.reject("错误的消息内容。");
		}
		//中文显示
		switch (args.statusCode) {
			case 100:
				args.message = "客户端应继续其请求";
				break;
			case 101:
				args.message = "服务器根据客户端的请求切换协议。";
				break;
			case 200:
				args.message = "请求成功。";
				break;
			case 201:
				args.message = "成功请求并创建了新的资源。";
				break;
			case 202:
				args.message = "已经接受请求，但未处理完成。";
				break;
			case 203:
				args.message = "非授权信息。";
				break;
			case 204:
				args.message = "服务器成功处理，但未返回内容。";
				break;
			case 205:
				args.message =
					"服务器处理成功，用户终端（例如：浏览器）应重置文档视图。";
				break;
			case 206:
				args.message = "服务器成功处理了部分GET请求。";
				break;
			case 300:
				args.message = "请求的资源可包括多个位置。";
				break;
			case 301:
				args.message = "请求的资源已被永久的移动到新URI。";
				break;
			case 302:
				args.message = "临时移动。";
				break;
			case 303:
				args.message = "查看其它地址。";
				break;
			case 304:
				args.message = "所请求的资源未修改。";
				break;
			case 305:
				args.message = "所请求的资源必须通过代理访问。";
				break;
			case 306:
				args.message = "已经被废弃的HTTP状态码。";
				break;
			case 307:
				args.message = "临时重定向。";
				break;
			case 400:
				args.message = "客户端请求的语法错误，服务器无法理解。";
				break;
			case 401:
				args.message = "请先登录系统。";
				//跳转到登录页面
				break;
			case 402:
				args.message = "暂未定义。";
				break;
			case 403:
				args.message = "服务器理解请求客户端的请求，但是拒绝执行此请求。";
				break;
			case 404:
				args.message = "服务器无法根据客户端的请求找到资源（网页）。";
				break;
			case 405:
				args.message = "客户端请求中的方法被禁止。";
				break;
			case 406:
				args.message = "服务器无法根据客户端请求的内容特性完成请求。";
				break;
			case 407:
				args.message = "请求要求代理的身份认证。";
				break;
			case 408:
				args.message = "服务器等待客户端发送的请求时间过长。";
				break;
			case 409:
				args.message = "服务器处理请求时发生了冲突。";
				break;
			case 410:
				args.message = "客户端请求的资源已经不存在。";
				break;
			case 411:
				args.message =
					"服务器无法处理客户端发送的不带Content-Length的请求信息。";
				break;
			case 412:
				args.message = "客户端请求信息的先决条件错误。";
				break;
			case 413:
				args.message = "由于请求的实体过大，服务器无法处理，因此拒绝请求。";
				break;
			case 414:
				args.message = "请求的URI过长（URI通常为网址），服务器无法处理。";
				break;
			case 415:
				args.message = "服务器无法处理请求附带的媒体格式。";
				break;
			case 416:
				args.message = "客户端请求的范围无效。";
				break;
			case 417:
				args.message = "服务器无法满足Expect的请求头信息。";
				break;
			case 500:
				args.message = "服务器内部错误，无法完成请求。";
				console.error(args.message)
				args.message = "系统维护中，请稍后重试";
				break;
			case 501:
				args.message = "服务器不支持请求的功能，无法完成请求。";
				console.error(args.message)
				args.message = "系统维护中，请稍后重试";
				break;
			case 502:
				args.message =
					"作为网关或者代理工作的服务器尝试执行请求时，从远程服务器接收到了一个无效的响应。";
				console.error(args.message)
				args.message = "系统维护中，请稍后重试";
				break;
			case 503:
				args.message =
					"由于超载或系统维护，服务器暂时的无法处理客户端的请求。";
				console.error(args.message)
				args.message = "系统维护中，请稍后重试";
				break;
			case 504:
				args.message = "充当网关或代理的服务器，未及时从远端服务器获取请求。";
				console.error(args.message)
				args.message = "系统维护中，请稍后重试";
				break;
			case 505:
				args.message = "服务器不支持请求的HTTP协议的版本，无法完成处理。";
				console.error(args.message)
				args.message = "系统维护中，请稍后重试";
				break;
			default:
				args.message = "状态错误(" + args.statusCode + ")";
				break;
		}
		//处理状态码
		if (args.statusCode !== 200 && args.statusCode !== 404) {
			uni.showToast({
				title: args.message,
				icon: 'none'
			})
			return Promise.reject(args.message);
		}
		//处理消息码
		if (args.data && args.data.code !== 200) {
			if (args.data.code === 401 || args.data.code === 998) {
				if (!modelShow) {
					modelShow = true
					uni.showModal({
						title: "提示",
						content: args.data.message || args.data.msg,
						showCancel: false,
						complete() {
							modelShow = false
							uni.removeStorageSync(ACCESS_TOKEN)
							uni.removeStorageSync(USER_INFO)
							uni.navigateTo({
								url: '/pages/login/login'
							})
						}
					})
				}
			}
			return Promise.resolve(args.data);
		}
		//返回消息 
		return Promise.resolve(args.data)
	},
	fail() { //失败回调拦截
	    if (!modelShow) {
			modelShow = true
			uni.showModal({
				title: "提示",
				content: "无法发起请求, 请检查网络",
				showCancel: false,
				complete() {
					modelShow = false
				}
			})
		}
	},
})

function request(url, method, params = {}) {
	const promise = new Promise((resolve, reject) => {
		uni.request({
			url: url,
			method: method,
			data: params,
			header: {}, //必须的，用于拦截请求
			success: (res) => {
				//上面已经对错误进行了处理，直接返回的就是data
				resolve(res);
			},
			fail: (err) => {
				reject(err)
			}
		});
	});
	return Promise.resolve(promise);
}

export {
	request
}