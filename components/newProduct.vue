<template>
	<view>
		<view class="product">
			<view class="title">
				<view class="fenlei">{{product.fenlei}}</view>
				<text class="must">*</text>
				<text class="xh">{{numberToSort(product.index - product.diff)}}</text>
				<text class="qs">{{product.qs}}({{product.type == 'single' ? '单选' : '多选'}})</text>
				<view v-show="errorFlag" class="error">这道题未回答</view>
			</view>
			<view class="options">
				<view class="list" v-for="(item, index) in list" :class="item.isSelect ? 'selected' : ''" @tap="chooseList(item)" :key="item.title">
					{{listStyle[index]}}.{{item.title}}
				</view>
			</view>
		</view>
		<view class="nextStep preStep" @tap="handlePre" v-if="product.index !== 1">上一题</view>
		<view class="nextStep" @tap="handleNext">{{product.index === product.total ? '提交问卷' : '下一题'}}</view>
	</view>
</template>

<script>
	import { resultCreate } from '@/api/user.js'
	export default {
		name:"newProduct",
		props:{
			product: {
				type: Object,
				default: {},
			},
		},
		data() {
			return {
				list: [],
				errorFlag: false,
				listStyle: ['A','B','C','D','E','F','G','H','I','J']
			};
		},
		methods: {
			numberToSort(index) {
				let str = index
				if (index < 10) {
					str = String(0) + String(index)
				}
				return str
			},
			getList(newVal) {
				let chooses = []
				try {
					console.log(this.$store.state.userInfo)
					if (this.$store.state.userInfo.choose) {
						const chooseArray = this.$store.state.userInfo.choose.split('||')
						const currentQs = chooseArray[this.product.index - 1] ||''
						chooses = currentQs.split(',')
					}
				} catch(error) {
					console.log(error)
				}
				
				this.list = []
				this.product.options.split('||').forEach((item, index) => {
					this.list.push({
						title: item,
						isSelect: chooses.includes(String(index)),
						index: index,
					})
				})
			},
			chooseList(item) {
				this.list.map(citem => {
					this.errorFlag = false
					if (this.product.type === 'single') {
						citem.isSelect = false
					}
					if (citem.title === item.title) {
						if (this.product.type === 'single') {
							citem.isSelect = true
						} else if (this.product.type === 'multiple'){
							citem.isSelect = !citem.isSelect
						}
					}
				})
			},
			handleNext() {
				const userInfo = this.$store.state.userInfo
				let cchoose = ''
				this.list.forEach((item, index) => {
					if (item.isSelect) {
						cchoose += item.index + ','
					}
				})
				if (!cchoose) {
					this.errorFlag = true
					return
				}
				// 截取最后一个逗号
				cchoose = cchoose.substring(0, cchoose.length - 1)
				let chooseArray = []
				let qsArray = []
				if (this.$store.state.userInfo.choose) {
					chooseArray = this.$store.state.userInfo.choose.split('||')
					chooseArray[this.product.index - 1] = cchoose
					qsArray = this.$store.state.userInfo.qs.split('||')
					qsArray[this.product.index - 1] = this.product.id
				} else {
					chooseArray[0] = cchoose
					qsArray[0] = this.product.id
				}
				userInfo.choose = chooseArray.join('||')
				userInfo.qs = qsArray.join('||')
				// 渠道和位置随机生成
				userInfo.endTime = new Date().getTime()
				this.$store.commit('SET_USERINFO', userInfo)
				this.$emit('nextClick')
				if (this.product.index === this.product.total) {
					// 提交
					userInfo.iscomplete = 1
					uni.showLoading({
						title: '提交中...',
						icon: 'none'
					})
					resultCreate(userInfo).then(res => {
						uni.hideLoading()
						if (res.code === 200) {
							uni.showToast({
								title: '提交成功！',
								icon: 'none',
							})
							uni.navigateTo({
								url: '/pages/complete/complete',
							})
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none',
							})
						}
					})
				}
			},
			handlePre() {
				this.$emit('preClick')
			}
		},
		watch: {
			product(newVal, oldVal) {
				this.getList(newVal)
				this.errorFlag = false
			},
		}
	}
</script>

<style scoped lang="scss">
@import "@/static/customicons.scss";
.product {
	background: #fff;
	padding: 20px 12px 0 12px;
	margin-bottom: 30px;
	.title {
		font-size: 18px;
		font-weight: bold;
		line-height: 32px;
		word-break: break-all;
		margin-bottom: 12px;
		.must {
			color: #ff0a0e;
		}
		.xh {
			margin-right: 4px;
		}
		.error {
			background: #FFEBEB;
			border-radius: 4px;
			display: flex;
			align-items: center;
			opacity: 1;
			margin-top: 4px;
			animation: doudong 1.5s .15s linear forwards;
			font-size: 13px;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #FF4B4B;
			line-height: 20px;
			padding: 0 6px;
			width: max-content;
		}
		.review {
			color: #0055ff;
		}
	}
	.fenlei {
		text-align: center;
		border-bottom: 1px solid #797979;
		padding-bottom: 6px;
		margin-bottom: 6px;
		color: #776c6c;
	}
	.options {
		.list {
			display: flex;
			line-height: 24px;
			padding: 6px 12px;
			font-size: 15px;
			color: #222;
			border-top: 1px solid #eee;
			transition: all 0.3s;
			list-style: lower-roman;
		}
		.selected {
			background: #00aa00;
			color: #fff;
		}
	}
}
	.nextStep {
		height: 36px;
		line-height: 36px;
		background: $primaryColor;
		color: #fff;
		font-size: 18px;
		border-radius: 6px;
		margin-left: 18px;
		text-align: center;
		width: calc(100vw - 36px);
	}
	.preStep {
		background: #fff;
		color: $primaryColor;
		border: 1px solid $primaryColor;
		margin: 0 0 12px 18px;
	}
</style>