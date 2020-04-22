import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtTag, AtIcon  } from 'taro-ui'
import './index.less'

class Index extends Taro.Component {
    render() {
        const { mode, icon, title, rightContent, className } = this.props;
        return (
            <View className='dm_atList'>
              <Image src='' />
              <View className='content'>
                <Text className='title'>闹钟太松了</Text>
                <View className='tag'>
                  <AtTag>标签1</AtTag>
                  <AtTag>标签2</AtTag>
                  <AtTag>标签3</AtTag>
                </View>
                <View className='price'>
                  <Text>￥</Text>
                  99999.00
                </View>
              </View>
              <View className='content'>
                <Text className='title'>闹钟太松了</Text>
                <View className='tag'>
                  <AtTag>标签1</AtTag>
                  <AtTag>标签2</AtTag>
                  <AtTag>标签3</AtTag>
                </View>
                <View className='price'>
                  <AtIcon value='chevron-right' />
                </View>
              </View>
            </View>
        );
    }
}

export default Index;