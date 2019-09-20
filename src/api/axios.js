/**
 * 封装 axios库：
 * 
 * 函数的返回值是promise对象
 * 封装为 async await 模式，则需要 new Promise，在内部处理then catch
 * 
 * 优化：
 * 1. 如果请求失败，统一处理。不需要每一个页面都 try catch来判断
 * 2. response 获取的是一个对象，对象里面的data 才是用户需要的数据，所以把 data返回就行。
 */

import axios from 'axios'
import {message} from 'antd'

export default function ajax(url,data={},method='GET') {
    return new Promise((resolve,reject) => {
        let promise // 定义全局的

        // 发送请求：
        if(method == 'GET'){
            promise = axios.get(url,{
                params: data
            });
        }else {
            promise = axios.post(url,data)
        }

        // 请求成功的处理：
        promise.then(response => {
            resolve(response.data); // 返回的数据是 需要 .data才能获取的，所以直接处理了


        }).catch(error => { // 请求失败的处理：统一处理
            message.error('请求出错了: ' + error.message);
        })

        
    })
}