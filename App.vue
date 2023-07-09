<script>
	import appUpdate from '@/common/util/appUpdate.js'
	export default {
		onLaunch: function() {
			// #ifdef APP-PLUS
			// 检测升级
			appUpdate()
			// #endif
		},
		onShow: function() {
			// rem()
		},
		onHide: function() {
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	// 设置整个项目的背景色
	page {
		background-color: #f5f5f5;
	}
	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}
</style>
