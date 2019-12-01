import React, { Fragment } from 'react';
import { observer } from 'mobx-react';
import { Result, Button } from 'antd';
// 全局数据
import $state from '@store';
// less样式
import './index.less';

// 401、402、403、404等页面
@observer
class ResultPages extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            status: this.props.status || '404',
            title: this.props.title || '404',
            subTitle: this.props.subTitle || '很抱歉，没找到页面！'
        }
    }

    // 跳转到目标页面
    goTargetPage = (that) => {
        if( that == 'home' ){
            this.props.history.replace('/');
        }else if( that == 'login' ){
            this.props.history.replace('/login');
        }
    }

    render() {
        const { oauthCode } = $state;
        let { status, title, subTitle } = this.state;
        status = status === '401' ? '403' : status;
        const { isSmallPage } = this.props;
        return (
            <Result
                status={ status }
                title={ title }
                subTitle={ subTitle }
                extra={
                    <Fragment>
                        <Button type="primary" onClick={ this.goTargetPage.bind(this, 'home') }>前往首页</Button>
                        {
                            oauthCode != 200 ? (
                                <Button type="primary" onClick={ this.goTargetPage.bind(this, 'login') }>前往登录</Button>
                            ) : ''
                        }
                    </Fragment>
                }
                className={`dm_ResultPages${ isSmallPage ? ' smallPage' : '' }`}
            />
        );
    }
}

export default ResultPages;