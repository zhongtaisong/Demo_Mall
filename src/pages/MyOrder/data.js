import React from 'react';
import { PUBLIC_URL } from '@config';
import { Link } from 'react-router-dom';

const columns = [
    {
      title: '订单号',
      dataIndex: 'orderNum',
      key: 'orderNum',
      align: 'center',
      width: '10%',
      render: (text, record, index) => {
          let obj = {
            children: text,
            props: {}
          };
          obj.props.rowSpan = record.tableLen;
          return obj;
      }
    },
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
      width: '6%'
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
        return (<div className='operation'>
            {
              record.orderStatus && record.orderStatus == 100 ? (
                <Link to={{ pathname: '/views/products/cart/evaluate', state: {
                    lid: record.lid,
                    id: record.id,
                    title: record.title,
                    pNum: record.pNum,
                    price: record.price,
                    totalPrice: record.totalPrice,
                    spec: record.spec
                } }}>评价</Link>
              ) : ''
            }
            <Link to={{ pathname: '/views/products/cart/orderDetails', state: {
                orderNum: record.orderNum,
                id: record.id
            } }}>订单详情</Link>
        </div>);
      }
    }
];

export { columns };