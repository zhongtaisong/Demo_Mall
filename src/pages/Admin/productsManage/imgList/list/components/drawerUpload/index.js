import React, { Fragment } from 'react';
import { Row, Col, Form, Select } from 'antd';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
// 全局公共组件
import { UploadImg } from '@com';
// 数据
import state from './state';
const { Option } = Select;

// 抽屉内容
@observer
class DrawerUpload extends React.Component {

    componentDidMount() {
        this.props.setForm && this.props.setForm( this.props.form );
        state.selectLidData();
    }

    render() {
        let { form: { getFieldDecorator }, isDisabled, laptopId, setFileListObj02, fileListObj, pid, delList, setDelList } = this.props;
        const { lidList } = state;
        return (
            <Fragment>
                <Row>
                    <Form>
                        <Form.Item label="商品编号">
                            {
                                getFieldDecorator('laptop_id', {
                                    rules: [{
                                        required: true,
                                        message: '必填'
                                    }],
                                    initialValue: laptopId || undefined
                                })(
                                    <Select
                                        placeholder="请选择"
                                        disabled={ isDisabled }
                                    >
                                        {
                                            toJS(lidList).map(item => (
                                                <Option key={ item.value }>{ item.text }</Option>
                                            ))
                                        }
                                    </Select>
                                )
                            }
                        </Form.Item>
                    </Form>
                </Row>
                <Row>
                    <Col span={ 8 }>
                        {/* 上传商品大图 */}
                        <UploadImg 
                            downloadUrl='pImg/download'
                            title='上传商品大图'
                            sz='lg'
                            params={{
                                pid,
                                sz: 'lg'
                            }}
                            fileNum={ 1 }
                            setFileListObj02={ setFileListObj02 }
                            fileList={ toJS( fileListObj )['lg'] }
                            disabled={ isDisabled }
                            width={ [ 350, 450 ] }
                            height={ [ 350, 450 ] }
                            delList={ toJS( delList ) }
                            setDelList={ setDelList }
                        />
                    </Col>
                    <Col span={ 8 }>
                        {/* 上传商品中图 */}
                        <UploadImg 
                            downloadUrl='pImg/download'
                            title='上传商品中图'
                            sz='md'
                            params={{
                                pid,
                                sz: 'md'
                            }}
                            fileNum={ 1 }
                            setFileListObj02={ setFileListObj02 }
                            fileList={ toJS( fileListObj )['md'] }
                            disabled={ isDisabled }
                            width={ [ 220 ] }
                            height={ [ 220 ] }
                            delList={ toJS( delList ) }
                            setDelList={ setDelList }
                        />
                    </Col>
                    <Col span={ 8 }>
                        {/* 上传商品小图 */}
                        <UploadImg 
                            downloadUrl='pImg/download'
                            title='上传商品小图'
                            sz='sm'
                            params={{
                                pid,
                                sz: 'sm'
                            }}
                            fileNum={ 1 }
                            setFileListObj02={ setFileListObj02 }
                            fileList={ toJS( fileListObj )['sm'] }
                            disabled={ isDisabled }
                            width={ [ 50, 54 ] }
                            height={ [ 50, 54 ] }
                            delList={ toJS( delList ) }
                            setDelList={ setDelList }
                        />
                    </Col>
                </Row>
            </Fragment> 
        );
    }
}

export default Form.create()(DrawerUpload);