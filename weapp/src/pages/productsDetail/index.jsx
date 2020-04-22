import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { toJS } from 'mobx'
import { AtBadge } from 'taro-ui'
// 公共组件
import { NavBar } from '@com';
// 商品
import Products from './components/Products';
// 详情
import Details from './components/Details';
// 评价
import Comments from './components/Comments';
// 全局设置
import { footerCopyrightState } from '@config';
// 数据
import state from './state';
// 全局数据
import $state from '@store';
// 样式
import './index.less';

// 商品详情
@observer
class Index extends Taro.Component {

    constructor(props) {
        super(props);
        this.state = {
            num: 1
        };
    }

    componentDidMount() {
        const { id=28 } = this.$router.params || {};
        id && state.selectProductsDetailData({id});
    }

    componentWillUnmount() {
      state.clearMobxData();
    }

    // 加入购物车
    handleAddCart = () => {
        const { basicInfo={} } = state;
        if( basicInfo ){
            state.addcartData([{
                pid: basicInfo.id,
                num: this.state.num,
                totalprice: basicInfo.price ? Number(basicInfo.price) * this.state.num : basicInfo.price
            }]);
        }
    }

    // 立即购买
    immediatePurchase = () => {
        let { basicInfo={} } = state;
        const { id } = basicInfo;
        id && this.props.history.push({
            pathname: '/views/products/cart/settlement',
            state: {
                id: [id],
                num: this.state.num,
                type: 'detail'
            }
        });
    }

    // 数量
    watchNumber = (value) => {
        this.setState(() => ({
            num: value
        }));
    }

    // 选择规格
    handleToggleSpecs = (id) => {
      if(id) {
        return new Promise((resolve, reject) => {
          state.selectProductsDetailData({id}).then((code) => {
            resolve(code);
          }).catch((err) => {
            reject(err);
          })
        })
      }
    }

    render() {
        const { basicInfo, imgList, specs, params, detailsPic } = state;
        const { oauthCode } = $state;
        return (
            <View className='dm_ProductsDetail'>
                <NavBar {...this.props} leftIconType='chevron-left' 
                  onClickLeftIcon={() => Taro.navigateBack()}
                />
                <View className='main_content'>
                    <Products 
                      {...this.props}
                      basicInfo={toJS(basicInfo) || {}}
                      imgList={toJS(imgList) || []}
                      specs={toJS(specs) || []}
                      watchNumber={this.watchNumber}
                      num={this.state.num}
                      onHandleToggleSpecs={this.handleToggleSpecs}
                    />
                    <View className='line'></View>
                    {
                      params.id && (
                        <Comments
                          {...this.props}
                          pid={params.id || ''}
                        />
                      )
                    }
                    <View className='line'></View>
                    <Details 
                      {...this.props}
                      detailsPic={toJS(detailsPic) || []}
                    />
                </View>
                {
                    oauthCode && oauthCode == 200 ? (
                      <View className='bottom_tab_btns'>
                          <View className='cart'>
                            <AtBadge value={10} maxValue={99}>
                              <Image mode='aspectFit' src={require('@img/svg/cart.svg')} />
                            </AtBadge>
                          </View>
                          <Text className='btn btn01' onClick={this.handleAddCart}>加入购物车</Text>
                          <Text className='btn btn02' onClick={this.immediatePurchase}>立即购买</Text>
                      </View>
                    ) : ''
                }
            </View>
        );
    }
}

export default Index;