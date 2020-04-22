import Taro from '@tarojs/taro'
import { observer, inject } from '@tarojs/mobx'
import { View, Text, Image } from '@tarojs/components'
// import { AtTag, AtList, AtListItem } from "taro-ui"
// 全局公共组件
import { SearchBar, NavBar, ProductList } from '@com';
// 全局公共方法
// import { session } from '@utils';
// 全局设置
import { PUBLIC_URL } from '@config';
// import AtList from './atList'
// 数据
import state from './state';
// 样式
import './index.less';
import { toJS } from 'mobx';
// ------------------------------------------ 杂货铺 ---------------------------------------//
@inject('counterStore')
@observer
class Index extends Taro.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            chkObj: {}
        };
    }

    async componentDidMount() {
        try {
            // this.props.setCancelText && this.props.setCancelText('筛选');
            // this.props.setIsShowLogo && this.props.setIsShowLogo(false);
            // this.props.setOnCancel && this.props.setOnCancel(this.onOpenChange);
            // const { state: ste } = this.props && this.props.location || {};
            // state.setCheckedObj(ste);
            // this.setState({
            //     chkObj: ste
            // });
        } catch (error) {
            console.log(error);
        }
        await state.productsData();
        state.filterData();
    }

    componentWillUnmount() {
        state.clearMobxData();
        try {
            // this.props.setCancelText && this.props.setCancelText();
            // this.props.setIsShowLogo && this.props.setIsShowLogo(false);
            // this.props.setOnCancel && this.props.setOnCancel();
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const { productList=[], filterList=[] } = state;
        const { open, chkObj={} } = this.state;
        // 查字典表
        // const { BRAND_LIST } = session.getItem('tableDic');

        return (
            <View className='dm_Products'>
              <NavBar {...this.props} title='杂货铺' />
              <SearchBar {...this.props} disabled />
              <View style={{paddingTop:`${Taro.topHeight+42}px`}}>
                  <ProductList products={toJS(productList)} isShowTag />
              </View>
            </View>
        );
    }
}

export default Index;