import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { toJS } from 'mobx'
// 全局公共方法
import { session } from '@utils';
// 全局设置
import { PUBLIC_URL } from '@config';
// 全局公共组件
import { NavBar, AtList, ProductList } from '@com';
// 数据
import state from './state';
// less样式
import './index.less';

// 结算页
@observer
class SettlementPage extends Taro.Component {

    constructor(props) {
        super(props);
        this.state = {
            pid: [13],
            visible: false
        };
    }

    componentDidMount() {
        // const { state: ste } = this.props.location || {};
        state.settlementData([13], 'cart', 1);
        // if( ste && ste.id && ste.type ){
        //     state.settlementData(ste.id, ste.type, ste.num);
        //     this.setState({
        //         pid: ste.id
        //     });
        // }
    }

    componentWillUnmount() {
        state.clearMobxData();
    }

    // 提交订单
    handleSubmitOrders = async () => {
        let { selectAddress, num, totalprice, nums } = state;
        const orderId = await state.addorderData({
            uname: session.getItem('uname'), 
            pid: this.state.pid, 
            aid: selectAddress.id,
            num,
            totalprice,
            nums
        });
        if( orderId ){
            Taro.navigateTo({
              url: `pages/orderDetails/index?id=${orderId}`
            })
        }
        // else{
        //     window.Toast('fail', '订单主键orderId不能为空！');
        // }
    }

    // 切换模态框
    toggleModal = () => {
        // this.setState(({ visible }) => ({
        //     visible: !visible
        // }));
    }

    // 更过收货地址
    moreAddress = () => {
      Taro.navigateTo({
        url: '/pages/settlementPage/components/modal/index'
      })
    }

    render() {
        let { dataSource02, selectAddress={}, dataSource01, setSelectAddress, num, totalprice } = state;
        const { visible } = this.state;
        return (
            <View className='dm_SettlementPage'>
                <NavBar {...this.props} title='结算页' 
                  onClickLeftIcon={() => Taro.navigateBack()}
                />
                {/* <View className='address'>
                    <List>
                        <List.Item arrow="horizontal" multipleLine 
                            activeStyle={{ background: '#f0f0f0' }}
                            onClick={ this.toggleModal }
                        >
                            <View className='address_info'>
                                <Text>{ selectAddress.name }</Text>
                                <Text>{ selectAddress.phone ? selectAddress.phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3') : selectAddress.phone }</Text>
                            </View>
                            <List.Item.Brief>{ `${selectAddress.region} ${selectAddress.detail}` }</List.Item.Brief>
                        </List.Item>
                    </List>
                </View> */}
                <View style={{
                    padding:`${Taro.topHeight}px 10Px 50Px`
                  }}
                >
                    <AtList 
                      atListItem={[
                        { title: `${selectAddress.name || ''} ${selectAddress.phone ? selectAddress.phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3') : selectAddress.phone}`, note: `${selectAddress.region || ''} ${selectAddress.detail || ''}`, arrow: 'right', onClick: this.moreAddress }
                      ]}
                      className='address'
                    />
                    <ProductList 
                      products={dataSource02} 
                      isShowSpecOther isShowAtSwipeAction={false}
                    />
                    <AtList 
                      atListItem={[
                        { title: '商品总数：', extraText: `${num} 件` },
                        { title: '商品金额', extraText: `￥${totalprice ? Number(totalprice).toFixed(2) : 0}` },
                      ]}
                      className='info'
                    />
                    <View className='bottom_tab_btns'>
                        <View>
                            <Text>￥</Text>
                            { totalprice ? Number(totalprice).toFixed(2) : 0 }
                        </View>
                        <View onClick={this.handleSubmitOrders}>提交订单</View>
                    </View>
                    {/* <Modal 
                        visible={ visible }
                        navBar={                        
                            <NavBar {...this.props} title='收货地址'
                                onLeftClick={ this.toggleModal }
                            />
                        }
                        children={                        
                            <View className='dm_SettlementPage_main_content' style={{ height: '100%', overflow: 'scroll' }}>
                                <List>
                                    {
                                        dataSource01.map((item, index) => {
                                            return (
                                                <List.Item multipleLine key={ index }
                                                    onClick={ () => {
                                                        state.setSelectAddress(item);
                                                        this.toggleModal();
                                                    } }
                                                >
                                                    <View className='address_info'>
                                                        <Text>{ item.name }</Text>
                                                        <Text>{ item.phone ? item.phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1****$3') : item.phone }</Text>
                                                    </View>
                                                    <List.Item.Brief>
                                                        {
                                                            item.isDefault == 1 ? (
                                                                <Text>默认</Text>
                                                            ) : ''
                                                        }
                                                        {`${ item.region }${ item.detail }`}
                                                    </List.Item.Brief>
                                                </List.Item>
                                            );
                                        })
                                    }
                                </List>
                            </View>
                        }
                    /> */}
                </View>
            </View>
        );
    }
}

export default SettlementPage;