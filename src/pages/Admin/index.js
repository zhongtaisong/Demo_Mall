import React from 'react';
import { observer } from 'mobx-react';
import { Row, Col, Button } from 'antd';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
// 头部
import HeaderBar from '@pages/Admin/components/headerBar';
// 主体内容
import Routes from '@router/admin';
// 数据
import state from './state';
// less样式
import './index.less';

function Bus() {
    return <h3>Bus</h3>;
  }

const CustomRoutes = (props) => {
    const { path, component: Component, ...rest } = props;
    return (
        <Route path={ path } render={
            props => {
                return (<Component {...props} {...rest} />);
            }
        }/>
    );
};

// Demo_Mall后台管理系统
@observer
class Admin extends React.Component {

    state = {
        siderMenu: []
    }

    componentWillMount() {        
        // state.selectDicData();
        console.log('1111111111', this.props);
    }

    setSiderMenu = (props) => {
        const { pathname } = props.location || {};
        if( pathname.includes('/admin/home') ){
            this.setState({
                siderMenu: []
            });
        }else if( pathname.includes('/admin/pm') ){
            this.setState({
                siderMenu: [
                    { id: 1, title: '品牌列表', url: '/admin/pm/brands/list' },
                    { id: 2, title: '商品列表', url: '/admin/pm/products/list' }
                    // { id: 3, title: '图片列表', url: '/admin/pm/productsImg/list' }
                ]
            });
        }else if( pathname.includes('/admin/om') ){
            this.setState({
                siderMenu: [
                    { id: 1, title: '订单列表', url: '/admin/om/orders/list' }
                ]
            });
        }else if( pathname.includes('/admin/um') ){
            this.setState({
                siderMenu: [
                    { id: 1, title: '用户列表', url: '/admin/um/users/list' }
                ]
            });
        }else if( pathname.includes('/admin/cm') ){
            this.setState({
                siderMenu: [
                    { id: 1, title: '评论列表', url: '/admin/cm/comment/list' }
                ]
            });
        }
    }

    componentDidMount() {
        this.setSiderMenu( this.props );
    }

    componentWillReceiveProps(nextProps) {
        if( this.props.location.pathname != nextProps.location.pathname ){
            this.setSiderMenu( nextProps );
        }
    }

    render() {
        const { siderMenu } = this.state;
        const { pathname } = this.props.location;
        const { setTitle, title, setButtonClick, buttonClick } = state;
        const { routes=[] } = this.props;
        return (
            <div className='dm_Admin'>
                {/* <HeaderBar {...this.props} /> */}
                <Row className='common_width dm_Admin_main_content'>
                    <Col span={ 3 } className='dm_Admin_siderMenu'>
                        <ul>
                            {
                                title ? (
                                    <li>
                                        <Button type="primary"
                                            onClick={ buttonClick }
                                            icon="plus"
                                        >{ title }</Button>
                                    </li>
                                ) : ''
                            }
                            {
                                siderMenu.map(item => {
                                    return (
                                        <li key={ item.id } className={ pathname == item.url ? 'active' : '' }>
                                            <Link to={ item.url }>{ item.title }</Link>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </Col>
                    <Col span={ 21 }>
                        11111111
                        {/* <Routes 
                            setTitle={ setTitle }
                            setButtonClick={ setButtonClick }
                        /> */}
                        <Switch>
                            <Route path='/views/admin/pm/brands/list' component={ Bus } />
                            {/* {
                                routes.map(route => {
                                    console.log('ddddddd', route);
                                    return (
                                        <Route key={ route.id } {...route} />
                                    );
                                })
                            } */}
                        </Switch>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Admin;