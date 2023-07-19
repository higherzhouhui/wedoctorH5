<template>
	<view class="container">
		<view class="main">
			<!-- <view class="logotitle"><image src="../../static/login/top.png" class="logo"></image></view> -->
			<view class="title">欢迎来到消化领域疾病患者临床治疗情况数据收集表</view>
			<view class="subtitle">此收集表需要登录后填答</view>
			<form class="formStyle" @submit="formSubmit">
				
				<view class="label">
					<image src="../../static/login/phone.png" class="phoneImg"></image>请输入您的手机号
				</view>
				<view class="inputForm">
					<input name="phone" type="tel" maxlength="11" v-model="phone" class="inputStyle"
						placeholder="请输入手机号" />
					<image v-if="phone" src="../../static/login/close.png" class="clear"
						@tap="() => phone = ''"></image>
				</view>
				<view class="label">
					<image src="../../static/login/yzm.png" class="phoneImg"></image>请输入验证码
				</view>
				<view class="inputForm">
					<input name="code" type="tel" maxlength="6" v-model="code" class="inputStyle"
						placeholder="请输入验证码" />
					<image v-if="code" src="../../static/login/close.png" class="clear"
						@tap="() => code = ''"></image>
					<view :class="downTime ? 'getCode downTime' : 'getCode'" @tap="getCode">
						{{downTime ? `${downTime}秒后重发` : '获取验证码'}}
					</view>
				</view>
				<view class="errorWrapper" v-if="errorMsg">
					<image src="../../static/login/error.png" class="errorImg"></image>
					<text class="errorText">{{ errorMsg }}</text>
				</view>
	
				<button class="submit" form-type="submit" :loading="loading">登录</button>
			</form>
		</view>
		<view class="bottom">
			<text class="agress">Copyright © 2010-2023 版权所有</text>
			<a href="https://beian.miit.gov.cn/" target="_blank">渝ICP备2023007595号-1</a>
			<text class="personal" @tap="handleToPages('personal')">《用户协议》</text>
			<text class="agress">和</text>
			<text class="personal" @tap="handleToPages('privacy')">《隐私协议》</text>
		</view>
	</view>
</template>

