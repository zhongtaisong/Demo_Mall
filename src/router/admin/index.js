import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// import Home from '@pages/Admin/home';
import ProductList from '@pages/Admin/productsManage/productList/list';
import BrandList from '@pages/Admin/productsManage/brandList';
import ImgList from '@pages/Admin/productsManage/imgList/list';
import OrdersList from '@pages/Admin/ordersManage/orderList/list';
import UsersManageList from '@pages/Admin/usersManage/userList/list';
import CommentsManageList from '@pages/Admin/commentsManage/commentList/list';

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

const Routes = (props) => {
    return (
        <Switch>
            <Redirect exact strict from='/views/admin' to='/views/admin/pm/brands/list' />

            {/* 商品管理 */}
            <Redirect exact strict from='/views/admin/pm' to='/views/admin/pm/brands/list' />
            {/* 商品管理 - 品牌列表 */}
            <CustomRoutes { ...props } path='/views/admin/pm/brands/list' component={ BrandList } />
            {/* 商品管理 - 商品列表 */}
            <CustomRoutes { ...props } path='/views/admin/pm/products/list' component={ ProductList } />
            {/* 商品管理 - 图片列表 */}
            <CustomRoutes { ...props } path='/views/admin/pm/productsImg/list' component={ ImgList } />

            {/* 订单管理 */}
            <Redirect exact strict from='/views/admin/om' to='/views/admin/om/orders/list' />
            {/* 订单管理 - 订单列表 */}
            <CustomRoutes { ...props } path='/views/admin/om/orders/list' component={ OrdersList } />

            {/* 用户管理 */}
            <Redirect exact strict from='/views/admin/um' to='/views/admin/um/users/list' />
            {/* 用户管理 - 用户列表 */}
            <CustomRoutes { ...props } path='/views/admin/um/users/list' component={ UsersManageList } />

            {/* 评论管理 */}
            <Redirect exact strict from='/views/admin/cm' to='/views/admin/cm/comment/list' />
            {/* 评论管理 - 评论列表 */}
            <CustomRoutes { ...props } path='/views/admin/cm/comment/list' component={ CommentsManageList } />

        </Switch>
    );
};

export default Routes;