import React, { Component } from 'react'

import { Form, Icon, Input, Button,message } from 'antd';
import { Redirect } from 'react-router-dom'

import './login.less'
// 注意：在react中，不能直接通过img的src属性绑定图片路径，必须要用 import 引入，img的src属性设置为 {logo}

import { reqLogin } from '../../api/ajax.js'
import MemoryUtils from '../../utils/MemoryUtils.js'
import StorageUtils from '../../utils/StorageUtils.js'

const Item = Form.Item; // 把antd组件中，form表单的标签简化，注意不能写在import 之前，否则会报错

class Login extends Component {
    // 表单提交事件：
    SubmitLogin = (e) => {
         // 阻止默认行为：
         e.preventDefault();

        // 点击登录，要校验所有的输入框是否符合规则：
        this.props.form.validateFields(async (err, values) => {

            if (!err) { // 校验成功：
              console.log('发送登录请求', values);

              // 处理数据：
              const {username, password} = values;
              const result = await reqLogin(username, password);
              if(result.status === 0){
                // 提示登录成功
                message.success('登录成功');

                // 把 user用户信息 保存到 内存中
                const user = result.data;
                console.log('user',user);
                MemoryUtils.user = user; // 保存到内存中

                // 实现持久登录：保存到localstorage中
                StorageUtils.saveUser(user);


                // 跳转页面：
                this.props.history.replace('/home');

              }else { // 登录失败
                  // 提示错误信息
                  message.error(result.msg)
              }


            }else { // 校验失败：
                console.log('输入的内容不符合规则', values);
            }
        });


        // 得到新的form对象：
        // const form = this.props.form;
        // 收集表单数据：
        // const values = form.getFieldsValue();
        // console.log(values);
    }


    // 自定义表单密码的校验规则：
    validatePwd = (rule, value, callback) => {
        // callback(); // 没有传入任何东西，则表示校验通过
        // callback('校验没有通过'); // 传入东西，则表示校验没有通过，里面的内容返回给用户看

        console.log('validatePwd',rule,value);

        if(!value){
            callback('请输入密码');
        }else if(value.length < 4){
            callback('密码长度不能小于4位')
        }else if(value.length > 12){    
            callback('密码长度不能大于12位');
        }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
            callback('密码必须是英文、数组或下划线组成');
        }else {
            callback(); // 校验通过
        }
    }

    render() {
        // 如果用户已经登录，则有user信息，则强制跳转到 /home界面
        const user = MemoryUtils.user;
        if(user && user._id){
            return <Redirect to='/' />
        }

        // 高阶组件中，返回新的组件包含新的属性：form，用react工具查出来的
        const form = this.props.form;
        const { getFieldDecorator } = form; // 该属性下是一个对象

        
        return (
            <div className='login'>
                <header className='login-header'>
                    <h1>react电商后台管理系统</h1>
                </header>

                <section className='login-content'>
                    <h2>用户登录</h2>
                
                    <Form onSubmit={this.SubmitLogin} className="login-form">
                        {/* 用户名： */}
                        <Item>
                            {/** 组件自带的校验规则 */}
                            {
                                // getFieldDecorator有两个形参，第一个是：username是一个唯一标志，第二个是options，一般是{}，里面写rules规则
                                getFieldDecorator('username',{
                                    rules: [
                                        { required: true, message: '请输入用户名' },
                                        { min: 4, message: '用户名长度不能少于4位' },
                                        { max: 12, message: '用户名长度不能大于12位' },
                                        { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' },
                                    ],
                                    initialValue:'admin'
                                })(
                                    <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="请输入账号"
                                    />
                                )
                            }
                        </Item>


                        {/* 密码： */}
                        <Item>
                             {/** 自定义校验规则 */}
                             {
                                getFieldDecorator('password',{
                                    rules: [{
                                          validator: this.validatePwd // validator对应的值是一个规则函数
                                        }]
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="请输入密码"
                                    />
                                )
                            }
                            
                        </Item>

                        {/* 登录按钮 */}
                        <Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Item>

                    </Form>
                </section>
            </div>
        )
    }
}

// 高阶组件：对一个组件进行包装，然后返回一个新的组件，新组件带有新的属性
const loginComponents = Form.create()(Login)
export default loginComponents;