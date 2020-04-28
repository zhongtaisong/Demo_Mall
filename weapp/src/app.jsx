import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/mobx'
import { md5 } from '@utils'

import counterStore from './store/counter'
import './custom-variables.scss'
import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = {
  counterStore
}

Taro.getSystemInfo({
  success: res => {
    Taro.barHeight = res.statusBarHeight || 0;
    Taro.topHeight = (res.statusBarHeight || 0) + 42;
  }
})

Taro.Component.prototype.$md5 = md5;

class App extends Component {

  componentDidMount () {}

  config = {
    pages: [
      'pages/tabBar/home/index',
      'pages/tabBar/products/index',
      'pages/tabBar/myShoppingCart/index',
      'pages/tabBar/my/index'
    ],    
    subPackages: [
      {
        root: 'pages/components/',
        pages: [
          'login/index',
          'orderDetails/index',
          'register/index',
          'settlementPage/index',
          'myOrder/index',
          'myEvaluation/index',
          'myCollection/index',          
          'userCenter/index',
          'userCenter/components/info/index',
          'userCenter/components/password/index',
          'userCenter/components/address/index'
        ]
      },
      {
        root: 'pages/common/',
        pages: [
          'productsDetail/index',
          'searchModal/index'
        ]
      }
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTextStyle: 'black',
      navigationStyle: 'custom'
    },
    tabBar: {
      color: '#949494',
      selectedColor: '#1890ff',
      backgroundColor: '#fafafa',
      borderStyle: 'black',
      list: [
        {
            pagePath: 'pages/tabBar/home/index',
            iconPath: './img/tab_icon/home.png',
            selectedIconPath: './img/tab_icon/home_active.png',
            text: '首页'
        }, 
        {
            pagePath: 'pages/tabBar/products/index',
            iconPath: './img/tab_icon/products.png',
            selectedIconPath: './img/tab_icon/products_active.png',
            text: '杂货铺'
        }, 
        {
            pagePath: 'pages/tabBar/myShoppingCart/index',
            iconPath: './img/tab_icon/cart.png',
            selectedIconPath: './img/tab_icon/cart_active.png',
            text: '购物车'
        }, 
        {
            pagePath: 'pages/tabBar/my/index',
            iconPath: './img/tab_icon/my.png',
            selectedIconPath: './img/tab_icon/my_active.png',
            text: '我的'
        }
      ]
    },
    networkTimeout: {
      request: 6000
    }
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
