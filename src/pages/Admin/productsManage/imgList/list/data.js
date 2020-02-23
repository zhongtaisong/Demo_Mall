import React from 'react';
import { Popconfirm } from 'antd';
// 公共数据
import { store } from '@pages/Admin/components';
// 数据
import state from './state';
// url前缀
import { PUBLIC_URL } from '@config';
    
// 表头
export const columns = [
    {
        title: '编号',
        dataIndex: 'pid',
        key: 'pid',
        align: 'center',
        width: '6%'
    },
    {
        title: '商品编号',
        dataIndex: 'laptop_id',
        key: 'laptop_id',
        align: 'center',
        width: '10%'
    },
    {
        title: '商品小图',
        dataIndex: 'sm',
        key: 'sm',
        align: 'center',
        width: '28%',
        ellipsis: true
    },
    {
        title: '商品中图',
        dataIndex: 'md',
        key: 'md',
        align: 'center',
        width: '28%',
        ellipsis: true
    },
    {
        title: '商品大图',
        dataIndex: 'lg',
        key: 'lg',
        width: '28%',
        align: 'center',
        ellipsis: true
    },
    {
        title: '操作',
        dataIndex: 'operation',
        key: 'operation',
        align: 'center',
        fixed: 'right',
        width: '148px',
        render: (text, record, index) => {
            let handleUploadImgData = (rec) => {
                store.setFileListObj02('lg', [{
                    uid: '-1',
                    name: 'img.png',
                    status: 'done',
                    url: PUBLIC_URL + rec.lg
                }] );
                store.setFileListObj02('md', [{
                    uid: '-2',
                    name: 'img.png',
                    status: 'done',
                    url: PUBLIC_URL + rec.md
                }] );
                store.setFileListObj02('sm', [{
                    uid: '-3',
                    name: 'img.png',
                    status: 'done',
                    url: PUBLIC_URL + rec.sm
                }] );
                store.setDrawerVisible( true );
                store.setId( rec.pid );
                store.setLaptopId( rec['laptop_id'] );
            };
            return (
                <div className='operation_btn'>
                    <a onClick={ () => {
                        handleUploadImgData( record );
                        store.setIsDisabled( true );
                        state.setTitle('查看商品图片');
                    } }>查看</a>
                    <a onClick={ () => {
                        handleUploadImgData( record );
                        state.setTitle('修改商品图片');
                    } }>修改</a>
                    <Popconfirm title="你确定要删除？" 
                        onConfirm={ () => state.deleteProductsImgData( record.pid ) }
                    >
                        <a>删除</a>
                    </Popconfirm>
                </div>
            );
        }
    }
];