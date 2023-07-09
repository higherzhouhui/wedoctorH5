
export const getQueryString = (name) => {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]).replace('/', '');
    }
    return null;
}

// 拼接字符串
export const stitchUrl = (url, data) => {
  let newUrl = url
  Object.keys(data).map(item => {
    if (!data[item]) {
      return
    }
    if (data[item] instanceof Object) {
      return
    }
    if (newUrl.includes('?')) {
      newUrl += `&${item}=${data[item]}`
    } else {
      newUrl += `?${item}=${data[item]}`
    }
  })
  return newUrl
}

// 拼接字符串
export const hideMiddlePhone = (phone) => {
  if (typeof phone === 'string') {
    return phone.substring(0, 3) + '****' + phone.substring(7,11)
  }
  return ''
}

