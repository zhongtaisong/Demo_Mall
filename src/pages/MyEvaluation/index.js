import React from 'react';
import { observer } from 'mobx-react';
import { Button, Row, Col, Input, Form, Typography } from 'antd';
import moment from 'moment';
// 数据
import state from './state';
// less样式
import './index.less';
const { TextArea } = Input;

// 我的评价
@observer
class MyEvaluation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lid: null,
            id: null,
            title: null, 
            pNum: 0, 
            price: 0, 
            totalPrice: 0, 
            spec: null
        }
    }

    componentWillMount() {
        this.props.history && state.setHistory( this.props.history );
    }

    componentDidMount() {
        const { lid, id, title, pNum, price, totalPrice, spec } = this.props.location.state || {};
        if( !this.props.location.state ){
            this.props.history.goBack();
            return;
        }
        this.setState({
            lid, id, title, pNum, price, totalPrice, spec
        })
    }

    // 提交评价
    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.state.lid && state.addcommentsData({
                    ...values, 
                    lid: this.state.lid,
                    id: this.state.id,
                    comTime: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
                    orderStatus: 10
                });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { title, pNum, price, totalPrice, spec } = this.state;
        return (
            <div className='common_width dm_MyEvaluation'>
                <Row className='table_title'>
                    <Typography.Title level={ 4 }>我的评价</Typography.Title>
                    <div></div>
                </Row>
                <Row className='product_params'>
                    <Col span={ 24 }>
                        <div>商品：</div>
                        <span>{ title }</span>
                    </Col>
                    <Col span={ 24 }>
                        <div>价格：</div>
                        <span>{ price ? price.toFixed(2) : 0.00 } x { pNum } = { totalPrice ? totalPrice.toFixed(2) : 0.00 }</span>
                    </Col>
                    <Col span={ 24 }>
                        <div>规格：</div>
                        <span>{ spec }</span>
                    </Col>
                </Row>
                <Row className='evaluation_textArea'>
                    <Col span={ 24 }>                        
                        <Form>
                            <Form.Item label='评价晒单'>
                                {
                                    getFieldDecorator('commentContents', {
                                        rules: [{ 
                                            required: true,
                                            whitespace: true,
                                            message: '必填' 
                                        }]
                                    })(
                                        <TextArea maxLength={ 300 } autosize={{ minRows: 4, maxRows: 6 }} placeholder='300个字以内' />
                                    )
                                }
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
                <Row className='evaluation_submit'>
                    <Button type="primary" onClick={ this.handleSubmit }>提交评价</Button>
                </Row>
            </div>
        );
    }
}

export default Form.create()(MyEvaluation);