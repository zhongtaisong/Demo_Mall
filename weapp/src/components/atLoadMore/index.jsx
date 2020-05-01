import Taro from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { View } from '@tarojs/components'
import { AtLoadMore } from 'taro-ui';

@observer
class Index extends Taro.Component {

    static options = {
      addGlobalClass: true
    }

    render() {
        return (
            <View className='dm_AtLoadMore'>
                <AtLoadMore {...this.props} 
                  moreBtnStyle={{
                    fontSize: '13Px'
                  }}
                  noMoreTextStyle={{
                    fontSize: '13Px'
                  }}
                />
            </View>
        );
    }
}

export default Index;