<script>
	import {
		mapActions
	} from "vuex"
	import {
		ACCESS_TOKEN,
		USER_INFO
	} from "@/common/util/constants"
	import {
		getCodeRequest,
		getQudaoInfo,
	} from "@/api/user"
	export default {
		data() {
			return {
				phone: '',
				loading: false,
				errorMsg: '',
				code: '',
				downTime: 0,
				timer: '',
				qudao: '',
			}
		},
		onShow() {
			this.int()
		},
		onLoad() {
			getQudaoInfo().then(res =>{
				if (res.code === 200) {
					if (res.data && res.data.name) {
						this.qudao = res.data.name
					}
				}
			})
		},
		onUnload() {
			clearInterval(this.timer)
		},
		methods: {
			...mapActions(["PhoneLogin"]),
			int() {
				// #ifdef H5
				var a = document.getElementsByClassName('uni-page-head-hd')
				if (a.length) {
					a[0].style.display = 'none';
				}
				// #endif
			},
			getCode() {
				if (this.downTime) {
					return
				}
				if (!this.phone) {
					this.errorMsg = '手机号不能为空'
					return
				}
				
				if(this.phone.length !== 11) {
					this.errorMsg = '请输入正确的手机号'
					return
				}
				uni.showLoading({
					title: '正在发送中...',
				})
				getCodeRequest({phone: this.phone}).then((res) => {
					uni.hideLoading()
					if (res.code === 200) {
						uni.showToast({
							title: '发送成功!',
						})
						this.downTime = 60
						this.timer = setInterval(() => {
							this.downTime -= 1
							if (this.downTime === 0) {
								clearInterval(this.timer)
							}
						}, 1000)
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				})	
			},
			formSubmit(data) {
				// 正在请求不再向下执行
				if (this.loading) {
					return
				}
				const {
					phone,
					code
				} = data?.detail?.value
			
				if (!phone) {
					this.errorMsg = '手机号不能为空'
					return
				}
				
				if(phone.length !== 11) {
					this.errorMsg = '请输入正确的手机号'
					return
				}
				if (!code) {
					this.errorMsg = '验证码不能为空'
					return
				}
				this.loading = true
				this.PhoneLogin({
					phone: phone,
					code: code,
					qudao: this.qudao,
				}).then(response => {
					this.loading = false
					if (response.code === 200) {
						uni.showToast({
							title: '登录成功'
						})
						if (response?.data?.iscomplete == 1) {
							uni.navigateTo({
								url: `/pages/complete/complete`
							});
						} else {
							this.handleToPages('hint')
							// this.$Router.replaceAll({ name: 'index' })
							// const userInfo = this.$store.state.userInfo
							// userInfo.startTime = new Date().getTime()
							// this.$store.commit('SET_USERINFO', userInfo)
						}
					} else {
						this.errorMsg = response.msg
					}
				}).catch(error => {
					this.loading = false
				})
			},
			handleToPages(page) {
				uni.navigateTo({
					url: `/pages/login/${page}/${page}`
				});
			},
		},
		watch: {
			phone(newVal, oldVal) {
				this.errorMsg = ''
			},
			code(newVal, oldVal) {
				this.errorMsg = ''
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "@/static/customicons.scss";
	.logotitle {
		margin: 50px 0 30px 0;
		font-size: 22px;
		font-weight: bold;
		display: flex;
		align-items: center;
		justify-content: center;
		.logo {
			width: 121px;
			height: 75px;
		}
	}
	
	.loginBg {
		width: 100%;
		object-fit: cover;
	}

	.container {
		background-color: #fff;
		height: 750px;
		min-height: 100vh;
		box-sizing: border-box;
		background: #E3EBF9;
		position: relative;
	}

	.main {
		padding: 80px 18px 0;
		position: relative;
		z-index: 9;
	}

	.label {
		display: flex;
		align-items: center;
		margin: 25px 0 17px 0;
	}

	.label:first-child {
		margin-top: 0;
	}

	.title {
		font-size: 28px;
		line-height: 42px;
		font-family: PingFang SC-Heavy, PingFang SC;
		font-weight: 600;
		margin-bottom: 50px;
		text-align: center;
		white-space: none;
	}

	.subtitle {
		font-size: 20px;
		line-height: 28px;
		font-weight: bold;
		margin-bottom: 40px;
		text-align: center;
	}

	.nameImg {
		width: 20px;
		height: 20px;
		margin-right: 5px;
	}

	.phoneImg {
		width: 22px;
		height: 22px;
		margin-right: 4px;
	}

	.inputForm {
		position: relative;
		.clear {
			width: 20px;
			height: 20px;
			position: absolute;
			right: 0;
			top: 0;
		}
		.getCode {
			position: absolute;
			right: 30px;
			top: 0;
			color: $primaryColor;
		}
		.downTime {
			color: #999;
		}
	}

	.inputStyle {
		border-bottom: 1px solid #a19898;
		font-size: 15px;
		line-height: 21px;
		padding-bottom: 7px;
		color: #000;
	
		&::placeholder {
			font-size: 15px;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400 !important;
			color: #C5C6C7;
			line-height: 21px;
		}
	}

	.errorWrapper {
		height: 34px;
		background: #FFEBEB;
		border-radius: 4px 4px 4px 4px;
		display: flex;
		align-items: center;
		opacity: 1;
		margin-top: 8px;
		animation: doudong 1.5s .15s linear forwards;

		.errorImg {
			width: 22px;
			height: 22px;
			margin-right: 4px;
		}

		.errorText {
			font-size: 13px;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #FF4B4B;
			line-height: 17px;
		}
	}

	.forget {
		font-size: 13px;
		font-family: PingFang SC-Regular, PingFang SC;
		font-weight: 400;
		color: #4F5459;
		line-height: 17px;
		margin-top: 8px;
		width: 100%;
		text-align: right;
	}

	.submit {
		width: 300px;
		height: 40px;
		background: $primaryColor;
		border-radius: 22px;
		margin: 32px auto 0 auto;
		font-size: 15px;
		font-family: PingFang SC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		text-align: center;
		line-height: 40px;
	}

	.nophone {
		margin-top: 26px;
		text-align: center;
		font-size: 15px;
		font-family: PingFang SC-Medium, PingFang SC;
		font-weight: 600;
		color: #17191A;

		.link {
			color: #17191A;
			text-decoration: underline;
		}
	}

	.bottom {
		position: absolute;
		bottom: 30px;
		text-align: center;
		padding: 0 20px;
		.agress {
			font-size: 13px;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #333333;
			line-height: 17px;
		}

		.personal {
			height: 19px;
			font-size: 13px;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: $primaryColor;
			line-height: 17px;
		}
	}

	.sexContainer {
		padding: 6px;
		.top {
			background: #fff;
			border-radius: 12px;
			.retry {
				border-bottom: 1px solid #b5b5b5;
				height: 50px;
				text-align: center;
				line-height: 50px;
				color: $primaryColor;
				font-size: 17px;
				position: relative;
				.gou {
					position: absolute;
					right: 12px;
					top: 50%;
					transform: translate(0, -50%);
					width: 18px;
					height: 18px;
				}
			}
			.retry:first-child {
				color: #999;
			}
			.retry:last-child {
				border: none;
			}
		}
		.logout {
			margin-top: 8px;
			border-radius: 12px;
			height: 50px;
			text-align: center;
			line-height: 50px;
			color: #aa0000;
			font-size: 17px;
			background: #fff;
		}
	}
</style>