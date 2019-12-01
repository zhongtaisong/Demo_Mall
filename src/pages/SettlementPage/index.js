import React from 'react';
import { observer } from 'mobx-react';
import { Table, Row, Button, Typography, Col } from 'antd';
import { toJS } from 'mobx';
import moment from 'moment';
// 各种表头
import data from './data';
// 数据
import state from './state';
// less样式
import './index.less';

// 结算页
@observer
class SettlementPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource02: [],
            pNum: 0,
            totalPrice: 0.00,
            ids: []
        }
    }

    componentWillMount() {
        let productsInfo = sessionStorage.getItem('productsInfo') ? JSON.parse( sessionStorage.getItem('productsInfo') ) : [];
        let productsParams = sessionStorage.getItem('productsParams') ? JSON.parse( sessionStorage.getItem('productsParams') ) : {};
        let { size, total } = productsParams;
        if( !productsInfo.length || !Object.keys(productsParams).length ){
            this.props.history.goBack();
            return;
        }
        let ids = productsInfo.map(item => item.id);
        this.setState({
            dataSource02: productsInfo,
            ids
        })
        this.setState({
            pNum: size,
            totalPrice: total
        })
    }

    componentDidMount() {
        state.selAddressData();
    }

    // 选中行
    rowSelection = () => ({
        type: 'radio',
        onChange: (selectedRowKeys, selectedRows) => {
            selectedRows[0] && state.setConsigneeInfo( selectedRows[0] );
            state.setSelectedRowKeys( selectedRowKeys );
            state.setSelectedRows( selectedRows );
        },
        selectedRowKeys: toJS( state.selectedRowKeys )
    });

    // 提交订单
    handleSubmitOrders = async () => {
        let { dataSource02 } = this.state;
        let date = Date.now();
        dataSource02.map(item => {
            item['orderNum'] = `ZTS${date}`;
            item['orderStatus'] = 100;
            item['payTime'] = moment(date).format('YYYY-MM-DD HH:mm:ss');
        });
        let addorderData = {
            productsList: dataSource02,
            consigneeInfo: toJS( state.selectedRows )
        };
        let code;
        if( this.state.ids.includes(undefined) ){
            code = await state.addorderData(addorderData);
        }else{
            code = await state.delcartData(addorderData, this.state.ids);
        }
        if( code === 200 ){
            this.props.history.replace({
                pathname: '/views/products/cart/orderDetails',
                state: {
                    orderNum: `ZTS${date}`
                }
            });
        }
    }

    render() {
        const { dataSource01, consigneeInfo: { consignee, region, addressDetails, phone } } = state;
        const { columns01, columns02 } = data;
        const { pNum, totalPrice, dataSource02 } = this.state;
        return (
            <div className='common_width dm_SettlementPage'>
                <Row className='table_title'>
                    <Typography.Title level={ 4 }>结算页</Typography.Title>
                    <div></div>
                </Row>
                <Table 
                    rowSelection={ this.rowSelection() } 
                    columns={ columns01 } 
                    dataSource={ toJS( dataSource01 ) }
                    showHeader={ false }
                    pagination={ false }
                    rowKey={ (record) => record.id }
                />
                <Table 
                    columns={ columns02 } 
                    dataSource={ dataSource02 }
                    showHeader={ false }
                    pagination={ false }
                    rowKey={ (record) => record.id ? record.id : record.lid }
                />
                <Row className='pay_info'>
                    <Col span={ 24 }>
                        <i>{ pNum }</i> 件商品
                    </Col>
                    <Col span={ 24 }>
                        总金额：<i>￥{ totalPrice ? totalPrice.toFixed(2) : 0.00 }</i>
                    </Col>
                    <Col span={ 24 }>
                        应付金额：<i>￥{ totalPrice ? totalPrice.toFixed(2) : 0.00 }</i>
                    </Col>
                    <Col span={ 24 }>
                        寄送至：<i>{ consignee } { region } { addressDetails } { phone }</i>
                    </Col>
                </Row>
                <Row style={{ textAlign: 'right' }}>
                    <Button type='primary' onClick={ this.handleSubmitOrders }>提交订单</Button>
                </Row>
            </div>
        );
    }
}

export default SettlementPage;