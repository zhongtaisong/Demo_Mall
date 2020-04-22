import Taro from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { View } from '@tarojs/components'
import { AtSearchBar } from 'taro-ui'
import './index.less';
// ------------------------------------------- 搜索栏 ---------------------------------- //
@observer
class Index extends Taro.Component {

    toggleModal = () => {
      Taro.navigateTo({
        url: '/components/modal/index'
      })
    }

    render() {
      const { disabled=false, placeholder='搜索商品', isHideBtn=false } = this.props;
      if(disabled) {
          return (       
            <View className='dm_AtSearchBar'
              onClick={this.toggleModal}
              style={{
                width: '100%',
                position: 'fixed',
                left: 0,
                top: `${Taro.topHeight}px`,
                zIndex: 999
              }} 
            >
              <AtSearchBar
                placeholder={placeholder}
                disabled
              />
            </View>
          );
      }
      return (
        <AtSearchBar
          placeholder={placeholder}
          className={!isHideBtn ? '' : 'AtSearchBar_hideBtn'}
        />
      );
    }
}

export default Index;