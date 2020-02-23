import { message } from 'antd';
import { observable, action } from 'mobx';
// 接口服务
import service from './service';
// 公共数据
import { store } from '@pages/Admin/components';

class State {

    // 标题
    @observable title = '添加商品图片';
    @action setTitle = (data = '添加商品图片') => {
        this.title = data;
    }

    // 查询所有商品图片 - 发起请求
    selectProductsImgData = async () => {
        const res = await service.selectProductsImgData({
            current: store.current,
            pageSize: store.pageSize
        });
        try{
            if( res.data.code === 200 ){
                let { products, current, pageSize, total } = res.data.data || {};
                products.map((item, index) => {
                    return item['key'] = index + 1;
                });
                store.setDataList( products );
                store.setCurrent( current );
                store.setPageSize( pageSize );
                store.setTotal( total );
                // 清除抽屉内部数据
                store.clearMobxData();
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 添加商品图片 - 发起请求
    addProductsImgData = async (values) => {
        const res = await service.addProductsImgData(values);
        try{
            if( res.data.code === 200 ){
                message.success( res.data.msg );
                this.selectProductsImgData();
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 删除商品图片 - 发起请求
    deleteProductsImgData = async (pid) => {
        const res = await service.deleteProductsImgData({
            pid
        });
        try{
            if( res.data.code === 200 ){
                message.success( res.data.msg );
                this.selectProductsImgData();
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 修改商品图片 - 发起请求
    updateProductsImgData = async (values) => {
        const res = await service.updateProductsImgData(values);
        try{
            if( res.data.code === 200 ){
                message.success( res.data.msg );
                this.selectProductsImgData();
            }
        }catch(err) {
            console.log(err);
        }
    }

}

export default new State();