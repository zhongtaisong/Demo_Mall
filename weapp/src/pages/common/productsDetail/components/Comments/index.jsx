import Taro from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { AtIcon } from 'taro-ui'
// 设置
import { PUBLIC_URL } from '@config';
// 公共组件
import { AtList } from '@com';
// 数据
import state from './state';
// less样式
import './index.less';

// 商品评价
@observer
class Index extends Taro.Component {

    componentDidMount() {
      const { pid } = this.props;
      pid && state.selcommentsData({ pid });
    }

    // 商品评价 - 模态框
    toggleModal = () => {
      Taro.navigateTo({
        url: `/pages/common/commentModal/index?id=${this.props.pid}`
      })
    }

    render() {
        const { commentList } = state;
        return (
            <View className='ProductsDetail_Comment'>
                <AtList 
                  atListItem={[
                    { title: '评价', arrow: 'right', extraText: `共 ${commentList.length} 条`, onClick: commentList.length ? this.toggleModal : null }
                  ]}
                  className='comment_list'
                />
                {
                    commentList.length ? (
                        <View className='comment_content'>                                
                            {
                                commentList.slice(0, 2).map((item, index) => {
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
                            {
                                commentList.length > 2 ? (
                                    <View className='all_comment' 
                                      onClick={this.toggleModal}
                                    >
                                        查看全部评价
                                        <AtIcon value='chevron-right' size={18} />
                                    </View>
                                ) : ''
                            }
                        </View>
                    ) : (
                        <View className='no_comment'>暂无评价</View>
                    )
                }
            </View>
        );
    }
}

export default Index;