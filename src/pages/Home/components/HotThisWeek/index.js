import React from 'react';
import { Row, Tooltip, Card } from 'antd';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import Slider from "react-slick";
// url前缀
import { PUBLIC_URL } from '@config';
// 数据
import state from './state';
// less样式
import './index.less';
const { Meta } = Card;

// 首页推荐
@observer
class HotThisWeek extends React.Component {

    // 跳转到详情页
    watchProductDetails = (lid) => {
        this.props.history.push({
            pathname: '/views/products/detail',
            state: {
                lid
            }
        })
    }

    render() {
        const { productsList } = state;
        const settings = {
            dots: false,
            infinite: false,
            speed: 300,
            slidesToScroll: 1,
            slidesToShow: 5
        };
        return (
            <div className='dm_HotThisWeek'>
                <Row className='title'>本周热门</Row>
                <div className='common_width'>
                    <Row className='hot_content'>
                        {
                            toJS( productsList ).length ? (
                                <Slider {...settings}>
                                    {
                                        toJS( productsList ).map( item => {
                                            let price = parseFloat(item.price) && parseFloat(item.price).toFixed(2);
                                            return (
                                                <Card
                                                    key={ item.pid }
                                                    hoverable
                                                    cover={<img alt="example" src={ PUBLIC_URL + item.pic } alt={ item.title } />}
                                                >
                                                    <Meta title={ 
                                                        <Tooltip title={ item.title }>{ item.title }</Tooltip>
                                                    } description={ <div>
                                                        <Tooltip className='detials' title={ item.details }>{ item.details }</Tooltip>
                                                        <span className='price'>￥{ price }</span>
                                                    </div> }                                                         
                                                        onClick={ this.watchProductDetails.bind(this, item.lid) }
                                                    />
                                                </Card>
                                            );
                                        } )
                                    }
                                </Slider>
                            ) : ''
                        }
                    </Row>
                </div>
            </div>
        );
    }
}

export default HotThisWeek;