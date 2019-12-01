import React from 'react';
import { PUBLIC_URL } from '@config';
import { Popconfirm, Icon } from 'antd';
import state from './state';

const columns = [
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
      align: 'center',
      // width: '42%',
      render: (text, record, index) => {
        return (
          <div className='title-style'>
            <p>{ text }</p>
            <span>规格：{ record.spec }</span>
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
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      align: 'center',
      width: '16%',
      render: (text, record, index) => {
        return (              
            <div className='operation'>
                <Popconfirm
                    title="你确定要取消收藏这条数据？"
                    icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                    onConfirm={() => {
                        state.delcolsData( [ record.id ] );
                    }}
                    okText="是"
                    cancelText="否"
                >
                    <span>取消收藏</span>
                </Popconfirm>
                <span onClick={() => {
                    state.addcartData( [ record.id ], [ record ] );
                }}>加入购物车</span>
            </div>
        );
      }
    }
];

export { columns };