import React from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { Table, Typography, Row } from 'antd';

// 各种表头
import { columns } from './data';
// 数据
import state from './state';
// less样式
import './index.less';

// 我的订单
@observer
class MyOrder extends React.Component {

    componentWillMount() {
        state.setHistory(this.props.history);
    }

    componentDidMount() {
        state.selOrdersData();
    }

    render() {
        const { dataSource } = state;
        return (
            <div className='common_width dm_MyOrder'>
                <Row className='table_title'>
                    <Typography.Title level={ 4 }>我的订单</Typography.Title>
                    <div>当前共有 <i>{ dataSource.length }</i> 笔订单</div>
                </Row>
                <Table 
                    columns={ columns } 
                    dataSource={ toJS( dataSource ) } 
                    rowKey={ (record) => record.id }
                    pagination={ false }
                    scroll={{ x: false, y: false }}
                    bordered
                />
            </div>
        );
    }
}

export default MyOrder;