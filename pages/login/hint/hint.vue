<template>
	<view class="container">
		<UserInfo></UserInfo>
		<view class="firstQuestion">
			<image src="/static/tian.png" class="tian" mode="widthFix"></image>
			<view class="title">
				{{questionInfo.title || '消化领域疾病表现及治疗方案数据问卷'}}
			</view>
			<view class="content">
				{{questionInfo.description || `为了给您提供更好的服务，希望您能抽出几分钟时间，将您的基本情况和建议告诉我们，我们非常重视每位患者的宝贵意见，期待您的参与，现在我们马上开始吧！`}}
			</view>
		</view>
		<view class="btn" @tap="handleBegin()">开始答题</view>
	</view>
</template>

<script>
	import UserInfo from '@/components/userInfo.vue'
	import { getUserStatusReq } from '@/api/user.js'
	export default {
		data() {
			return {
				questionInfo: {}
			}
		},
		components: {
			UserInfo
		},
		mounted() {
			const info = uni.getStorageSync('questionInfo')
			if (info) {
				this.questionInfo = JSON.parse(info)
			}
			this.initData()
		},
		methods: {
			initData() {
				getUserStatusReq({
					question_list_id: this.questionInfo.id
				}).then(res => {
					if (res.code == 200) {
						if (res.data.status) {
							uni.showModal({
								title: '任务完成',
								content: `${res.data.total} / ${res.data.target || 0}\n恭喜您已经完成目标收集份数！`,
								showCancel: false,
								confirmText: '我知道了'
							})
						} else {
							uni.showModal({
								title: '当前进度',
								content: `${res.data.total}/${res.data.target}`,
								showCancel: false,
								confirmText: '继续'
							})
						}
					}
				})
			},
			handleBegin() {
				this.$Router.replaceAll({ name: 'index' })
				const userInfo = this.$store.state.userInfo
				userInfo.startTime = new Date().getTime()
				this.$store.commit('SET_USERINFO', userInfo)
			}
		}
	}
</script>

<style lang="scss" scoped>
@import "@/static/customicons.scss";
.container {
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	min-height: 100vh;
	.firstQuestion {
		padding: 32px 22px;
		margin-top: -20vh;
		text-align: center;
		.tian {
			width: 128px;
		}
		.title {
			text-align: center;
			font-size: 24px;
			font-weight: bold;
			line-height: 36px;
			margin-bottom: 20px;
		}
		.content {
			margin-top: 12px;
			font-size: 16px;
			color: #333;
			line-height: 24px;
			text-align: center;
		}
	}
	.btn {
		position: fixed;
		width: 90%;
		left: 5%;
		border-radius: 12px;
		bottom: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 40px;
		background: $primaryColor;
		color: #fff;
		font-size: 16px;
	}
}
</style>
