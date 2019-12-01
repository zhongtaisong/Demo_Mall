import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
// 设置
import { indexState } from '@config';

// 背景图片
import bigImg from '@img/register/bg.png';

// logo图片
import logoImg from '@img/logo2.png';

// 数据
import state from './state';

// 加密key
import { PWD_KEY } from '@config';

// less样式
import './index.less';

const loginBg = {
    background: `url(${bigImg}) no-repeat`,
    backgroundSize: 'cover'
}

// 注册
@observer
class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false
        }
    }

    componentDidMount() {
        this.props.history && state.setHistory( this.props.history );
        indexState.oauthData();
    }

    // 密码 - 校验
    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if ( value && this.state.confirmDirty ) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    // 确认密码 - 校验
    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if ( value && value !== form.getFieldValue('upwd') ) {
            callback('两次输入的密码不一致！');
        } else {
            callback();
        }
    };

    // 确认密码
    handleConfirmBlur = (e) => {
        const { value } = e.target;
        this.setState({ 
            confirmDirty: !!value
        });
    };

    // 手机号码 - 校验
    validatePhone = (rule, value, callback) => {
        let reg = /^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/;
        if ( !reg.test( value ) ) {
            callback('请输入合法的手机号码！');
        } else {
            callback();
        }
    };

    // 提交注册信息
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                values.upwd = this.$md5( values.upwd + PWD_KEY );
                values.confirm = this.$md5( values.confirm + PWD_KEY );
                state.registerData( values );
            }
        });
    };

    componentWillUnmount() {
        state.setHistory();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='dm_Register'>
                <div className='common_width logo'>
                    <Link to='/'>
                        <img src={ logoImg } alt='logo' />
                    </Link>
                </div>
                <div className='content' style={ loginBg }>
                    <Form layout='inline' onSubmit={ this.handleSubmit }>
                        <Row>
                            <Col span={ 24 }>
                                <Form.Item label='用户名'>
                                    {
                                        getFieldDecorator('uname', {
                                            rules: [{ 
                                                required: true, 
                                                message: '必填', 
                                                whitespace: true 
                                            }]
                                        })(
                                            <Input placeholder='请输入' />
                                        )
                                    }
                                </Form.Item>
                            </Col>
                            <Col span={ 24 }>
                                <Form.Item label="密码" hasFeedback>
                                    {
                                        getFieldDecorator('upwd', {
                                            rules: [{
                                                required: true,
                                                message: '必填', 
                                                whitespace: true 
                                            },{
                                                validator: this.validateToNextPassword
                                            }]
                                        })(
                                            <Input.Password placeholder='请输入' />
                                        )
                                    }
                                </Form.Item>
                            </Col>
                            <Col span={ 24 }>
                                <Form.Item label="确认密码" hasFeedback>
                                    {
                                        getFieldDecorator('confirm', {
                                            rules: [{
                                                required: true,
                                                message: '必填', 
                                                whitespace: true 
                                            },{
                                                validator: this.compareToFirstPassword
                                            }]
                                        })(
                                            <Input.Password placeholder='请输入' onBlur={ this.handleConfirmBlur } />
                                        )
                                    }
                                </Form.Item>
                            </Col>
                            <Col span={ 24 }>
                                <Form.Item label="手机号码">
                                    {
                                        getFieldDecorator('phone', {
                                            rules: [{ 
                                                required: true, 
                                                message: '必填', 
                                                whitespace: true 
                                            },{
                                                validator: this.validatePhone
                                            }]
                                        })(
                                            <Input style={{ width: '100%' }} placeholder='请输入' />
                                        )
                                    }
                                </Form.Item>
                            </Col>
                            <Col span={ 24 }>
                                <Form.Item label="邮箱">
                                    {
                                        getFieldDecorator('email', {
                                            rules: [{
                                                type: 'email',
                                                message: '输入的邮箱无效!',
                                            },{
                                                required: true,
                                                message: '必填', 
                                                whitespace: true 
                                            }]
                                        })(
                                            <Input placeholder='请输入' />
                                        )
                                    }
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={ 24 }>
                                <Form.Item style={{ marginBottom: 0 }}>
                                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>提交注册信息</Button>
                                </Form.Item>
                            </Col>
                            <Col span={ 24 }>
                                <Form.Item>
                                    <Link to="/login">已有账号，直接登录</Link>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Form.create()(Register);