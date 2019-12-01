import { observable, action, toJS } from "mobx";
import { message } from 'antd';
// 接口服务
import service from './service';

class State {

    // 我的收藏数据
    @observable dataSource = [];
    @action setDataSource = (data = []) => {
        this.dataSource = data;
    }

    // 选中数据key
    @observable selectedRowKeys = [];
    @action setSelectedRowKeys = (data = []) => {
        this.selectedRowKeys = data;
    }

    // 获取我的收藏列表数据 - 发起请求
    selcolsListData = async () => {
        const res = await service.selcolsListData({
            uname: sessionStorage.getItem('uname')
        });
        try{
            if( res.data.code === 200 ){
                if( res.data.data ){
                    this.setDataSource( res.data.data );
                }

            }
        }catch(err) {
            console.log(err);
        }
    }

    // 取消收藏指定id数据
    delcolsData = async (ids = [], that) => {
        const res = await service.delcolsData({
            uname: sessionStorage.getItem('uname'),
            ids
        });
        try{
            if( res.data.code === 200 ){
                if( that != 'cart' ){
                    message.success('取消收藏成功！')
                }
                this.selcolsListData();
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 加入购物车
    addcartData = async (ids = [], selectedRows = []) => {
        const res = await service.addcartData({ 
            uname: sessionStorage.getItem('uname'), 
            cartList: selectedRows
        });
        try{
            if( res.data.code === 200 ){
                this.delcolsData( ids, 'cart' );
            }
        }catch(err) {
            console.log(err);
        }
    }
}

export default new State();