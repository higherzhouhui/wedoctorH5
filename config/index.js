//在config/index.js
 const LINK = "http://web.jianxiangyunbao.cc"
// 请求的基本路径
const URL = "http://47.96.151.84:8900"
const baseURL = process.env.NODE_ENV === "development" ? '/api' : URL
 
export {baseURL, URL, LINK}