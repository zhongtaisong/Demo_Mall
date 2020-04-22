import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { AtToast } from 'taro-ui'

@observer
class Index extends Taro.Component {
    render() {
        return (
            <View className='dm_actionSheet'>
                <AtToast {...this.props} />
            </View>
        );
    }
}

export default Index;