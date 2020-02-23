import React, { Fragment } from 'react';
import { Button, message } from 'antd';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
// 全局公共方法
import { base64ToFile } from '@utils';
// 公共组件
import { Table, Drawer } from '@pages/Admin/components';
// 添加商品图片 - 上传
import DrawerUpload from './components/drawerUpload';
// 公共数据
import { store } from '@pages/Admin/components';
// 表头
import { columns } from './data';
// 数据
import state from './state';

// 图片列表
@observer
class List extends React.Component {

    componentDidMount() {
        state.selectProductsImgData();
        this.props.setTitle && this.props.setTitle('添加商品图片');
        this.props.setButtonClick && this.props.setButtonClick( this.buttonClick );
    }

    // 分页变化
    pageChange = async (page) => {
        await store.setCurrent( page );
        await state.selectProductsImgData();
    }

    // 添加商品图片
    buttonClick = () => {
        store.setDrawerVisible( true );
        state.setTitle('添加商品图片');
    };

    // 关闭抽屉
    closeDrawer = () => {
        store.setDrawerVisible( false );
        store.clearMobxData();
    };

    // 重置
    resetData = () => {
        store.form.resetFields();
        store.setFileListObj();
        store.setBrand();
    }

    // 提交
    submitData = () => {
        let { fileListObj, id, delList, form } = store;
        fileListObj = toJS( fileListObj );
        form.validateFields((err, values) => {
            if ( !err ) {
                if( fileListObj && Object.keys( fileListObj ).length === 3 ){
                    for(let f in fileListObj){
                        if( !fileListObj[f].length ){
                            message.error('大图、中图、小图都为必传项，缺一不可！！！');
                            return;
                        }
                    }
                }else{            
                    message.error('大图、中图、小图都为必传项！！！');
                    return;
                }

                let formData = new FormData();
                for(let f in fileListObj){
                    if( /base64/.test(fileListObj[f][0].pImgUrl || fileListObj[f][0].url) ){
                        formData.append(f, base64ToFile(fileListObj[f][0].pImgUrl || fileListObj[f][0].url, 'upload'));
                    }else{
                        formData.append(f, fileListObj[f][0].pImgUrl || fileListObj[f][0].url);
                    }
                }
                formData.append('laptop_id', values.laptop_id);
                if( !id ){
                    state.addProductsImgData(formData);
                }else{
                    formData.append('pid', id);
                    formData.append('delList', JSON.stringify(delList));
                    state.updateProductsImgData(formData);
                }
            }
        });
    }

    componentWillUnmount() {
        store.clearMobxTableData();
    }

    render() {
        const { 
            dataList, current, total, pageSize, drawerVisible, setForm, isDisabled, laptopId, 
            setFileListObj02, fileListObj, id, delList, setDelList
        } = store;
        const { title } = state;
        return (
            <div className='dm_imgList_List'>
                <Table 
                    columns={ toJS(columns) }
                    dataSource={ toJS(dataList) }
                    current={ current }
                    total={ total }
                    pageSize={ pageSize }
                    rowKey='key'
                    scroll={{ x: '120%', y: false }}
                    paginationChange={ this.pageChange }             
                />
                <Drawer 
                    title={ title }
                    drawerVisible={ drawerVisible }
                    closeDrawer={ this.closeDrawer }
                    children={ 
                        <DrawerUpload 
                            setForm={ setForm }
                            isDisabled={ isDisabled }
                            laptopId={ toJS( laptopId ) }
                            setFileListObj02={ setFileListObj02 }
                            fileListObj={ toJS( fileListObj ) }
                            pid={ toJS(id) }
                            delList={ delList }
                            setDelList={ setDelList }
                        /> 
                    }
                    btnChildren={
                        !isDisabled ? (
                            <Fragment>                            
                                <Button onClick={ this.resetData } style={{ marginRight: 8 }}>重置</Button>
                                <Button onClick={ this.submitData } type="primary">提交</Button>
                            </Fragment>
                        ) : ''
                    }
                />
            </div>
        );
    }
}

export default List;