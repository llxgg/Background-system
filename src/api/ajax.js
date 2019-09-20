/**
 * 处理 接口，不需要每一个页面都写一大串请求时的 url，data这些，到时候直接调用 封装好的方法就行。
 */
// 导入 axios
import ajax from './axios.js'


// 请求登陆接口
// ajax('/login', {username: 'Tom', passsword: '12345'}, 'POST').then()
// 添加用户
// ajax('/manage/user/add', {username: 'Tom', passsword: '12345', phone: '13712341234'}, 'POST').then()



// 封装成一个api，带时候直接调用传递参数就行，不需要写 url，method这些了
/*
export function reqLogin(username, password) {
  return ajax('/login', {username, password}, 'POST')
}*/


// 箭头函数：
// 请求登陆接口
export const reqLogin = (username, password) => ajax('/login', {username, password}, 'POST')

// 添加用户
export const reqAddUser = (user) => ajax('/manage/user/add',user,'POST')