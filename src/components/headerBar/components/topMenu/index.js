import React, { Fragment } from 'react';
import { Row, Col, Icon } from 'antd';
import { observer } from 'mobx-react';
// 数据
import state from './state';
// 全局数据
import $state from '@store';
// less样式
import './index.less';

// 顶部菜单
@observer
class TopMenu extends React.Component {

    // 跳转到目标页面
    intoTargetPage = (that) => {
        if( that == 'login' ){
            this.props.history.push('/login');
        }else if( that == 'register' ){
            this.props.history.push('/register');
        }else if( that == 'order' ){
            this.props.history.push('/views/products/order');
        }else if( that == 'collection' ){
            this.props.history.push('/views/products/collection');
        }else if( that == 'userCenter' ){
            this.props.history.push('/views/user');
        }else if( that == 'logout' ){
            state.logoutData();
        }else if( that == 'admin' ){
            this.props.history.push('/admin');
        }
    }

    render() {
        const { uname } = $state;
        return (
            <div className='dm_topMenu'>
                <Row className='common_width'>
                    <Col span={ 6 }>
                        <Icon type="environment" style={{ paddingRight: '4px' }} />
                        上海
                    </Col>
                    <Col span={ 18 }>
                        {
                            uname ? (
                                <Fragment>
                                    <span>欢迎你，{ uname }</span>
                                    <span onClick={ this.intoTargetPage.bind(this, 'logout') }>退出登录</span>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <span onClick={ this.intoTargetPage.bind(this, 'login') }>登录</span>
                                    <span onClick={ this.intoTargetPage.bind(this, 'register') }>注册</span>
                                </Fragment>
                            )
                        }
                        <span onClick={ this.intoTargetPage.bind(this, 'order') }>我的订单</span>
                        <span onClick={ this.intoTargetPage.bind(this, 'collection') }>我的收藏</span>
                        <span onClick={ this.intoTargetPage.bind(this, 'userCenter') }>用户中心</span>
                        <span onClick={ this.intoTargetPage.bind(this, 'admin') }>Demo_Mall 后台管理系统</span>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default TopMenu;