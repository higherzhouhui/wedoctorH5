<template>
	<view class="container">
		<view class="avatar" @tap="handleShowPop">
			<image class="theavatar" src="../../static/complete/avatar.png"></image>
		</view>
		<view class="content">
			<view class="wfile">
				<image src="../../static/complete/file.png" mode="widthFix" class="file"></image>
				<image src="../../static/complete/done.png" mode="widthFix" class="done"></image>
			</view>
			<view class="anser">您已回答过问卷</view>
			<view class="btn" @tap="routeToIndex">继续查看问卷</view>
		</view>
		<uni-popup ref="operationRef" :animation="true" type="bottom">
			<view class="lcontent">
				<view class="top">
					<view class="retry">{{this.$store.state.userInfo.phone}}(我的手机)</view>
					<view class="retry" @tap="handleRetry">重新回答</view>
					<view class="retry" @tap="routeToIndex">继续查看</view>
					<view class="retry" @tap="handleLogout">退出登录</view>
				</view>
				<view class="logout" @tap="handleCancel">取消</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		mapActions
	} from 'vuex'
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			...mapActions(["Logout"]),
			routeToIndex() {
				// uni.navigateTo({
				// 	url: '/pages/index/index?review=1'
				// })
				this.$Router.replaceAll({ name: 'index' })
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
				userInfo.iscomplete = 0
				userInfo.startTime = new Date().getTime()
				this.$store.commit('SET_USERINFO', userInfo)
				this.$Router.replaceAll({ name: 'index' })
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

<style lang="scss">
@import "@/static/customicons.scss";
.container {
	min-height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	.avatar {
		position: fixed;
		right: 10px;
		top: 10px;
		.theavatar {
			border: 2px solid #fff;
			width: 40px;
			height: 40px;
			border-radius: 50%;
		}
	}
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
		padding: 0 40px;
		background: $primaryColor;
		margin-top: 36px;
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
}
</style>
