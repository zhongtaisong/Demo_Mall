import Taro from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { AtGrid } from "taro-ui"
import { View } from '@tarojs/components'
// 静态数据
import gridList from './data';
// less样式
import './index.less';

// 宫格列表
@observer
class Index extends Taro.Component {
    render() {
        return (
          <View className='dm_GridList'>
            <AtGrid columnNum={5} hasBorder={false} data={gridList} />
          </View>
        );
    }
}

export default Index;