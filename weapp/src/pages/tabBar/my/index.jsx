import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
// 全局设置
import { PUBLIC_URL } from '@config';
// 全局公共组件
import { AtList } from '@com';
// 静态数据
import data from './data';
// 数据
import state from './state';
// 样式
import './index.less';
// ------------------------------------------ 我的 ---------------------------------------//
@observer
class Index extends Taro.Component {

    componentDidMount() {
      state.selectUserInfoData();
    }

    componentWillUnmount() {
      state.clearMobxData();
    }

    // 跳转到目标页面
    intoTargetPage = () => {
      state.logoutData();
    }

    render() {
        const { unameInfo={} } = state;
        return (
            <View className='dm_My'>
                <View className='avatar_info'>
                    <View className='avatar'>
                        <Image src={unameInfo.avatar ? PUBLIC_URL + unameInfo.avatar : require('@img/logo.png')} alt='avatar' />
                    </View>
                    <Text>{ unameInfo.nickName }</Text>
                </View>
                <View className='dm_My_main_content'>
                    <AtList 
                      atListItem={data}
                    />
                    <AtList 
                      atListItem={[
                        { title: '退出登录', arrow: 'right', thumb: require('@img/svg/logout.svg'), onClick: this.intoTargetPage.bind(this, 'logout') }
                      ]}
                    />
                </View>
            </View>
        );
    }
}

export default Index;