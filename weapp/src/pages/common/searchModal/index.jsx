import Taro from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { View } from '@tarojs/components'
import { toJS } from 'mobx';
// 公共组件
import { NavBar, ProductList } from '@com';
// mobx数据
import state from './state'
// less样式
import './index.less'
// ------------------------------------------- 模态框 ---------------------------------- //
@observer
class Index extends Taro.Component {

  componentWillUnmount() {
    state.setSearchResultList();
  }

  onClickLeftIcon = () => {
    Taro.navigateBack()
  }

  // 获取搜索关键字
  getKwChange = (e) => {
    const { value } = (e && e.detail) || {}
    if( value && value.trim() ) {
      state.kwData(value.trim());
    }
  }

  render() {
    const { searchResultList } = state;
    return (
      <View className='dm_modal'>
          <NavBar {...this.props} isShowSearchBar leftIconType='chevron-left' 
            onClickLeftIcon={this.onClickLeftIcon}
            onBlur={this.getKwChange}
            isHideBtn
            focus
          />
          <View 
            style={{padding:`${Taro.topHeight}px 10Px 0`}}
          >
            <ProductList products={toJS(searchResultList)} isShowTag />
          </View>
      </View>
    );
  }
}

export default Index;