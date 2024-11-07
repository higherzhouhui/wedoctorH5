//在config/index.js
 const LINK = "http://web.jianxiangyunbao.cc"
// 请求的基本路径
const URL = "https://api.wedoctor.top"
const baseURL = process.env.NODE_ENV === "development" ? '/api/v2' : '/api/v2'
 
export {baseURL, URL, LINK}