import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
import { AtList, AtListItem } from 'taro-ui'

@observer
class Index extends Taro.Component {

    static options = {
      addGlobalClass: true
    }

    render() {
        const { atListItem=[], className, isCustom=false, title } = this.props;
        return (
            <View className={`dm_AtList ${className || ''}`}>
                {
                  !isCustom ? (
                    <AtList hasBorder={false} className='atList atList_border atList_width'>
                        {
                          atListItem.map((item, index) => {
                            return (
                              <AtListItem key={index} {...item} hasBorder={false} />
                            );
                          })
                        }
                    </AtList>
                  ) : (
                    <View className='dm_custom_AtList'>
                        <View className='left'>{title}</View>
                        <View className='right'>{this.props.renderExtraChildren}</View>
                    </View>
                  )
                }
            </View>
        );
    }
}

export default Index;