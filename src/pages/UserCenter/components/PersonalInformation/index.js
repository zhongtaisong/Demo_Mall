import React from 'react';
import { Form, Row, Col, Input, Radio, DatePicker, Button } from 'antd';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
// 全局公共方法
import { formUtils } from '@utils';
// 数据
import state from './state';

const onFieldsChange = (props, changedFields) => {
    props.setPersonalInformation01({...toJS( props.personalInformation ), ...formUtils.formToMobx(changedFields)});
};
const mapPropsToFields = (props) => {
    if( toJS( props.personalInformation ) ){
        return formUtils.mobxToForm({...toJS( props.personalInformation )});
    }
};

// 个人信息
@observer
class PersonalInformation extends React.Component {

    // 提交
    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if ( !err ) {
                state.updateUserInfoData( values );
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='dm_PersonalInformation'>
                <Form layout="inline">
                    <Row>
                        <Col span={ 12 }>
                            <Form.Item label="用户名">
                                {
                                    getFieldDecorator('uname', {
                                        rules: [{ 
                                            required: true, 
                                            message: '必填' 
                                        }]
                                    }
                                    )(
                                        <Input disabled placeholder='请输入' />
                                    )
                                }
                            </Form.Item>
                        </Col>
                        <Col span={ 12 }>
                            <Form.Item label="昵称">
                                {
                                    getFieldDecorator('nickName', {
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
                        <Col span={ 12 }>
                            <Form.Item label="手机号码">
                                {
                                    getFieldDecorator('phone', {
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
                        <Col span={ 12 }>
                            <Form.Item label="性别">
                                {
                                    getFieldDecorator('gender', {
                                        rules: [{ 
                                            required: true, 
                                            message: '必填' 
                                        }]
                                    }
                                    )(
                                        <Radio.Group>
                                            <Radio value='0'>男</Radio>
                                            <Radio value='1'>女</Radio>
                                            <Radio value='2'>保密</Radio>
                                        </Radio.Group>
                                    )
                                }
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={ 12 }>
                            <Form.Item label="生日">
                                {
                                    getFieldDecorator('birthday', {
                                        rules: [{ 
                                            required: true, 
                                            message: '必填' 
                                        }]
                                    }
                                    )(
                                        <DatePicker />
                                    )
                                }
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row className='submit'>
                        <Col span={ 24 }>
                            <Form.Item>
                                <Button type="primary" onClick={ this.handleSubmit }>提交</Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default Form.create({ 
    onFieldsChange, 
    mapPropsToFields 
})(PersonalInformation);