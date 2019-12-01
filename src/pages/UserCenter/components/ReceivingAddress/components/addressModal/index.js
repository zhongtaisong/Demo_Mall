import React from 'react';
import { Modal, Form, Row, Col, Input } from 'antd';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
// 全局公共方法
import { formUtils } from '@utils';

const onFieldsChange = (props, changedFields) => {
    props.setAddressModalData01({...toJS( props.addressModalData ), ...formUtils.formToMobx(changedFields)});
};
const mapPropsToFields = (props) => {
    if( toJS( props.addressModalData ) ){
        return formUtils.mobxToForm({...toJS( props.addressModalData )});
    }
};

// 添加收货地址
@observer
class AddressModal extends React.Component {

    componentDidMount() {
        this.props.setForm && this.props.setForm( this.props.form );
    }

    render() {
        const { visible, handleOk, handleCancel } = this.props;
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                title="添加收货地址"
                visible={ visible }
                onOk={ handleOk }
                onCancel={ handleCancel }
                destroyOnClose={ true }           
            >                    
                <Form>
                    <Row>
                        <Col span={ 11 }>
                            <Form.Item label="收货人">
                                {
                                    getFieldDecorator('consignee', {
                                        rules: [{ 
                                            required: true, 
                                            whitespace: true,
                                            message: '必填' 
                                        }]
                                    }
                                    )(
                                        <Input placeholder='请输入' />
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col span={ 2 }></Col>
                        <Col span={ 11 }>
                            <Form.Item label="所在地区">
                                {
                                    getFieldDecorator('region', {
                                        rules: [{ 
                                            required: true,
                                            whitespace: true,
                                            message: '必填' 
                                        }]
                                    }
                                    )(
                                        <Input placeholder='请输入' />
                                    )
                                }
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={ 11 }>
                            <Form.Item label="详情地址">
                                {
                                    getFieldDecorator('addressDetails', {
                                        rules: [{ 
                                            required: true,
                                            whitespace: true,
                                            message: '必填' 
                                        }]
                                    }
                                    )(
                                        <Input placeholder='请输入' />
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col span={ 2 }></Col>
                        <Col span={ 11 }>
                            <Form.Item label="联系电话">
                                {
                                    getFieldDecorator('phone', {
                                        rules: [{ 
                                            required: true, 
                                            message: '必填' 
                                        }]
                                    }
                                    )(
                                        <Input placeholder='请输入' />
                                    )
                                }
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        );
    }
}

export default Form.create({ 
    onFieldsChange, 
    mapPropsToFields 
})(AddressModal);