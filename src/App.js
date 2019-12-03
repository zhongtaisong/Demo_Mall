import React from 'react';
import { observer } from 'mobx-react';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
// 全局公共方法
import { ScrollToTop } from '@utils';
// 首页
import Index from '@pages/Index';
// 登录
import Login from '@pages/Login';
// 注册
import Register from '@pages/Register';
// Demo_Mall后台管理系统
import Admin from '@pages/Admin';
// 401、402、403、404
import ResultPages from '@pages/ResultPages';

// App
@observer
class App extends React.Component {
    render() {
        return (
            <div className='dm_App'>
                <Router>
                    <ScrollToTop>
                        <Switch>
                            <Redirect exact strict from='/' to='/views' />
                            <Route path='/views' component={ Index } />
                            <Route path='/login' component={ Login } />
                            <Route path='/register' component={ Register } />
                            <Route path='/admin' component={ Admin } />
                            {/* 所有错误路由跳转页面 */}
                            <Route component={ ResultPages } />
                        </Switch>
                    </ScrollToTop>
                </Router>
            </div>
        );
    }
}

export default App;