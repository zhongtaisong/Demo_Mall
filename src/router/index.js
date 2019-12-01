import Home from '@pages/Home';
import Products from '@pages/Products';
import ProductsDetail from '@pages/ProductsDetail';
import MyShoppingCart from '@pages/MyShoppingCart';
import SettlementPage from '@pages/SettlementPage';
import OrderDetails from '@pages/OrderDetails';
import MyCollection from '@pages/MyCollection';
import MyEvaluation from '@pages/MyEvaluation';
import MyOrder from '@pages/MyOrder';
import WebsiteDescription from '@pages/WebsiteDescription';
import UserCenter from '@pages/UserCenter';
import ResultPages from '@pages/ResultPages';
import Message from '@pages/Message';

// auth 登录权限
// noDirectAccess 禁止直接访问
export default [
    { 
        id: 0,
        path: '/views',
        redirect: '/views/home',
        title: '首页'
    },
    { 
        id: 1,
        path: '/views/home',
        name: 'Home',
        component: Home,
        title: '首页'
    },
    { 
        id: 2,
        path: '/views/products',
        name: 'Products',
        component: Products,
        title: '杂货铺'
    },
    { 
        id: 3,
        path: '/views/products/detail',
        name: 'ProductsDetail',
        component: ProductsDetail,
        title: '商品详情'
    },
    { 
        id: 4,
        path: '/views/products/cart',
        name: 'MyShoppingCart',
        component: MyShoppingCart,
        title: '我的购物车'
    },
    { 
        id: 5,
        path: '/views/products/cart/settlement',
        name: 'SettlementPage',
        component: SettlementPage,
        title: '结算页',
        noDirectAccess: true
    },
    { 
        id: 6,
        path: '/views/products/cart/orderDetails',
        name: 'OrderDetails',
        component: OrderDetails,
        title: '订单详情',
        noDirectAccess: true
    },
    { 
        id: 7,
        path: '/views/products/cart/evaluate',
        name: 'MyEvaluation',
        component: MyEvaluation,
        title: '我的评价',
        noDirectAccess: true
    },
    { 
        id: 8,
        path: '/views/products/collection',
        name: 'MyCollection',
        component: MyCollection,
        title: '我的收藏'
    },
    { 
        id: 9,
        path: '/views/products/order',
        name: 'MyOrder',
        component: MyOrder,
        title: '我的订单'
    },
    { 
        id: 10,
        path: '/views/web',
        name: 'WebsiteDescription',
        component: WebsiteDescription,
        title: '网站说明'
    },
    { 
        id: 11,
        path: '/views/user',
        name: 'UserCenter',
        component: UserCenter,
        title: '用户中心'
    },
    { 
        id: 12,
        path: '/views/message',
        name: 'Message',
        component: Message,
        title: '留言'
    },
    { 
        id: 99,
        path: '/views/401',
        name: 'ResultPages',
        component: ResultPages,
        title: '401无权限'
    }
];