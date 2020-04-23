import Taro from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { View } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui'
// 公共组件
import { NavBar } from '@com';
// mobx数据
import state from './state'
// ------------------------------------------- 模态框 ---------------------------------- //
@observer
class Index extends Taro.Component {

  componentDidMount() {
    state.selAddressData();
  }

  onClick = (obj={}) => {
    console.log('1111111111', obj)
  }

  render() {
    const { dataSource } = state;
    return (
      <View>
          <NavBar {...this.props} title='收货地址' 
            onClickLeftIcon={() => Taro.navigateBack()}
          />
          <View 
            style={{paddingTop:`${Taro.topHeight}px`}}
          >
            <AtList>
              {
                dataSource.map((item, index) => {
                  return (
                    <AtListItem key={index}
                      title={item.name}
                      note={`${item.region || ''}${item.detail || ''}`}
                      onClick={this.onClick.bind(this, item)}
                    ></AtListItem>
                  );
                })
              }
            </AtList>
          </View>
      </View>
    );
  }
}

export default Index;