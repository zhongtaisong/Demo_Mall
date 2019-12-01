import React, { Fragment } from 'react';
import { observer } from 'mobx-react';
import { Row, Col, Typography, InputNumber, Button } from 'antd';
import { toJS } from 'mobx';
// 设置
import { PUBLIC_URL } from '@config';
// 最外层数据
import indexState from './../../state';
// 数据
import state from './state';
const { Title, Paragraph } = Typography;

// 商品规格
@observer
class CommoditySpecification extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            actionIndex: 0,
            num: 1
        }
    }

    componentDidMount() {
        this.props.history && state.setHistory( this.props.history );
    }

    // 选择预览图片
    handleTogglePic = (index) => {
        this.setState(() => ({
            actionIndex: index
        }))
    }

    // 选择规格
    handleToggleSpecs = async (lid) => {
        if( lid ){
            await indexState.setLid( lid );
            await indexState.specificationData();
            this.setState(() => ({
                num: 1
            }))
        }
    }

    // 数量
    watchNumber = (value) => {
        this.setState(() => ({
            num: value
        }))
    }

    // 加入购物车
    handleAddCart = () => {
        const { pics, product } = this.props;
        if( product && pics ){
            let totalPrice = parseFloat( product.price ) * this.state.num;
            let cartList = [{
                ...product,
                imgs: pics[0].sm,
                pNum: this.state.num,
                totalPrice
            }];
            state.addcartData( toJS(indexState.lid), cartList );
        }
    }

    // 立即购买
    immediatePurchase = () => {
        let { pics, product } = this.props;
        let totalPrice = parseFloat(product.price) * this.state.num;
        product = {...product, imgs: pics[0].sm, pNum: this.state.num, totalPrice };
        if( product ){
            this.props.history.push({
                pathname: '/views/products/cart/settlement'
            })
            sessionStorage.setItem('productsInfo', JSON.stringify( [product] ));
            sessionStorage.setItem('productsParams', JSON.stringify({
                size: this.state.num, 
                total: totalPrice
            }));
        }
    }

    render() {
        const { pics, product, specs } = this.props;
        const { num } = this.state;
        return (
            <div className='CommoditySpecification'>
                <Row>
                    <Col span={ 8 }>
                        <dl>
                            <dt>
                                {
                                    pics && pics[this.state.actionIndex] && pics[this.state.actionIndex].lg ? (
                                        <img src={ PUBLIC_URL + pics[this.state.actionIndex].lg } alt={ pics[this.state.actionIndex].lg } />
                                    ) : ''
                                }                                
                            </dt>
                            <dd>
                                {
                                    pics.slice(0, 5).map((item, index) => {
                                        return (
                                            <div key={ item.pid } onMouseOver={ this.handleTogglePic.bind(this, index) } className={ this.state.actionIndex === index ? 'active' : '' }>
                                                <img src={ PUBLIC_URL + item.lg } alt={ item.lg } />
                                            </div>
                                        );
                                    })
                                }
                            </dd>
                        </dl>
                    </Col>
                    <Col span={ 16 }>
                        <Title level={ 4 }>{ product.title }</Title>
                        <h3>{ product.subtitle }</h3>
                        <div className='price'>售价：
                            <Title level={ 3 }>￥{ product.price }</Title>
                        </div>
                        <Row className='Specifications'>
                            <Col span={ 2 }>规格：</Col>
                            <Col span={ 22 }>
                                <Row>
                                    {
                                        specs.map(item => {
                                            return (
                                                <Fragment key={ item.lid }>
                                                    <Col span={ 11 } className={ product.lid === item.lid ? 'active' : '' }
                                                        onClick={ this.handleToggleSpecs.bind(this, item.lid) }
                                                    >
                                                        <Paragraph>{ item.spec }</Paragraph>
                                                    </Col>
                                                    <Col span={ 1 }></Col>
                                                </Fragment>
                                            );
                                        })
                                    }
                                </Row>
                            </Col>
                        </Row>
                        <Row className='Number'>
                            <Col span={ 2 }>数量：</Col>
                            <Col span={ 22 }>
                                <InputNumber min={ 1 } max={ 99 } value={ num } precision={ 0 } onChange={ this.watchNumber } />
                            </Col>
                        </Row>
                        <Row className='handleButton'>
                            <Col span={ 2 }></Col>
                            <Col span={ 22 }>
                                <Button type="primary" size='large' ghost onClick={ this.immediatePurchase }>立即购买</Button>
                                <Button type="primary" size='large' onClick={ this.handleAddCart }>加入购物车</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default CommoditySpecification;