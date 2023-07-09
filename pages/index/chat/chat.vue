<template>
	<view class="container">
		<view class="content">
			<image class="avatartImg" :src="groupPhoto"></image>
			<view class="title" @longtap="copyClip(groupName)">{{groupName}}</view>
			<view class="code" @longtap="copyClip(groupNum)">{{groupNum}}</view>
			<image class="qrdImg" :src="officialGroup" @longtap="downloadImage"></image>
			<view class="joinText">扫一扫二维码加入群聊</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				groupPhoto: '',
				groupName: '',
				groupNum: '',
				officialGroup: ''
			}
		},
		onLoad(options) {
			// 获取相关信息
			const {
				groupPhoto,
				groupName,
				groupNum,
				officialGroup
			} = options
			this.groupPhoto = groupPhoto
			this.groupName = groupName
			this.groupNum = groupNum
			this.officialGroup = officialGroup
		},
		methods: {
			downloadImage(event) {
				// #ifdef APP-PLUS
				// 长按下载
				uni.downloadFile({
					url: this.officialGroup,
					success: (res) => {
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: () => {
								uni.showToast({
									title: '保存成功'
								});
							},
							fail: () => {
								uni.showToast({
									icon: 'none',
									title: '保存失败'
								});
							},
						});
					},
					fail: () => {
						uni.showToast({
							icon: 'none',
							title: '下载失败'
						});
					},
				});
				// #endif
			},
			copyClip(data) {
				uni.setClipboardData({
					data: data
				});
			},
		}
	}
</script>

<style scoped lang="scss">
	.container {
		min-height: 100vh;
		padding: 24px 12px;

		// background: #FE1E27;
		.content {
			border-radius: 12px 12px 12px 12px;
			background: #fff;
			padding: 40px 0px;
			display: flex;
			flex-direction: column;
			align-items: center;

			.avatartImg {
				width: 60px;
				height: 60px;
				border-radius: 50%;
				overflow: hidden;
				margin-bottom: 16px;
				display: block;
			}

			.title {
				font-size: 20px;
				font-family: PingFang SC-Medium, PingFang SC;
				font-weight: 600;
				color: #17191A;
				margin-bottom: 8px;
			}

			.code {
				font-size: 15px;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #4F5459;
				margin-bottom: 20px;
			}

			.qrdImg {
				width: 270px;
				height: 270px;
				display: block;
				margin-bottom: 28px;
			}

			.joinText {
				font-size: 15px;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #4F5459;
			}
		}
	}
</style>