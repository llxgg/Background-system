/**
 * 持久化存储数据--localstorage
 */

 // 对localStorage进行兼容处理的第三方插件：
import store from 'store'

 // key属性
 const USER_KEY = 'user_key'


 /* localStorage版：
 export default {
     // 保存user,存储的只能是 json格式的字符串
     saveUser (user) {
        localStorage.setItem(USER_KEY,JSON.stringify(user))
     },

     // 读取user,把得到的结果返回，如果没有，就返回一个josn格式的空对象
     getUser () {
        return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
     },


     // 删除user
     removeUser () {
        localStorage.removeItem(USER_KEY);
     }
 }*/


 // 注意：localStorage不兼容低版本浏览器，所以需要处理：引入插件：


 // store插件：
 export default {
    // 保存user,store插件会自动转换为json格式的字符串
    saveUser (user) {
        store.set(USER_KEY, user)
    },

    // 读取user,把得到的结果返回，如果没有，就返回一个josn格式的空对象（store会自动处理）
    getUser () {
       return store.get(USER_KEY) || {}
    },


    // 删除user
    removeUser () {
        store.remove(USER_KEY)
    }
}