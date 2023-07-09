<template>
	<view class="container">

	</view>
</template>

<script>
	import {
	    getHomeBaseRequest
	} from '@/api/home.js'
	export default {
		data() {
			return {
				course: ''
			}
		},
		onLoad() {
			this.getBaseInfo()
		},
		methods: {
			getBaseInfo() {
				getHomeBaseRequest().then(res => {
					if (res.code === 200) {
						this.course = res.data.course
					} else {
						uni.showToast({
							title: res.message || res.msg,
							icon: 'none'
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.container {
	padding: 12px;
	word-break: break-all;
	
}
</style>
