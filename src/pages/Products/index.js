import React from 'react';
import { Row, Col, Card, Button, InputNumber, Typography, Pagination } from 'antd';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
// 全局设置
import { PUBLIC_URL, commoditySpecificationState } from '@config';
// 数据
import state from './state';
// 样式
import './index.less'
const { Meta } = Card;
const { Title } = Typography;

// 杂货铺
@observer
class Products extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            actionIndex: 0,
            numObj: {}
        }
    }

    componentDidMount() {
        state.productsData();
    }

    // 分页变化
    pageChange = async (page) => {
        await state.setCurrent( page );
        await state.productsData();
        this.setState({
            numObj: {}
        })
    }

    // 加入购物车
    handleAddCart = (item, key) => {
        if( Object.keys(item).length ){
            let pNum = !this.state.numObj[key] ? 1 : this.state.numObj[key];
            let totalPrice = parseFloat( item.price ) * pNum;
            let imgs = item.md.replace(/md/, 'sm');
            let cartList = [{
                ...toJS( item ),
                imgs: imgs,
                pNum: pNum,
                totalPrice
            }];
            commoditySpecificationState.addcartData( item.lid, cartList );
        }
    }

    // 数量
    watchNumber = (key, value) => {
        let { numObj } = this.state;
        numObj[key] = value;
        this.setState({
            numObj
        })
    }

    render() {
        const { productList, current, total, pageSize } = state;
        const { numObj } = this.state;
        return (
            <div className='dm_Products'>
                <div className='common_width'>
                    <Row>
                        {
                            productList.map(item => {
                                return (
                                    <Col span={ 6 } key={ item.key }>
                                        <Card
                                            key={ item.key }
                                            cover={
                                                <img
                                                    alt={ item.title }
                                                    src={ `${ PUBLIC_URL }${ item.md }` }
                                                />
                                            }
                                            actions={[
                                                <InputNumber min={ 1 } max={ 99 } value={ numObj[`num${item.key}`] || 1 } onChange={ this.watchNumber.bind(this, `num${item.key}`) } />,
                                                <Button type="primary" onClick={ this.handleAddCart.bind(this, item, `num${item.key}`) }>加入购物车</Button>
                                            ]}
                                        >
                                            <Meta
                                                title={ <Title level={ 4 }>￥{ item.price }</Title> }
                                                description={ 
                                                    <Link 
                                                        to={{ 
                                                            pathname: '/views/products/detail', 
                                                            state: {
                                                                lid: item.lid
                                                            } 
                                                        }}
                                                    >{ item.title }</Link> 
                                                }
                                            />
                                        </Card>
                                    </Col>
                                );
                            })
                        }
                    </Row>
                    <Pagination 
                        showQuickJumper
                        defaultCurrent={ current } 
                        pageSize={ pageSize }
                        total={ total } 
                        onChange={ this.pageChange } 
                        showTotal={ total => `共 ${total} 条` }
                    />
                </div>
            </div>
        );
    }
}

export default Products;