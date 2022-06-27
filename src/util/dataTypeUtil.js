/**
 * 将 map => obj
 * eg:{
 *  "id":1,
 *  "name":"zhangsan"
 *  } ==>
 *  {
 *      id:1
 *      name:zhangsan
 *  }
 */
const _strMapToObj = (strMap) => {
    let obj = Object.create(null);
    for (let [k, v] of strMap) {
        obj[k] = v;
    }
    return obj;
}



/**
 * 将map转换为json格式字符串
 */
const _mapToJson = (map) => {
    return JSON.stringify(_strMapToObj(map));
}

