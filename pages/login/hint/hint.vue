<template>
	<view class="container">
		<view class="firstQuestion">
			<view class="title">
				消化领域疾病表现及治疗方案数据问卷
			</view>
			<view class="content">
				为了给您提供更好的服务，希望您能抽出几分钟时间，将您的基本情况和建议告诉我们，我们非常重视每位患者的宝贵意见，期待您的参与，现在我们马上开始吧！
			</view>
		</view>
		<view class="btn" @tap="handleBegin()">开始答题</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
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
		margin-top: -50px;
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
		bottom: 10px;
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
