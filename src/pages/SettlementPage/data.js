import React from 'react';
import { PUBLIC_URL } from '@config';
import { observable } from 'mobx';

class Data {

    // 收货地址
    @observable columns01 = [
        {
            title: '收货人',
            dataIndex: 'consignee',
            key: 'consignee'
        },
        {
            title: '所在地区',
            dataIndex: 'region',
            key: 'region'
        },
        {
            title: '详情地址',
            dataIndex: 'addressDetails',
            key: 'addressDetails'
        },
        {
            title: '联系电话',
            dataIndex: 'phone',
            key: 'phone'
        }
    ];

    // 产品
    @observable columns02 = [
        {
            title: '图片',
            dataIndex: 'imgs',
            key: 'imgs',
            align: 'center',
            width: '10%',
            render: (text, record, index) => <img className='imgs-style' src={ `${ PUBLIC_URL }${ text }` } alt={ text } />
        },
        {
            title: '商品',
            dataIndex: 'title',
            key: 'title',
            width: '42%',
            render: (text, record, index) => {
            return (
                <div className='title-style'>
                <p>{ text }</p>
                <span>{ record.spec }</span>
                </div>
            );
            }
        },
        {
            title: '单价',
            dataIndex: 'price',
            key: 'price',
            align: 'center',
            width: '10%',
            render: (text, record, index) => text ? `￥${parseFloat( text ).toFixed(2)}` : 0
        },
        {
            title: '数量',
            dataIndex: 'pNum',
            key: 'pNum',
            align: 'center',
            width: '6%',
            render: (text, record, index) => `x ${text}`
        },
        {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            align: 'center',
            width: '16%',
            render: (text, record, index) => '有货'
        }
    ];

}

export default new Data();