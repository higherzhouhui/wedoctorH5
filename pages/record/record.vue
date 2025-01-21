<template>
	<view class="record-content">
		<UserInfo :hideText="true"></UserInfo>
		<view class="img-wrapper">
			<image src="../../static/record.png" mode="heightFix" class="record-img"></image>
		</view>
		<view class="user">
			<view class="left">签约手机号：<b>{{this.$store.state.userInfo.phone}}</b></view>
			<view class="right">姓名：<b>{{this.$store.state.userInfo.name}}</b></view>
		</view>
		<view v-for="item in list" :key="item.id" class="list">
			<view class="share" @click="share">
				分享
				<image src="../../static/complete/share.png" mode="widthFix" class="share-img"></image>
			</view>
			<view class="title">{{item.title}}</view>
			<view class="sub-title">{{item.description}}</view>
			<view>
				<text class="ysj">已收集{{item.total}}</text>
				<span class="divider">/</span>
				<text class="target">目标{{item.target || 0}}</text>
			</view>
			<view class="time">项目截止日期{{item.endTime}}&nbsp;&nbsp;{{item.left}}</view>
		</view>
	</view>
</template>

<script>
	import moment from 'moment/moment';
	import UserInfo from '@/components/userInfo.vue'
	import {
		getRecordReq
	} from '@/api/user.js'
	export default {
		data() {
			return {
				list: [],
				questionInfo: {}
			};
		},
		components: {
			UserInfo
		},
		onLoad() {
			this.initData()
		},
		methods: {
			share() {
				  const textToCopy = `${location.origin}?phone=${this.$store.state.userInfo.phone}&name=${this.$store.state.userInfo.name}`
				  const textArea = document.createElement("textarea");
				  textArea.value = textToCopy;
				  document.body.appendChild(textArea);
				  textArea.select();
				  document.execCommand("copy");
				  document.body.removeChild(textArea);
				  uni.showToast({
				  	title: '√ 已复制到粘贴板',
					icon: 'none'
				  })
			},
			async initData() {
				uni.showLoading()
				const res = await getRecordReq()
				uni.hideLoading()
				if (res.code == 200) {
					res.data.map((item) => {
						if (item.endTime) {
							const diff = new Date(item.endTime).getTime() - new Date().getTime()
							if (diff > 0) {
								item.left = this.convertTimestamp(diff)
							} else {
								item.left = '已截止'
							}
						}
						item.endTime = item.endTime ? moment(item.endTime).format('YYYY-MM-DD') : '-'
					})
					this.list = res.data
				}
			},
			convertTimestamp(timestamp) {
				// 计算总天数、小时、分钟和秒
				const totalSeconds = Math.floor(timestamp / 1000);
				const days = Math.floor(totalSeconds / (24 * 3600));
				const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
				const minutes = Math.floor((totalSeconds % 3600) / 60);
				const seconds = totalSeconds % 60;

				let str = ''
				if (days) {
					str += `${days}天`
				}
				if (hours) {
					str += `${hours}时`
				}
				if (minutes) {
					str += `${minutes}分`
				}
				return `剩余:${str}`
			}
		}
	}
</script>

<style lang="scss" scoped>
	.record-content {
		padding: 0 12px 12px 8px;

		.user {
			display: flex;
			justify-content: space-between;
			margin-bottom: 6px;
		}
		.share {
			display: flex;
			align-items: center;
			justify-content: flex-end;
			gap: 4px;
			.share-img {
				width: 18px;
			}
		}
		.list {
			background: #eee;
			border-radius: 12px;
			padding: 12px;
			margin-bottom: 12px;
			.title {
				color: blueviolet;
				font-size: 15px;
			}

			.sub-title {
				opacity: 0.8;
				font-size: 12px;
			}

			.ysj {
				color: red;
			}

			.divider {
				margin: 0 6px;
			}

			.target {
				color: green;
			}

			.time {
				opacity: 0.8;
				font-size: 12px;
			}
		}
	}

	.img-wrapper {
		text-align: center;
		margin: 2rem 0;
	}

	.record-img {
		height: 60px;
		object-fit: contain;
	}
</style>