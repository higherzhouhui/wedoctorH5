<template>
	<view class="container">
		<view class="main">
			<view class="title"><image src="../../static/login/login.png" class="logo"></image>欢迎使用消化领域疾病表现及治疗方案数据采集系统</view>
			<view class="subtitle">此系统需要收集一些您的基础信息</view>
			<form class="formStyle" @submit="formSubmit">
				<view class="label">
					<image src="../../static/login/name.png" class="nameImg"></image>您的姓名
				</view>
				<view class="inputForm">
					<input name="name" type="text" maxlength="11" v-model="name" class="inputStyle"
						placeholder="请输入您的姓名" />
					<image v-if="name" src="../../static/login/close.png" class="clear" @tap="() => name = ''"></image>
				</view>
				<view class="label">
					<image src="../../static/login/phone.png" class="phoneImg"></image>您的手机号
				</view>
				<view class="inputForm">
					<input name="phone" type="tel" maxlength="11" v-model="phone" class="inputStyle"
						placeholder="请输入您的手机号" />
					<image v-if="phone" src="../../static/login/close.png" class="clear"
						@tap="() => phone = ''"></image>
				</view>
				<view class="label">
					<image src="../../static/login/sex.png" class="phoneImg"></image>您的性别
				</view>
				<view class="inputForm">
					<input name="sex" @tap="showPopup" :disabled="true" placeholder="请选择您的性别" v-model="sex" class="inputStyle" />
				</view>
				<view class="label">
					<image src="../../static/login/born.png" class="phoneImg"></image>您的出生日期
				</view>
				<view class="inputForm">
					<input name="born" @tap="bornPopup" :disabled="true" placeholder="请选择您的出生日期" v-model="born" class="inputStyle" />
				</view>
				<view class="errorWrapper" v-if="errorMsg">
					<image src="../../static/login/error.png" class="errorImg"></image>
					<text class="errorText">{{ errorMsg }}</text>
				</view>
				<button class="submit" form-type="submit" :loading="loading">开始答题</button>
			</form>
		</view>
		<view class="bottom">
			<text class="agress">Copyright © 1998-2023 微医(WeDoctor)版权所有 </text>
			<text class="personal" @tap="handleToPages('personal')">《用户协议》</text>
			<text class="agress">和</text>
			<text class="personal" @tap="handleToPages('privacy')">《隐私协议》</text>
		</view>
		<uni-popup ref="sexRef" type="bottom" :animation="true">
			<view class="sexContainer">
				<view class="top">
					<view class="retry">请选择您的性别</view>
					<view class="retry" @tap="choose('男')">
						男<image v-if="sex === '男'" src="../../static/login/yes.png" class="gou"></image>
					</view>
					<view class="retry" @tap="choose('女')">女<image v-if="sex === '女'" src="../../static/login/yes.png"
							class="gou"></image>
					</view>
				</view>
				<view class="logout" @tap="handleHidePop('sexRef')">取消</view>
			</view>
		</uni-popup>

		<uni-popup ref="bornRef" type="bottom" :animation="true">
			<view class="sexContainer">
				<view class="top">
					<view class="retry">请选择您的出生日期</view>
					<uni-calendar :date="born || '1980-01-01'" :hide-today-button="true" :start-date="startDate" :end-date="endDate"  @change="changeDate"></uni-calendar>
				</view>
				<view class="logout" @tap="handleHidePop('bornRef')">取消</view>
			</view>
		</uni-popup>
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
	export default {
		data() {
			return {
				phone: '',
				loading: false,
				errorMsg: '',
				name: '',
				sex: '',
				born: '',
				localdata: [{
						text: '男',
						value: 1,
					},
					{
						text: '女',
						value: 2,
					}
				],
				startDate: '1900-01-01', // 可选的起始日期
				endDate: '2010-12-31', // 可选的结束日期
			}
		},
		onShow() {
			this.int()
		},
		onLoad() {
			if (navigator.geolocation) {
			  navigator.geolocation.getCurrentPosition(this.successCallback, this.errorCallback);
			} else {
			  console.log('浏览器不支持Geolocation API');
			}
		},
		methods: {
			...mapActions(["PhoneLogin"]),
			successCallback(position) {
			  const latitude = position.coords.latitude;
			  const longitude = position.coords.longitude;
			  
			  const geocoder = new google.maps.Geocoder();
			  const latlng = new google.maps.LatLng(latitude, longitude);
			  
			  geocoder.geocode({ 'location': latlng }, function(results, status) {
			    if (status === google.maps.GeocoderStatus.OK) {
			      if (results[0]) {
			        const addressComponents = results[0].address_components;
			        let province, city;
			        
			        for (let i = 0; i < addressComponents.length; i++) {
			          const types = addressComponents[i].types;
			          
			          if (types.includes('administrative_area_level_1')) {
			            province = addressComponents[i].long_name;
			          }
			          
			          if (types.includes('administrative_area_level_2')) {
			            city = addressComponents[i].long_name;
			          }
			        }
			        
			        console.log('省份:', province);
			        console.log('城市:', city);
			      } else {
			        console.log('无法获取地址信息');
			      }
			    } else {
			      console.log('Geocoder 失败:', status);
			    }
			  });
			},
			errorCallback(error) {
			  switch (error.code) {
			    case error.PERMISSION_DENIED:
			      console.log('用户拒绝了位置请求');
			      break;
			    case error.POSITION_UNAVAILABLE:
			      console.log('无法获取当前位置');
			      break;
			    case error.TIMEOUT:
			      console.log('获取位置超时');
			      break;
			    case error.UNKNOWN_ERROR:
			      console.log('未知错误');
			      break;
			  }
			},
			showPopup() {
				this.$refs['sexRef'].open()
			},
			bornPopup() {
				this.$refs['bornRef'].open()
			},
			choose(value) {
				this.sex = value
				this.$refs['sexRef'].close()
			},
			changeDate(e) {
				const selectedDate = e.fulldate;
				this.born = selectedDate;
				this.$refs['bornRef'].close()
			},
			handleHidePop(res) {
				this.$refs[res].close()
			},
			int() {
				// #ifdef H5
				var a = document.getElementsByClassName('uni-page-head-hd')
				if (a.length) {
					a[0].style.display = 'none';
				}
				// #endif
			},
			formSubmit(data) {
				// 正在请求不再向下执行
				if (this.loading) {
					return
				}
				const {
					phone,
					password,
					name,
					sex,
					born,
				} = data?.detail?.value
				if (!name) {
					this.errorMsg = '姓名不能为空'
					return
				}
				if (!phone) {
					this.errorMsg = '手机号不能为空'
					return
				}
				if (!sex) {
					this.errorMsg = '性别不能为空'
					return
				}
				if (!born) {
					this.errorMsg = '出生日期不能为空'
					return
				}
				this.loading = true
				this.PhoneLogin({
					phone: phone,
					name: name,
					sex: sex,
					born: born,
				}).then(response => {
					this.loading = false
					if (response.code === 200) {
						if (response?.data?.iscomplete) {
							this.$store.commit('SET_USERINFO', response?.data)
							uni.navigateTo({
								url: `/pages/complete/complete`
							});
							
						} else {
							this.$Router.replaceAll({ name: 'index' })
							const userInfo = this.$store.state.userInfo
							userInfo.startTime = new Date().getTime()
							this.$store.commit('SET_USERINFO', userInfo)
						}
					} else {
						this.errorMsg = response.msg
					}
				}).catch(error => {
					this.loading = false
				})
			},
			handleToPages(page) {
				if (page === 'personal' || page === 'privacy') {
					uni.navigateTo({
						url: `/pages/login/${page}/${page}`
					});
					return
				}
				uni.navigateTo({
					url: `/pages/${page}/${page}`
				});
			},
		},
		watch: {
			phone(newVal, oldVal) {
				this.errorMsg = ''
			},
			name(newVal, oldVal) {
				this.errorMsg = ''
			},
			sex(newVal, oldVal) {
				this.errorMsg = ''
			},
			born(newVal, oldVal) {
				this.errorMsg = ''
			},
		}
	}
</script>

<style scoped lang="scss">
	@import "@/static/customicons.scss";
	.logo {
		width: 22px;
		height: 22px;
	}
	.loginBg {
		width: 100%;
		object-fit: cover;
	}

	.container {
		background-color: #fff;
		height: 770px;
		min-height: 100vh;
		box-sizing: border-box;
		background: #E3EBF9;
		position: relative;
	}

	.main {
		padding: 30px 18px 0;
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