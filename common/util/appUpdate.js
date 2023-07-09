//APP更新
import {getVersionRequest} from "@/api/user"
export default function appUpdate(check) {
	// 获取系统信息
	const systemInfo = uni.getSystemInfoSync();
	// 获取应用版本号
	const version = systemInfo.appWgtVersion;
	getVersionRequest({deviceType: 1}).then(res => {
		if (res.code === 200) {
			const {data} = res
			const currentVersion = Number(String(version).replace(/\./g, ''))
			const onlineVersioin = Number(String(data.version ).replace(/\./g, ''))
			if (isNaN(currentVersion) || isNaN(onlineVersioin)) {
				return
			}
			if (currentVersion < onlineVersioin) {
				uni.showModal({ 
					title: `当前版本:${version}`,
					content: `更新提示：${data.describe},最新版本:${data.version}`,
					confirmText: '更新',
					cancelText: data.isCompel ? '' : '取消',
					success: (showResult) => {
						if (showResult.confirm) {
							plus.nativeUI.toast("正在准备环境，请稍后!");
							var dtask = plus.downloader.createDownload(data.downUrl, {
								method: 'GET',
								filename: '_doc/update/'
							}, function(d, status) {
								if (status == 200) {
									var path = d.filename; //下载apk
									plus.runtime.install(path); // 自动安装apk文件
								} else {
									plus.nativeUI.alert('版本更新失败:' + status);
								}
							});
							dtask.start();
						}
					}
				})
			} else {
				if (check) {
					uni.showToast({
						title: '当前已是最新版本' + version,
						icon: 'none'
					})
				}
			}
		}
	})
}
