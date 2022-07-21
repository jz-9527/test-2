/**
 * 封装请求
 */
//  import qs from 'querystring'

/**
 * get
 */
export function httpGet(url, data) {
    // 处理参数
    let arr = [];
    let result = null;
    for (var key in data) {
        if (data[key]) {
            arr.push(key + "=" + data[key])
        }
    }
    if (arr.length === 0) {
        result = fetch(url).then(res => res.json())
    } else {
        result = fetch(url + "?" + arr.join("&")).then(res => res.json())
    }

    return result
}
/**
 * post
 */
export function httpPost(url, params) {
    const result = fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'accept': 'application/json,text/plain,*/*'
        },
        //  body: qs.stringify(params)
        body:params
    }).then(data => data.json())

    return result
}
