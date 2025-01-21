<template>
	<view class="container">
		<UserInfo></UserInfo>
		<view class="content">
			<view class="wfile">
				<image src="../../static/complete/file.png" mode="widthFix" class="file"></image>
				<image src="../../static/complete/done.png" mode="widthFix" class="done"></image>
			</view>
			<view class="anser">您已完成该问卷</view>
			<!-- <view class="btn btn-new" @tap="routeToIndex">继续查看问卷</view> -->
			<view class="btn" @tap="handleRetry">填写新问卷</view>
		</view>
	</view>
</template>

<script>
	import {
		mapActions
	} from 'vuex'
	import UserInfo from '@/components/userInfo.vue'

	export default {
		data() {
			return {

			};
		},
		components: {
			UserInfo
		},
		methods: {
			...mapActions(["Logout"]),
			routeToIndex() {
				this.$store.commit('SET_USERINFO', {
					...this.$store.state.userInfo,
					is_complete: false,
					over_view: true
				})
				this.$Router.replaceAll({
					name: 'index'
				})
			},
			handleShowPop() {
				this.$refs['operationRef'].open()
			},
			handleCancel() {
				this.$refs['operationRef'].close()
			},
			handleRetry() {
				const userInfo = this.$store.state.userInfo
				userInfo.qs = ''
				userInfo.choose = ''
				userInfo.is_complete = false
				userInfo.over_view = false
				userInfo.startTime = new Date().getTime()
				this.$store.commit('SET_USERINFO', userInfo)
				this.$Router.replaceAll({
					name: 'index'
				})
			},
			handleLogout() {
				this.Logout().then(() => {
					uni.navigateTo({
						url: '/pages/login/login'
					})
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import "@/static/customicons.scss";

	.container {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;

		.content {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
		}

		.wfile {
			position: relative;
			width: 90px;
			height: 90px;
		}

		.file {
			width: 90px;
			height: 90px;
		}

		.done {
			width: 30px;
			height: 30px;
			position: absolute;
			bottom: 0;
			right: -10px;
			animation: identifier infinite 2s;
		}

		.anser {
			margin-top: 26px;
			font-size: 18px;
			font-weight: bold;
		}

		.btn {
			height: 42px;
			line-height: 42px;
			text-align: center;
			color: #fff;
			font-size: 18px;
			border-radius: 12px;
			background: $primaryColor;
			margin-top: 36px;
			width: 160px;
		}

		.btn-new {
			background: #fff;
			color: $primaryColor;
		}

		@keyframes identifier {
			0% {
				right: -10px;
			}

			50% {
				right: 0;
			}

			100% {
				right: -10px;
			}
		}
	}
</style>