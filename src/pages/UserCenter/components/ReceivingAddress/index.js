import React from 'react';
import { Table, Button, Row } from 'antd';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
// 添加收货地址
import AddressModal from './components/addressModal';
// 表头
import data from './data';
// 数据
import state from './state';

// 收货地址
@observer
class EditableTable extends React.Component {

    componentDidMount() {
        state.selAddressData();
    }

    // 展示添加收货地址弹出框
    handleAddress = () => {
        state.setVisible( true );
    }

    // 确定
    handleOk = () => {
        state.form.validateFields(async (err, values) => {
            if ( !err ) {
                let code;
                if( !state.id ){
                    code = await state.addAddressData( values );
                }else{
                    code = await state.updateAddressData( values );
                }
                code === 200 && this.handleCancel();
            }
        });
    }

    // 取消
    handleCancel = () => {
        state.setVisible( false );
        state.setAddressModalData01();
    }

    render() {
        const { columns } = data;
        const { dataSource, setForm, addressModalData, setAddressModalData01, visible } = state;
        return (
            <div className='dm_ReceivingAddress'>
                <Row style={{ padding: '10px 0' }}>
                    <Button type="primary"                         
                        onClick={ this.handleAddress }
                    >添加收货地址</Button>
                </Row>
                <Row>
                    <Table
                        bordered
                        dataSource={ toJS( dataSource ) }
                        columns={ columns }
                        scroll={{ x: false, y: false }}
                        rowKey={ (record) => record.id }
                        pagination={ false }
                    />
                </Row>
                <AddressModal 
                    visible={ visible } 
                    handleOk={ this.handleOk }
                    handleCancel={ this.handleCancel } 
                    setForm={ setForm }
                    addressModalData={ toJS( addressModalData ) }
                    setAddressModalData01={ setAddressModalData01 }
                />
            </div>
        );
    }
}

export default EditableTable;