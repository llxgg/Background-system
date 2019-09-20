import React, { Component } from 'react'

import logo from '../../assets/images/logo.png'
import './leftNav.less'

import { Link, withRouter } from 'react-router-dom'

import menuList from '../../config/menuConfig.js'

import { Menu, Icon } from 'antd';

const { SubMenu } = Menu;


class leftNav extends Component {

    // 两种方式处理菜单数据：（如果有children属性，就渲染SubMenu 组件，如果没有，就渲染 Menu.Item 组件 ）
    // 1. map + 递归
    // 2. reduce() + 递归  ------reduce是累计的意思，就是第二个形参是数组，符合条件的不断往数组中添加数据

    getMenuNodes_map = (menuList) => {
        return menuList.map(item => {
            if(!item.children){
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>  
                )
            }else {
                return (
                    <SubMenu
                        key={item.key}
                        title={
                        <span>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </span>
                        }
                    >
                        
                        {/* 递归调用,把children数据数据再次传递给 getMenuNodes_map 方法 ：动态生成 Menu.Item */}
                        { this.getMenuNodes_map(item.children) }
                    
                    </SubMenu>
                )
            }
        })
    }

    // reduce() + 递归
    getMenuNodes_reduce = (menuList) => {
        // 其中：pre 是上一次的结果，对象后面必须跟一个空数组，是用来累积数据的，第二次统计的时候，有可能往这个数组添加数据，一直往这个数组添加数据。
        return menuList.reduce((pre,item) => {
            // 两种情况：1. 向 pre 添加 Menu.Item 
            // 2. 向 pre 添加 SubMenu

            if(!item.children){
                pre.push((
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>  
                ))
            }else {
                pre.push((
                    <SubMenu
                        key={item.key}
                        title={
                        <span>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </span>
                        }
                    >
                        
                        {/* 递归调用,把children数据数据再次传递给 getMenuNodes_map 方法 ：动态生成 Menu.Item */}
                        { this.getMenuNodes_reduce(item.children) }
                    
                    </SubMenu>
                ))
            }


            return pre; // 这个pre是当前统计的结果，作为下一次的条件，所以每一次统计都需要把最新的结果 返回给 pre
        },[])
    }

    render() {

        // 获取路由地址：
        const path = this.props.location.pathname; // 但是该 leftNav是一个非路由组件，没有 location属性，所以会报错，需要使用高阶组件：withRouter


        return (
            <div className='left-nav'>
                <Link to='/home' className='left-nav-header'>
                    <img src={logo} alt="logo"/>
                    <h1>react后台管理</h1>
                </Link>


                {/* 菜单列表 */}
                <Menu
                    // defaultSelectedKeys={[path]} // 这个属性虽然能实现，但是只执行一次，如果用户再次从3000端口进入，则没有生效
                    selectedKeys={[path]} // 动态根据路由的变化使菜单栏发生改变
                    
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    >
                    
                    {/* map + 递归调用，生成组件 */}
                    { this.getMenuNodes_reduce(menuList) }
                </Menu>
            </div>
        )
    }
}

// 把高阶组件生成的性组件暴露
export default withRouter(leftNav);