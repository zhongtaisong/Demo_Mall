import React, { Fragment } from 'react';
import { Row, Col, Input, Button, Badge, message } from 'antd';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';

// logo图片
import logoImg from '@img/logo.png';
// 数据
import state from './state';
// less样式
import './index.less';

const { Search } = Input;

// 插入logo图片
const logoBg = {
    background: `url(${logoImg}) no-repeat`,
    height: '72px',
    backgroundSize: 'contain',
    backgroundPosition: 'center'
}

// 搜索区域
@observer
class SearchArea extends React.Component {

    componentDidMount() {
        state.productNumData();
    }

    // 跳转页面
    handleClick = (that) => {
        if( that == 'goHome' ){
            this.props.history.push('/views/home');
        }else if( that == 'cart' ){
            this.props.history.push('/views/products/cart');
        }
    }

    // 展示搜索框
    showSearchInput = () => {
        state.setIsShowSearchInput02();
    }

    // 菜单列表
    menuList = () => {
        const { pathname } = window.location;
        return (<Fragment>
            <Link to='/views/home' className={ pathname == '/views/home' ? 'active' : '' }>首 页</Link>
            <Link to='/views/products' className={ 
                pathname == '/views/products' || pathname == '/views/products/detail' ? 'active' : '' 
            }>杂货铺</Link>
            <Link to='/views/web' className={ pathname == '/views/web' ? 'active' : '' }>网站说明</Link>
            <Link to='/views/message' className={ pathname == '/views/message' ? 'active' : '' }>留言</Link>
        </Fragment>);
    }

    // 获取搜索关键字
    getSearchKws = (value, e) => {
        if( !value.trim() ){
            message.warning('关键字不能为空！');
            return;
        }else{
            state.kwData( value.trim() );
            state.setIsShowResultPage( true );
        }
    }

    render() {
        const { productNum, isShowSearchInput } = state;
        return (
            <Fragment>
                <div className='dm_SearchArea'>
                    <Row className='common_width'>
                        <Col span={ 4 } className='logo' onClick={ this.handleClick.bind(this, 'goHome') } style={ logoBg }></Col>
                        <Col span={ 16 }>
                            {
                                this.menuList()
                            }
                        </Col>
                        <Col span={ 4 }>
                            <Button type="primary" icon="search" className='search' 
                                onClick={ this.showSearchInput }
                            />
                            <Badge count={ productNum } overflowCount={ 99 }>
                                <Button icon='shopping-cart' type="primary" className='cart'
                                    onClick={ this.handleClick.bind(this, 'cart') }
                                >我的购物车</Button>
                            </Badge>
                        </Col>
                    </Row>
                </div>
                {
                    isShowSearchInput ? (
                        <div className='dm_SearchInput'>
                            <Row className='common_width'>
                                <Search placeholder="请输入关键字" onSearch={ this.getSearchKws } enterButton />
                            </Row>
                        </div>
                    ) : ''
                }
            </Fragment>
        );
    }
}

export default SearchArea;