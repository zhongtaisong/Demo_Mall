import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
// 设置
import { PUBLIC_URL } from '@config';
// less样式
import './index.less';

// 商品评价
@observer
class Index extends Taro.Component {
    render() {
        const { commentList=[] } = this.props;
        return (
            <View className='modal_Comment'>
                <View className='comment_content'>                                
                    {
                        commentList.map((item, index) => {
                            return (
                              <View key={index} className='content'>
                                <View className='top'>
                                  <View>
                                    <Image mode='heightFix' src={item.avatar ? PUBLIC_URL + item.avatar : ''} alt='avatar' />
                                    {item.uname}
                                  </View>
                                  <Text>{item.commentTime}</Text>
                                </View>
                                <View className='bottom'>{item.content}</View>
                              </View>
                            );
                        })
                    }
                </View>
            </View>
        );
    }
}

export default Index;