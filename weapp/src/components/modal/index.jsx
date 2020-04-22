import Taro from '@tarojs/taro'
import { observer } from '@tarojs/mobx'
import { View } from '@tarojs/components'
import { toJS } from 'mobx';
// 公共组件
import { NavBar } from '@com';
// 评论 - 组件
import Comments from './components/comment'
// mobx数据
import state from './state'
// ------------------------------------------- 模态框 ---------------------------------- //
@observer
class Index extends Taro.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: null,
      type: null
    }
  }

  componentDidMount() {
    console.log('111111111111', this.$router.params)
    try{
      const { id, type } = this.$router.params || {};
      this.setState({ id, type });
      if( id ) {
        if(type == 'comment' ) {          
          state.selcommentsData({ pid: id })
        }
      }
    }catch(err) {
      console.log(err);
    }
  }

  onClickLeftIcon = () => {
    Taro.navigateBack()
  }

  render() {
    const { type } = this.state;
    const { commentList=[] } = state;
      return (
        <View className='dm_modal'>
            <NavBar {...this.props} isShowSearchBar={type == 'comment' ? false : true} leftIconType='chevron-left' 
              title={type == 'comment' ? '商品评价' : ''}
              onClickLeftIcon={this.onClickLeftIcon}
            />
            <View 
              style={{paddingTop:`${Taro.topHeight}px`}}
            >
              {
                type == 'comment' && <Comments {...this.props} commentList={toJS(commentList)} />
              }
            </View>
        </View>
      );
  }
}

export default Index;