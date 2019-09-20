import React, { Component } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'

// 使用内存模块：
import MemoryUtils from '../../utils/MemoryUtils.js'

import { Layout } from 'antd';
import LeftNav from '../../components/left-nav/leftNav.jsx'
import Header from '../../components/header/header.jsx'

import Home from '../home/home' 
import Category from '../category/category' 
import Product from '../product/product' 
import Role from '../role/role' 
import User from '../user/user' 
import Bar from '../charts/bar' 
import Line from '../charts/line' 
import Pie from '../charts/pie'

const { Footer, Sider, Content } = Layout;

export default class Admin extends Component {
    render() {
        const user = MemoryUtils.user;
        console.log(user);

         // 没有用户信息，也就是没有登录，则强制跳转到登录页
        if(!user || !user._id) {
            return <Redirect to='/login' />
        }

        return (
            <div style={{height:'100%'}}>
                <Layout style={{height:'100%'}}>
                    {/* 左侧 */}
                    <Sider>
                        <LeftNav></LeftNav>
                    </Sider>


                    {/* 右侧 */}
                    <Layout>
                        <Header />


                        <Content style={{backgroundColor:'red',color:'#fff'}}>
                            {/* 书写路由 */}
                            <Switch>
                                <Route path='/home' component={Home}/> 
                                <Route path='/category' component={Category}/> 
                                <Route path='/product' component={Product}/> 
                                <Route path='/role' component={Role}/> 
                                <Route path='/user' component={User}/> 
                                <Route path='/charts/bar' component={Bar}/> 
                                <Route path='/charts/line' component={Line}/> 
                                <Route path='/charts/pie' component={Pie}/> 
                                <Redirect to='/home' />
                            </Switch>
                        </Content>


                        <Footer style={{textAlign:'center',color:'#ccc'}}>推荐使用谷歌浏览器，可以获得更佳页面体验</Footer>
                    </Layout>
                </Layout>
            </div>
        )
    }
}
