import React from 'react';
import { PUBLIC_URL } from '@config';
import { Popconfirm, Input } from 'antd';
import { observable, action, toJS } from 'mobx';
import state from './state';

class Data {

    // 删除
    handleDelete = key => {
        let dataSource = [...toJS(state.dataSource)];
        state.setDataSource( dataSource.filter(item => item.key !== key) );
    };
    
    // 表头
    @observable columns = [
        {
            title: '收货人',
            dataIndex: 'consignee',
            key: 'consignee',
            align: 'center'
        },
        {
            title: '所在地区',
            dataIndex: 'region',
            key: 'region',
            align: 'center'
        },
        {
            title: '详情地址',
            dataIndex: 'addressDetails',
            key: 'addressDetails',
            align: 'center'
        },
        {
            title: '联系电话',
            dataIndex: 'phone',
            key: 'phone',
            align: 'center'
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            align: 'center',
            render: (text, record, index) => {
                return (
                    toJS( state.dataSource ) && toJS( state.dataSource ).length >= 1 ? (
                        <div className='operation_btn'>
                            <Popconfirm title="你确定要删除？" onConfirm={ () => state.delAddressData(record.id) }>
                                <a>删除</a>
                            </Popconfirm>
                            <a onClick={ () => { 
                                    state.setVisible( true );
                                    state.setAddressModalData01( record );
                                    state.setId( record.id );
                                } 
                            }>编辑</a>
                            <a onClick={ record.isDefault == 0 ? (
                                () => {
                                    state.setDefaultAddressData(record.id, 1);
                                }) : null
                            }>
                                {
                                    record.isDefault == 0 ? '设为默认地址' : record.isDefault == 1 ? '默认地址' : ''
                                }
                            </a>
                        </div>
                    ) : null
                );
            }
        }
    ];

}

export default new Data();