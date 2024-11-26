<template>
	<view class="record-content">
		<UserInfo></UserInfo>
		<view class="img-wrapper"><image src="../../static/record.png" mode="heightFix" class="record-img"></image></view>
		<view class="user">
			<view class="left">签约手机号：<b>{{this.$store.state.userInfo.phone}}</b></view>
			<view class="right">姓名：<b>{{this.$store.state.userInfo.name}}</b></view>
		</view>
		<view class="table">
			<view class="header table-list">
				<view class="header-item header-big">问卷名称</view>
				<view class="header-item header-big">截止</view>
				<view class="header-item">目标</view>
				<view class="header-item">已收集</view>
				<!-- <view class="header-item">待完成</view> -->
			</view>
			<view class="table-list" v-for="(item,index) in list" :key="index">
				<view class="header-item header-big">{{item.title}}</view>
				<view class="header-item header-big">{{item.endTime}}</view>
				<view class="header-item">{{item.total}}</view>
				<view class="header-item" style="color: green;">{{item.complete}}</view>
				<!-- <view class="header-item">待完成</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import moment from 'moment/moment';
	import UserInfo from '@/components/userInfo.vue'
	import { getRecordReq } from '@/api/user.js'
	export default {
		data() {
			return {
				list: [],
			};
		},
		components: {
			UserInfo
		},
		onLoad() {
			this.initData()
		},
		methods: {
			async initData() {
				uni.showLoading()
				const res = await getRecordReq()
				uni.hideLoading()
				if (res.code == 200) {
					res.data.map((item) =>{
						item.endTime = item.endTime ? moment(item.endTime).format('YYYY-MM-DD') : '-'
					})
					this.list = res.data
				}
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
		.table {
			background: rgba(0, 0, 0, 0.1);
			border-radius: 8px;
			min-height: calc(100vh - 200px);
			padding: 8px 4px;
			overflow: auto;
		}
		.table-list {
			display: flex;
			width: 100%;
			margin-bottom: 8px;
			color: #222;
			font-size: 12px;
			border-bottom: 1px solid #aaa;
			padding-bottom: 3px;
			.header-item {
				text-align: center;
				flex: 1;
			}
			.header-big {
				flex: 1.5;
				max-height: 44px;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
		.header {
			font-weight: bold;
			font-size: 13px;
			border-bottom: 1px solid;
			color: #000;
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
