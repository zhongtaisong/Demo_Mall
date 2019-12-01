import React from 'react';
import { PUBLIC_URL } from '@config';
import { InputNumber, Popconfirm, Icon } from 'antd';
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
      width: '42%',
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
      title: '数量',
      dataIndex: 'pNum',
      key: 'pNum',
      align: 'center',
      width: '6%',
      render: (text, record, index) => {
        return (
          <InputNumber min={ 1 } max={ 99 } defaultValue={ text } precision={ 0 } onChange={ (value) => {
            let totalPrice = parseFloat( record.price ) * value;
            state.updatecartData(record.id, value, totalPrice);
            state.setPriceList02(index, 'totalP', [value, totalPrice]);
          } } />
        );
      }
    },
    {
      title: '小计',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      align: 'center',
      // width: '10%',
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
                    title="你确定要删除这条数据？"
                    icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
                    onConfirm={() => {
                        state.delcartData( [ record.id ] );
                    }}
                    okText="是"
                    cancelText="否"
                >
                    <span>删除</span>
                </Popconfirm>
                <span onClick={() => {
                    state.addcolsData( [ record.id ], [ record ] );
                }}>移到我的收藏</span>
            </div>
        );
      }
    }
];

export { columns };