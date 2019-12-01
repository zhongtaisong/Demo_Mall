import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { observer } from 'mobx-react';
import { BackTop, Spin } from 'antd';
import { toJS } from 'mobx';
// 公共组件
import { HeaderBar, FooterCopyright } from '@com';
// 全局设置
import { searchAreaState } from '@config';
// 各级页面路由
import Routes from '@router';
// 401、402、403、404
import ResultPages from '@pages/ResultPages';
// 搜索结果页面
import SearchResults from '@pages/SearchResults';
// 数据
import state from './state';
// 全局数据
import $state from '@store';

// 根页面
@observer
class Index extends React.Component {

    componentWillMount() {        
        this.props.history && state.setHistory( this.props.history );
    }

    componentDidMount() {
        state.oauthData();
    }

    componentWillReceiveProps() {
        state.oauthData();
    }

    render() {
        const { oauthCode, isLoading } = $state;
        const { isShowResultPage, searchResultList } = searchAreaState;
        return (
            <div>
                <BackTop style={{ right: '60px', bottom: '60px' }} />
                <HeaderBar {...this.props} />
                <Spin spinning={ isLoading } tip="Loading...">
                    {
                        !isShowResultPage ? (
                            <Switch>
                                {
                                    Routes && Routes[0] && Routes[0].path && Routes[0].redirect ? (
                                        <Redirect exact from={ Routes[0].path } to={ Routes[0].redirect } />
                                    ) : ''
                                }
                                {
                                    Routes.map(item => {
                                        return (
                                            <Route exact path={ item.path } key={ item.id }
                                                render={
                                                    props => {
                                                        let obj = {};
                                                        if( window.location.pathname == '/views/401' ){
                                                            obj = { 
                                                                status: '401', 
                                                                title: '401', 
                                                                subTitle: '很抱歉，尚未登录没有权限访问！', 
                                                                isSmallPage: true 
                                                            }
                                                        }
                                                        if( item.noDirectAccess && oauthCode == 401 ){
                                                            props.history.goBack();
                                                        }else{
                                                            return (<item.component {...props} {...obj} />);
                                                        }
                                                        return (<item.component {...props} {...obj} />);
                                                    }
                                                }
                                            />
                                        );
                                    })
                                }
                                {/* 所有错误路由跳转页面 */}
                                <Route component={ ResultPages } />
                            </Switch>
                        ) : (
                            <SearchResults 
                                {...this.props}
                                searchResultList={ toJS( searchResultList ) }
                            />
                        )
                    }
                </Spin>
                <FooterCopyright {...this.props} />
            </div>
        );
    }
}

export default Index;