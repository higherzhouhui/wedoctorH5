<template>
	<view>
		<view class="avatar" @tap="handleShowPop">
			<image class="theavatar" src="../static/complete/avatar.png"></image>
		</view>
		<uni-popup ref="operationRef" :animation="true" type="bottom">
			<view class="lcontent">
				<view class="top">
					<view class="retry">{{this.$store.state.userInfo.phone}}({{this.$store.state.userInfo.name}})</view>
					<view class="retry again" @tap="handleRetry">填写新问卷</view>
					<view class="retry quit" @tap="handleToRecord">我的填写记录</view>
					<view class="retry" @tap="routeToIndex">查看问卷选项</view>
				</view>
				<view class="logout" @tap="handleLogout">退出登录</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		mapActions
	} from 'vuex'
	export default {
		name: "userInfo",
		data() {
			return {

			};
		},
		methods: {
			...mapActions(["Logout"]),
			handleToRecord() {
				uni.navigateTo({
					url: '/pages/record/record'
				})
			},
			routeToIndex() {
				// uni.navigateTo({
				// 	url: '/pages/index/index?review=1'
				// })
				this.$store.commit('SET_USERINFO', {
					...this.$store.state.userInfo,
					is_complete: false,
					over_view: true,
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
	.avatar {
		position: fixed;
		right: 2rem;
		top: 3rem;

		.theavatar {
			border: 2px solid #fff;
			width: 40px;
			height: 40px;
			border-radius: 50%;
		}
	}

	.lcontent {
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
				font-size: 17px
			}

			.retry:first-child {
				color: #666;
				font-weight: bold;
			}

			.retry:last-child {
				border: none;
			}

			.quit {
				color: #AA6666;
			}

			.again {
				color: #17eb3c;
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