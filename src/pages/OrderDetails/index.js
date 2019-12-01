import React from 'react';
import { observer } from 'mobx-react';
import { Table, Row, Col, Typography } from 'antd';
import { toJS } from 'mobx';

// 各种表头
import data from './data';
// 数据
import state from './state';
// less样式
import './index.less';

// 订单详情
@observer
class OrderDetails extends React.Component {

    componentWillMount() {
        sessionStorage.removeItem('productsInfo');
        sessionStorage.removeItem('productsParams');
    }

    componentDidMount() {
        const { orderNum, id } = this.props.location.state || {};
        if( !this.props.location.state ){
            this.props.history.goBack();
            return;
        }
        orderNum && state.selOrderLidData( orderNum, id );
    }

    render() {
        const { columns02 } = data;
        const { 
            dataSource02, 
            consignees: { consignee, region, addressDetails, phone }, 
            paymentInfo,
            paymentInfo: { payTime, orderNum } 
        } = state;
        let totalPrice = toJS( paymentInfo.totalPrice ) || 0;
        return (
            <div className='common_width dm_OrderDetails'>
                <Row className='table_title'>
                    <Typography.Title level={ 4 }>订单详情</Typography.Title>
                    <div>订单号：<i>{ orderNum }</i></div>
                </Row>
                <Row style={{ borderTop: '1px solid #E8E8E8' }}>
                    <Table 
                        columns={ columns02 } 
                        dataSource={ toJS( dataSource02 ) }
                        showHeader={ false }
                        pagination={ false }
                        rowKey={ (record) => record.id }
                    />
                </Row>
                <Row className='orider_details'>
                    <Col span={ 12 }>
                        <dl>
                            <dt>收货人信息</dt>
                            <dd>
                                <div>收货人：</div>
                                <p>{ consignee }</p>
                            </dd>
                            <dd>
                                <div>所在地区：</div>
                                <p>{ region }</p>
                            </dd>
                            <dd>
                                <div>详情地址：</div>
                                <p>{ addressDetails }</p>
                            </dd>
                            <dd>
                                <div>联系电话：</div>
                                <p>{ phone }</p>
                            </dd>
                        </dl>
                    </Col>
                    <Col span={ 12 }>
                        <dl>
                            <dt>付款信息</dt>
                            <dd>
                                <div>付款时间：</div>
                                <p>{ payTime }</p>
                            </dd>
                            <dd>
                                <div>商品总额：</div>
                                <p>￥{ totalPrice.toFixed(2) }</p>
                            </dd>
                            <dd>
                                <div>应支付金额：</div>
                                <p>￥{ totalPrice.toFixed(2) }</p>
                            </dd>
                        </dl>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default OrderDetails;