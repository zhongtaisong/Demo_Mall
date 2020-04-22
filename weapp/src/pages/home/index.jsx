import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { toJS } from 'mobx'
// 公共组件
import { SearchBar, NavBar } from '@com';
// banner
import CarouselBox from './components/CarouselBox';
// // 首页推荐
import Recommend from './components/Recommend';
// // 宫格列表
import GridList from './components/GridList';
// // 本周热门
import HotThisWeek from './components/HotThisWeek';
// 数据
import state from './state';
// 全局数据
// import $state from '@store';

// 首页
@inject('counterStore')
@observer
class Home extends Taro.Component {

    componentDidMount() {
        state.productsListData();
        state.imgCarouselData();
        state.productsListData();
        state.hotListData();
        try {
            this.commonFc(this.props);
            // this.props.setIsShowLogo && this.props.setIsShowLogo(true);
        } catch (error) {
            console.log(error);
        }
    }

    componentWillReceiveProps(nextProps) {
        this.commonFc(nextProps);
    }

    componentWillUnmount() {
        try {
            // this.props.setCancelText && this.props.setCancelText();
            // this.props.setIsShowLogo && this.props.setIsShowLogo(false);
            // this.props.setOnCancel && this.props.setOnCancel();
        } catch (error) {
            console.log(error);
        }
    }

    // message
    onMessage = () => {
        // window.Toast('info', '暂未开放');
    }

    commonFc = (props) => {
        const { code, setCancelText, setOnCancel } = props || {};
        if (code == 200) {
            setCancelText && setCancelText('留言');
            setOnCancel && setOnCancel(this.onMessage);
        } else {
            setCancelText && setCancelText('登录');
            setOnCancel && setOnCancel(this.onCancel);
        }
    }

    onCancel = () => {
        // this.props.history.push('/login');
    }

    render() {
        const { carouselList = [], productsList = [], hotList=[] } = state;
        return (
            <View className='dm_Home'>
                <NavBar {...this.props} title='首页' />
                <SearchBar {...this.props} disabled />
                <View style={{paddingTop:`${Taro.topHeight+42}px`}}>
                  {carouselList.length && <CarouselBox {...this.props} carouselList={toJS(carouselList)} />}
                  {productsList.length && <Recommend {...this.props} productsList={toJS(productsList)} />}
                  <GridList {...this.props} />
                  {hotList.length && <HotThisWeek {...this.props} hotList={toJS(hotList)} />}
                </View>
            </View>
        );
    }
}

export default Home;