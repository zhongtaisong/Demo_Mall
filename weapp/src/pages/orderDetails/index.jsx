import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { observer } from '@tarojs/mobx'
// 全局公共组件
import { OrderDetails, NavBar } from '@com';

// 订单详情
@observer
class Index extends Taro.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: null
        };
    }

    componentDidMount() {
        // const { state } = this.props.location || {};
        // state && state.id && this.setState({
        //     id: state.id
        // });
    }

    componentWillUnmount() {
    }

    render() {
        const { id } = this.state;
        if( id ){
            return (
                <View>
                    <NavBar {...this.props} title='订单详情' 
                      onClickLeftIcon={() => Taro.navigateBack()}
                    />
                    <View>订单详情订单详情订单详情订单详情订单详情订单详情订单详情订单详情</View>
                </View>
            );
        }else{
            return '';
        }
    }
}

export default Index;