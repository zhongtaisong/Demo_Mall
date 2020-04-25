import Taro from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { View, Image } from '@tarojs/components'
// 设置
import { PUBLIC_URL } from '@config';
// 详情
@observer
class Pictures extends Taro.Component {
    render() {
        const { detailsPic=[] } = this.props;
        return (
            <View className='Products_Details'>
                {
                    detailsPic.map((item, index) => {
                        return (
                          <View style={{ textAlign: 'center' }} key={index}>
                            <Image mode='widthFix' src={PUBLIC_URL + item} style={{ width: '100%' }} />
                          </View>
                        );
                    })
                }
            </View>
        );
    }
}

export default Pictures;