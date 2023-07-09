<template>
	<view class="container">
		<view class="title">
			{{newsDetail.title}}
		</view>
		<view class="desc">
			<text class="origin">{{newsDetail.createTime}}</text>
			<text class="origin">{{newsDetail.publisher}}</text>
		</view>
		<view v-html="newsDetail.content"></view>
	</view>
</template>

<script>
	import {
		getNewsListRequest
	} from '@/api/home.js'
	export default {
		data() {
			return {
				id: 0,
				newsDetail: {},
				staticData:[
					{
						id: 0,
						title: '中核集团田湾核电4台机组通过竣工验收',
						time: '2023-06-02 10:11',
						origin: '中核集团',
						content: `<view class="content">
						<view style="font-size: 15px; color: #333; line-height: 24px; margin-bottom: 18px; text-indent:2em; display:block">5月31日，中核集团旗下中国核电（股票代码：601985）投资控股的田湾核电二期工程（3、4号机组）、三期工程（5、6号机组）正式通过竣工验收。田湾核电二期、三期工程，均是党的十八大以来开工建设和实现投产的核能领域两项重大工程，为保障江苏省能源供给、优化能源结构、推动我国核电积极安全有序发展发挥了重要作用。
						</view>
						<view style="font-size: 15px; color: #333; line-height: 24px; margin-bottom: 18px; text-indent:2em; display:block">验收组一致认为：田湾核电二期（3、4号机组）、三期工程（5、6号机组）已全面建成投产，工程建设符合国家相关法规、标准和规范，各项技术指标达到设计要求，安全管控总体有效，机组投产后运行业绩良好，同意田湾核电二期工程（3、4号机组）、三期工程（5、6号机组）通过现场竣工验收。
						</view>
						<view style="font-size: 15px; color: #333; line-height: 24px; margin-bottom: 18px; text-indent:2em; display:block">中核集团在验收会上表示，中核集团将坚持安全第一、创新驱动和战略协作，高质量、高标准建设和运行好田湾核电7、8号机组以及已经建成投产的田湾核电1-6号机组，致力将田湾核电站打造成为全球核能合作典范；积极探索多种方式的核能综合利用，为我国建立近零排放能源体系，2030年如期实现“碳达峰”目标贡献中核力量。
						</view>
						<view style="font-size: 15px; color: #333; line-height: 24px; margin-bottom: 18px; text-indent:2em; display:block">中核集团总经济师黄敏刚以及来自江苏省发改委、连云港市发改委、连云区经济发展局，中核集团相关部门单位的领导及代表，中国核能电力股份有限公司、国电投核能有限公司、江苏国信集团有限公司代表，最终竣工验收委员会成员、专家组成员，总包单位、监理公司、设计单位、参建单位、江苏核电负责同志出席验收活动。
						</view>
						<view style="font-size: 15px; color: #333; line-height: 24px; margin-bottom: 18px; text-indent:2em; display:block">田湾核电二期工程3、4号机组单机容量112.6万千瓦。项目于2012年12月27日开工建设，3、4号机组分别于2018年2月15日和12月22日投入商业运行。二期工程基于一期两台机组建设运维经验，做了433项设计改进，其中重大设计改进21项，开展了一系列重要先进设计和大量自主化优化。核岛设备进一步提升了国产化率。
						</view>
						<view style="font-size: 15px; color: #333; line-height: 24px; margin-bottom: 18px; text-indent:2em; display:block">田湾核电三期工程5、6号机组单机容量111.8万千瓦。项目于2015年12月27日开工建设，5、6号机组分别于2020年9月8日、2021年6月2日投入商业运行。作为国家“十二五”核电机组收官之作，创同类型机组建设工期、调试、装料至商运的最短纪录，实现了双机组首循环“零非停”，并连续刷新同类机型首次大修最短工期纪录。
						</view>
						<veiw style="font-size: 15px; color: #333; line-height: 24px; margin-bottom: 18px; text-indent:2em; display:block">截至目前，中核集团田湾核电6台机组累计安全发电超过3700亿度，等效减排二氧化碳30340万吨，减排效益相当于在长江三角洲地区每年新增种植超10.2万公顷绿色森林，对优化我国能源结构、推动绿色低碳发展，助力实现碳达峰碳中和目标起到重要作用。（中核集团）
						</view>
						<view>`,
					},{
						id: 1,
						title: '广州中南部地区供电能力增长53%',
						time: '2023-05-31 10:15',
						origin: '南方电网报',
						content: `<view class="content">
						<view style="font-size: 15px; color: #333; line-height: 24px; margin-bottom: 18px; text-indent:2em; display:block">5月26日，随着高压线路传输电能至500千伏楚庭变电站内，500千伏楚庭输变电工程的“最后一块拼图”成功嵌合，全线顺利完成送电，标志着国家西电东送南部通道的关键布点项目、南方电网公司保障民生用电重点项目竣工投产。该项目可为广州市中南部地区增加供电能力140万千瓦，增长53%，新增供电能力相当于如今广州市番禺区供电总负荷的1/2。
						</view>
						<view style="font-size: 15px; color: #333; line-height: 24px; margin-bottom: 18px; text-indent:2em; display:block">500千伏楚庭输变电工程在创新技术的探索应用上走在前列，率先试点使用智慧项目管控平台，开展BIM(建筑信息模型)正向三维设计探索研究，搭建基于BIM的虚拟现实场景，探索应用三维数字化移交手段，提升项目管理人员的管理效率及项目建设质量。
						</view>
						<view style="font-size: 15px; color: #333; line-height: 24px; margin-bottom: 18px; text-indent:2em; display:block">作为广州首座500千伏GIS户内变电站，500千伏楚庭变电站采用了先进的智能设备，推进智能巡视、设备状态智能检测、智能录波器等应用，实现全站信息数字化、通讯网络平台化、信息共享标准化。同时，与各通信运营商合作，通过应用无线多频融合设备，首次实现了三大运营商4G/5G信号的全覆盖。
						</view>
						<view style="font-size: 15px; color: #333; line-height: 24px; margin-bottom: 18px; text-indent:2em; display:block">值得一提的是，项目建设整体设计呈现环境友好、节能环保的特点。广东电网公司广州供电局项目经理张尧介绍，该变电站外立面采用幕墙保温一体板，利用低碳技术，使建筑物冬暖夏凉，持续改善室温环境质量，起到节能环保和保护设备寿命作用，且幕墙造型简洁美观，与广州南站规划发展区域周边建筑风格相互协调。同时，变电站全面推广应用装配式技术及预制件，围墙、防火墙、电缆沟盖板、雨水井压顶等推广率达85%，节省约20%的工期。
						</view>
						<veiw style="font-size: 15px; color: #333; line-height: 24px; margin-bottom: 18px; text-indent:2em; display:block">近年来，广州用电需求不断增长，供电压力亦随之增大。中南部地区是广州市未来重要的负荷增长区域，500千伏楚庭输变电工程应运而生。
						</view>
						<view style="font-size: 15px; color: #333; line-height: 24px; margin-bottom: 18px; text-indent:2em; display:block">“项目投产后，广州中南部地区增加供电能力140万千瓦，增长53%，新增供电能力相当于番禺区供电总负荷的1/2。”广东电网公司广州供电局基建部总经理毕超豪说，“项目每年可输送电量约70亿千瓦时，将为广州提供优质电能支撑，助力粤港澳大湾区产业集群建设。
						</view>
						<view style="font-size: 15px; color: #333; line-height: 24px; margin-bottom: 18px; text-indent:2em; display:block">据了解，随着500千伏楚庭变电站、500千伏广南变电站、500千伏木棉变电站形成供电的“铁三角”，广州中南部地区220千伏电网结构可靠性进一步巩固。后续随着500千伏楚庭第二电源通道工程、500千伏番南变电站等项目的建成落地，广州电网相互支援与防灾能力将大幅提升，进一步促进粤西清洁能源送电粤港澳大湾区负荷中心消纳，加快推动“双碳”目标实现。（张静和 刘海宁）
						</view>
						<view>`,
					},{
						id: 2,
						title: '广西海上风电项目海域使用权实现“零”的突破',
						time: '2023-06-02 10:20',
						origin: '广西日报',
						content: `<view class="content">
						<view style="font-size: 15px; color: #333; line-height: 24px; margin-bottom: 18px; text-indent:2em; display:block">　5月29日，广西首个海上风电项目——广西防城港海上风电示范项目A场址工程海域使用权在防城港市公共资源交易平台成功挂牌出让，实现广西海上风电项目海域使用权“零”的突破。
						</view>
						<view style="font-size: 15px; color: #333; line-height: 24px; margin-bottom: 18px; text-indent:2em; display:block">据了解，A场址工程总投资近100亿元，主要建设83台8.5兆瓦风力发电机组、1座220千伏海上升压站、1座陆上集控中心、送出海缆和集电海缆等，规划装机容量70万千瓦，年等效满负荷小时数为2916小时，年上网电量20.57亿度，每年可节约标煤消耗约61.74万吨，减少二氧化碳排放量约164.26万吨。
						</view>
						<view style="font-size: 15px; color: #333; line-height: 24px; margin-bottom: 18px; text-indent:2em; display:block">防城港海上风电示范项目力争2023年底首批风机并网发电，2024年底A场址全容量并网发电，建成投运后将带动海上风电产业落户广西，形成以风机、塔筒、叶片装备制造为核心，发电机、齿轮箱等配套产业及海洋牧场、海水制氢、储能等延伸产业融合发展的产业集群，推动广西海上风电产业高质量发展。（吕海锋 陈飞霞）
						</view>
						<view style="font-size: 15px; color: #333; line-height: 24px; margin-bottom: 18px; text-indent:2em; display:block">值得一提的是，项目建设整体设计呈现环境友好、节能环保的特点。广东电网公司广州供电局项目经理张尧介绍，该变电站外立面采用幕墙保温一体板，利用低碳技术，使建筑物冬暖夏凉，持续改善室温环境质量，起到节能环保和保护设备寿命作用，且幕墙造型简洁美观，与广州南站规划发展区域周边建筑风格相互协调。同时，变电站全面推广应用装配式技术及预制件，围墙、防火墙、电缆沟盖板、雨水井压顶等推广率达85%，节省约20%的工期。
						</view>
						<view>`,
					},{
						id: 1,
						title: '新能源发展让新型交通技术实现成为可能',
						time: '2023-05-31 10:17',
						origin: '科技日报',
						content: `<view class="content">
						<view style="font-size: 15px; color: #333; line-height: 24px; margin-bottom: 18px; text-indent:2em; display:block">　能源与交通息息相关、不可分割。交通是能源的最大负荷领域之一，能源的绿色发展则是交通发展战略的必然要求。交能融合，即交通行业与绿色可再生能源的融合发展。推动交能融合发展，可以扩大可再生能源的利用范围；同时，新能源的不断发展，也让一些新型交通技术的实现成为可能。　　
						</view>
						<view style="font-size: 15px; color: #333; line-height: 24px; margin-bottom: 18px; text-indent:2em; display:block">在高速公路旁的斜坡上，一块块光伏板延伸向远方。而在看不见的地下，太阳能电力正源源不断地被送往千家万户。
						</view>
						<view style="font-size: 15px; color: #333; line-height: 24px; margin-bottom: 18px; text-indent:2em; display:block">5月26日，科技日报记者来到位于山东枣菏高速公路金乡服务区的我国首个全路域交通能源融合示范项目——枣菏高速交能融合示范工程。该项目由葛洲坝集团交通投资有限公司投资，中国能源建设集团广东省电力设计研究院有限公司、中国能源建设集团山西电力建设有限公司联合总承包建设。来自中国能建葛洲坝交投公司的专家告诉记者，该项目首创性地将交通与能源融合在一起，打造了交能融合发展的新样板。
						</view>
						<view style="font-size: 15px; color: #333; line-height: 24px; margin-bottom: 18px; text-indent:2em; display:block">为何要将交通与能源融合发展？此次国内首个全路域交通能源融合示范项目建设有何难点？该项目对于推动交能融合发展有何意义？带着这些问题，记者采访了相关专家。
						</view>
						<veiw style="font-size: 15px; color: #333; line-height: 24px; margin-bottom: 18px; text-indent:2em; display:block">着眼未来，中国能建葛洲坝交投公司研究院院长崔培强踌躇满志：“目前我们公司投资建设管理的高速公路总里程超过2700公里，为探索交能融合业务提供了载体。此次金乡段并网发电是企业交能融合项目的第一步，未来3至5年，我们将完成能源管理与智慧交通的深度融合，系统规划、建设冷链仓储物流、氢能中心等。”
						</view>
						<view style="font-size: 15px; color: #333; line-height: 24px; margin-bottom: 18px; text-indent:2em; display:block">“枣菏高速交能融合一体化智慧平台的一个核心功能是源网荷储一体化调控，可以对高速全域的光伏、储能、用电负荷和电网进行统一协调控制，使“绿电”优先在高速全域内部消纳利用。
						</view>
						<view style="font-size: 15px; color: #333; line-height: 24px; margin-bottom: 18px; text-indent:2em; display:block">“作为交能融合领域的先行者，中国能源建设集团目前在绿色公路、近零碳港口等领域进行了积极探索，取得了系列创新成果。”针对交通与能源领域下一步的发展，中国能源建设集团有限公司党委书记、董事长宋海良认为，应围绕绿色低碳、数字智慧“两化”转型，全力构建交能融合生命共同体，同时做强新平台，全力攻克交能融合技术装备难点堵点，拓展交能融合场景应用范围，并完善交能融合政策标准体系。（王延斌）
						</view>
						<view>`,
					},
				]
			}
		},
		methods: {
			initData() {
				getNewsListRequest({pageNum: 1, pageSize: 100}).then(res => {
					const { list } = res.data
					uni.stopPullDownRefresh()
					list.forEach(item => {
						if (item.id == this.id) {
							this.newsDetail = item
						}
					})
				})
			}
		},
		onLoad(options) {
			this.id = options.id
			this.initData()
		},
		onPullDownRefresh() {
			// 执行刷新操作
			this.initData()
		}
	}
</script>

<style scoped lang="scss">
.container {
	min-height: 100vh;
	padding: 20px 12px;
	background: #fff;
	.title {
		font-size: 22px;
		font-family: PingFang SC-Semibold, PingFang SC;
		font-weight: 600;
		color: #333333;
		line-height: 30px;
	}
	.desc {
		margin: 16px 0 24px 0;
		.origin {
			font-size: 14px;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #999999;
			line-height: 23px;
			display: inline-block;
			margin-right: 16px;
		}
	}
	.content {
		/deep/.pargh {
			font-size: 15px;
			font-family: PingFang SC-Regular, PingFang SC;
			font-weight: 400;
			color: #333333;
			line-height: 24px;
			text-indent: 2em;
			margin-bottom: 24px;
		}
	}
}
</style>
