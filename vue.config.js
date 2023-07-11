module.exports = {
	  devServer: {
	    proxy: {
	     '/api/': {
	             target: 'http://47.96.151.84:8900',
	             changeOrigin: true, 
	                 pathRewrite: {
	                 "^/api": ""
	            }
	        }
	    }
	}
}