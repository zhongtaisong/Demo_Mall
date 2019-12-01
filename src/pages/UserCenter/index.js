import React from 'react';
import { Tabs, Typography, Row } from 'antd';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
// 个人信息
import PersonalInformation from './components/PersonalInformation';
// 修改登录密码
import LoginPassword from './components/LoginPassword';
// 用户头像
import HeadPhoto from './components/HeadPhoto';
// 收货地址
import ReceivingAddress from './components/ReceivingAddress';
// 数据
import state from './state';
// less样式
import './index.less';
const { TabPane } = Tabs;

// 用户中心
@observer
class UserCenter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            key: 1
        }
    }

    componentDidMount() {
        state.pInfoData();
    }
    
    // 监听tab
    onChange = (key) => {
        this.setState(() => ({
            key
        }))
    }

    render() {
        return (
            <div className='common_width dm_UserCenter'>
                <Row className='table_title'>
                    <Typography.Title level={ 4 }>用户中心</Typography.Title>
                    <div></div>
                </Row>
                <Tabs tabPosition='left' onChange={ this.onChange }>
                    <TabPane tab="个人信息" key="1">
                        {
                            this.state.key == 1 ? (
                                <PersonalInformation 
                                    personalInformation={ toJS( state.personalInformation ) } 
                                    setPersonalInformation01={ state.setPersonalInformation01 }
                                />
                            ) : ''
                        }
                    </TabPane>
                    <TabPane tab="修改登录密码" key="2">
                        {
                            this.state.key == 2 ? (
                                <LoginPassword 
                                    {...this.props}
                                    loginPassword={ toJS( state.loginPassword ) }
                                    setLoginPassword01={ state.setLoginPassword01 }
                                />
                            ) : ''
                        }
                    </TabPane>
                    <TabPane tab="上传头像" key="3">
                        {
                            this.state.key == 3 ? (
                                <HeadPhoto />
                            ) : ''
                        }
                    </TabPane>
                    <TabPane tab="收货地址" key="4">
                        {
                            this.state.key == 4 ? (
                                <ReceivingAddress />
                            ) : ''
                        }
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

export default UserCenter;