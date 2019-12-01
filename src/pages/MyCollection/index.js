import React from 'react';
import { observer } from 'mobx-react';
import { Table, Typography, Row, Col, message, Button } from 'antd';

// 各种表头
import { columns } from './data';
// 数据
import state from './state';
// less样式
import './index.less';

// 我的收藏
@observer
class MyCollection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            selectedRows: []
        }
    }

    componentDidMount() {
        state.selcolsListData();
    }

    // 选中行
    rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            this.setState(() => ({
                selectedRowKeys,
                selectedRows
            }))
        }
    };

    // 表格底部
    footer = () => {
        return (
            <Row>
                <Col span={ 12 } className='left'>
                    <Button onClick={ this.handleCancelCollection }>取消收藏选中的商品</Button>
                    <Button onClick={ this.handleCollectionProduct }>加入购物车</Button>
                </Col>
                <Col span={ 12 } className='right'>
                    <span className='num'>已选择<i>{ this.state.selectedRowKeys.length }</i>件商品</span>
                </Col>
            </Row>
        );
    }

    // 取消收藏选中的商品
    handleCancelCollection = () => {
        const { selectedRowKeys } = this.state;
        if( selectedRowKeys.length ){
            state.delcolsData( selectedRowKeys );
        }else{
            message.warning('请选择需要取消收藏的商品！');
        }
    }

    // 加入购物车
    handleCollectionProduct = () => {
        const { selectedRowKeys, selectedRows } = this.state;
        if( selectedRowKeys.length && selectedRows.length ){
            state.addcartData( selectedRowKeys, selectedRows );
        }else{
            message.warning('请选择需要加入购物车的商品！');
        }
    }

    render() {
        const { dataSource } = state;
        return (
            <div className='common_width dm_MyCollection'>
                <Row className='table_title'>
                    <Typography.Title level={ 4 }>我的收藏</Typography.Title>
                    <div>当前共有 <i>{ dataSource.length }</i> 件藏品</div>
                </Row>
                <Table 
                    rowSelection={ this.rowSelection } 
                    columns={ columns } 
                    dataSource={ dataSource } 
                    rowKey={ (record) => record.id }
                    pagination={ false }
                    scroll={{ x: false, y: false }}
                    footer={ this.footer }
                    bordered
                />
            </div>
        );
    }
}

export default MyCollection;