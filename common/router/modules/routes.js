const routes = [
	{
	 path: "/pages/login/login",
	 name: 'login',
		 meta: {
			 title: '登录',
		 },
	},
	{
	  path: '/pages/login/personal/personal',
	  name: 'personal',
	    meta: {
	        title: '用户协议',
	    },
	},
	{
	  path: '/pages/login/privacy/privacy',
	  name: 'privacy',
	    meta: {
	        title: '隐私协议',
	    },
	},
	{
	  path: '/pages/login/hint/hint',
	  name: 'hint',
	    meta: {
	        title: '答题开始',
	    },
	},
	{
      path: '/pages/index/index',
      name: 'index',
        meta: {
	        title: '首页',
	    },
	},
	{
	  path: '/pages/complete/complete',
	  name: 'complete',
	    meta: {
	        title: '完成',
	    },
	},
]
export default routes