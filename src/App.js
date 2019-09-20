import React from 'react'


// import {Button, message} from 'antd'
// import 'antd/dist/antd.css' // 把整个antd的样式都导入,需要做处理：

// 导入路由插件：
import {BrowserRouter as Router,Route,NavLink,Switch,Redirect} from 'react-router-dom'

// 导入组件：(快速复制上下行：alt + shift + 上下箭头)
import Login from './pages/login/login.jsx'
import Admin from './pages/admin/admin.jsx'


export default class App extends React.Component {

   state = {

   }

    render () {
        return (
            <Router>
                <Switch>
                    {/* 登录页面 */}
                    <Route path='/login' component={Login}></Route>
                    {/* <Redirect to='/login'></Redirect> */}

                    {/* 首页 */}
                    <Route path='/' component={Admin}></Route>
                    
                </Switch>
            </Router>
        )
    }
}