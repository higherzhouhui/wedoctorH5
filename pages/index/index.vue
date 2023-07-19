<template>
	<view class="root">
		<view class="container">
			<view class="progress">
				<view class="zhanbi" :style="{width: (index + 1) / total * 100 + '%'}" />
			</view>
			<view v-show="review * 1" class="review">
				<image src="../../static/warn.png" class="warnIcon"></image>
				您已经回答过该问卷
			</view>

			<newProduct :product="{...questionList[index], index: index + 1, total, review: review * 1, diff: diff}"
				@nextClick="nextClick" @preClick="preClick" />

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
	import newProduct from '@/components/newProduct.vue'
	import {
		getQuestionList
	} from '@/api/user'
	export default {
		data() {
			return {
				index: 0,
				questionList: [],
				total: 0,
				retry: 0,
				review: 0,
				diff: 0,
			}
		},
		components: {
			newProduct,
		},
		onLoad(options) {
			this.review = options.review || this.$store.state.userInfo.iscomplete == 1 || 0
			this.getHomeData()
		},

		methods: {
			getHomeData() {
				this.retry += 1;
				getQuestionList().then(res => {
					if (res.code === 200) {
						this.questionList = res.data.list
						this.total = res.data.totalSize
					} else {
						if (this.retry < 5) {
							this.getHomeData()
						} else {
							uni.showToast({
								title: '服务器正在维护中，请稍后重试!',
								icon: 'none'
							})
						}
					}
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
			
			skipRelate(currentIndex) {
				const nextIndex = currentIndex + 1
				const { relateId, id } = this.questionList[nextIndex]
				if (relateId) {
					const qsid = relateId.split('||')[0]
					const option = relateId.split('||')[1]
					const userInfo = this.$store.state.userInfo
					const qsArray = userInfo.qs.split('||')
					const chooseArray = userInfo.choose.split('||')
					const index = qsArray.indexOf(qsid)
					if (qsArray.indexOf(qsid) !== -1 && chooseArray[index].includes(option)) {
						this.index = nextIndex
					} else {
						this.skipRelate(nextIndex)
						if (!qsArray.includes(id + '')) {
							userInfo.qs += '||' + id
							userInfo.choose += '||' + ''
							this.$store.commit('SET_USERINFO', userInfo)
						} else {
							const qindex = qsArray.indexOf(id + '')
							chooseArray[qindex] = ''
							userInfo.choose = chooseArray.join('||')
							this.$store.commit('SET_USERINFO', userInfo)
						}
						this.diff += 1
					}
				} else {
					this.index = nextIndex
				}
			},
			
			nextClick() {
				this.diff = 0
				if (this.index < this.total - 1) {
					this.skipRelate(this.index)
					const userInfo = this.$store.state.userInfo
					const chooseArray = userInfo.choose.split('||')
					const emptyList = chooseArray.slice(0, this.index).filter(item => !item)
					this.diff = emptyList.length
				}
			},
			backSkipRelate(currentIndex) {
				const preIndex = currentIndex - 1
				const userInfo = this.$store.state.userInfo
				const chooseArray = userInfo.choose.split('||')
				const qsArray = userInfo.qs.split('||')
				if (chooseArray[preIndex]) {
					this.index = preIndex
				} else {
					chooseArray.pop()
					qsArray.pop()
					userInfo.qs = qsArray.join('||')
					userInfo.choose = chooseArray.join('||')
					this.$store.commit('SET_USERINFO', userInfo)
					this.backSkipRelate((preIndex))
				}
			},
			preClick() {
				this.diff = 0
				// 根据空内容反向递归找回，同时删除记录
				if (this.index !== 0) {
					this.backSkipRelate(this.index)
					const userInfo = this.$store.state.userInfo
					const chooseArray = userInfo.choose.split('||')
					const emptyList = chooseArray.slice(0, this.index).filter(item => !item)
					this.diff = emptyList.length
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import "@/static/customicons.scss";
	.root {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.container {
		position: relative;
		flex: 1;

		.progress {
			width: calc(100vw - 24px);
			margin-left: 12px;
			height: 3px;
			background: #fff;
			position: relative;

			.zhanbi {
				position: absolute;
				left: 0;
				height: 100%;
				top: 0;
				width: 0%;
				background: $primaryColor;
				transition: width 1s;
			}
		}

		.review {
			background: rgba(218, 35, 25, 1);
			display: flex;
			align-items: center;
			height: 32px;
			font-size: 13px;
			color: #fff;
			padding: 0 12px;
			margin-top: 4px;

			.warnIcon {
				width: 18px;
				height: 18px;
				margin-right: 4px;
			}
		}

		.firstQuestion {
			padding: 24px;

			.title {
				text-align: center;
				font-size: 18px;
				font-weight: bold;
				line-height: 26px;
			}

			.content {
				margin-top: 12px;
				font-size: 15px;
				color: #333;
				line-height: 21px;
				text-align: center;
			}
		}
	}
	.bottom {
		text-align: center;
		padding: 30px 20px;
	
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
</style>