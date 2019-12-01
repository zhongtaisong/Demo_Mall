import React from 'react';
import { Link } from 'react-router-dom';
// 全局设置
import { PUBLIC_URL } from '@config';

const columns = [
    {
      title: '图片',
      dataIndex: 'sm',
      key: 'sm',
      width: '10%',
      render: (text, record, index) => <img className='imgs-style' src={ `${ PUBLIC_URL }${ text }` } alt={ text } />
    },
    {
      title: '商品',
      dataIndex: 'title',
      key: 'title',
      width: '70%',
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
      width: '10%',
      render: (text, record, index) => text ? `￥${parseFloat( text ).toFixed(2)}` : 0
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width: '10%',
      render: (text, record, index) => {
        return (              
            <div className='operation'>
                <Link to={{
                    pathname: '/views/products/detail',
                    state: {
                        lid: record.lid
                    }
                }}>查看</Link>
            </div>
        );
      }
    }
];

export { columns };