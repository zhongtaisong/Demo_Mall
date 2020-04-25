import Taro from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
// 全局公共组件
import { ProductList, NavBar, AtButton } from '@com';
// 数据
import state from './state';
// 样式
import './index.less';
// ------------------------------------------ 我的订单 ---------------------------------------//
@observer
class Index extends Taro.Component {

    constructor(props) {
      super(props);
      this.state = {
        visible: false
      }
    }

    componentDidMount() {
        state.selOrdersData();
    }

    componentWillUnmount() {
      state.clearMobxData();
    }

    // 删除订单 / 评价
    handleOrderBtn = (_this, id) => {
      if(id) {
        switch(_this) {
          case 'comment':
            state.detailOrdersData({ id });
            this.setState({
              visible: true
            })
            break;
          case 'delete':
            state.deleteOrderData({ id });
            break;
        }
      }else{
        Taro.showToast({
          title: '订单id不能为空！',
          icon: 'none'
        })
      }
    }

    onClickLeftIcon = (visible) => {
      if(!visible) {
        Taro.navigateBack();
      }else{
        this.setState({
          visible: false
        })
      }
    }

    handleComment = (id='') => {
      Taro.navigateTo({
        url: `/pages/components/myEvaluation/index?id=${id}`
      })
    }

    render() {
        const { dataSource=[], dataSource02=[] } = state;
        const { visible } = this.state;
        return (
            <View className='dm_MyOrder'>
                <NavBar {...this.props} title={!visible ? '我的订单' : '订单中心'} leftIconType='chevron-left'
                  onClickLeftIcon={this.onClickLeftIcon.bind(this, visible)}
                />
                <View style={{
                    padding:`${Taro.topHeight}px 10Px 50Px`
                  }}
                >
                  {
                    !visible ? (
                      <View>                        
                          {
                            dataSource.map((item, index) => {
                              let num = item.content.reduce((total, current) => {
                                return total + current.num;
                              }, 0);
                              let totalprice = item.content.reduce((total, current) => {
                                return total + current.totalprice;
                              }, 0);
                              return (
                                <View key={index} className='dm_MyOrder_content'>
                                    <View onClick={() => Taro.navigateTo({
                                        url: `/pages/components/orderDetails/index?id=${item.id}`
                                      })}
                                    >
                                      <ProductList
                                        products={item.content || []} 
                                        isShowSpecOther isShowAtSwipeAction={false}
                                        isShowNumx
                                      />
                                    </View>
                                    <View className='bottom_btns'>
                                        <View className='p_info'>
                                          <Text>共 {num} 件商品</Text>
                                          <View>
                                            <Text>合计：</Text>
                                            <Text>￥</Text>
                                            <Text>{totalprice ? Number(totalprice).toFixed(2) : 0}</Text>
                                          </View>
                                        </View>
                                        <View className='btns'>
                                          <AtButton type='secondary' inline size='small'
                                            onClick={() => {
                                              this.handleOrderBtn('delete', item.id)
                                            }}
                                          >删除订单</AtButton>
                                          <AtButton type='primary' inline size='small'
                                            onClick={() => {
                                              this.handleOrderBtn('comment', item.id)
                                            }}
                                          >评价</AtButton>
                                        </View>
                                    </View>
                                </View>
                              );
                            })
                          }
                      </View>
                    ) : (
                      <View>
                        {
                          dataSource02.map((item, index) => {
                            return (
                              <ProductList key={index}
                                products={[item]} 
                                isShowSpecOther isShowAtSwipeAction={false}
                                isShowNumx
                                renderContent={
                                  <View className='comment_btn'>
                                    <AtButton type='secondary' inline size='small' onClick={this.handleComment.bind(this, item.id)}>评价</AtButton>                            
                                  </View>
                                }
                              />
                            );
                          })
                        }
                      </View>
                    )
                  }
                </View>
            </View>
        );
    }
}

export default Index;