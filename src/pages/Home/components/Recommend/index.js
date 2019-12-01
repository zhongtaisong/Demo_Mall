import React from 'react';
import { Row, Col } from 'antd';
import { observer } from "mobx-react";
import { toJS } from "mobx";

// url前缀
import { PUBLIC_URL } from '@config';

// 本周热门 - 数据
import hotThisWeekState from './../HotThisWeek/state';

// less样式
import './index.less';

// 首页推荐
@observer
class Recommend extends React.Component {

    // 跳转到商品详情
    watchProductDetails = (lid) => {
        this.props.history.push({
            pathname: '/views/products/detail',
            state: {
                lid
            }
        })
    }

    render() {
      const { productsList } = hotThisWeekState;
        return (
            <Row className='dm_recommend'>
                {
                    toJS( productsList ).slice(3).map(item => {
                        let [t1, t2] = item.title && item.title.split(' ') || [];
                        return (
                            <Col span={ 8 } key={ item.pid } onClick={ this.watchProductDetails.bind(this, item.lid) }>
                                <img src={  PUBLIC_URL + item.pic } draggable="false" />
                                <div>
                                    <div>{ t1 }</div>
                                    <div>{ t2 }</div>
                                    <p>{ item.details }</p>
                                </div>
                            </Col>
                        );
                    })
                }
            </Row>
        );
    }
}

export default Recommend;