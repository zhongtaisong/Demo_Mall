import { observable, action, toJS } from "mobx";
import { message } from 'antd';
// 接口服务
import service from './service';
// 全局设置
import { searchAreaState } from '@config';

class State {

    // 购物车数据
    @observable dataSource = [];
    @action setDataSource = (data = []) => {
        this.dataSource = data;
    }

    // 选中数据key
    @observable selectedRowKeys = [];
    @action setSelectedRowKeys = (data = []) => {
        this.selectedRowKeys = data;
    }

    // 价格列表
    @observable priceList = [];
    @action setPriceList01 = (data = []) => {
        this.priceList = data;
    }
    @action setPriceList02 = (index, key, value) => {
        if( toJS( this.priceList ).length ){
            this.priceList[index][key] = value;
        }
    }

    // 数据总数
    @observable allProductsSize = 0;
    @action setAllProductsSize = (data = 0) => {
        this.allProductsSize = data;
    }

    // 获取购物车列表数据 - 发起请求
    cartLisData = async () => {
        const res = await service.cartLisData({
            uname: sessionStorage.getItem('uname')
        });
        try{
            if( res.data.code === 200 ){
                if( res.data.data ){
                    this.setDataSource( res.data.data );
                    let sum = 0;
                    res.data.data.forEach(item => {
                        sum += item.pNum;
                    })
                    this.setAllProductsSize( sum );
                }
                searchAreaState.productNumData();
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 删除购物车指定id数据
    delcartData = async (ids = [], that) => {
        const res = await service.delcartData({
            uname: sessionStorage.getItem('uname'),
            ids
        });
        try{
            if( res.data.code === 200 ){
                if( that != 'collection' ){
                    message.success('删除成功！')
                }
                this.cartLisData();
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 加入收藏
    addcolsData = async (ids = [], selectedRows = []) => {
        const res = await service.addcolsData({ 
            uname: sessionStorage.getItem('uname'), 
            collectionList: selectedRows
        });
        try{
            if( res.data.code === 200 ){
                this.delcartData( ids, 'collection' );
            }
        }catch(err) {
            console.log(err);
        }
    }

    // 更新购物车数据
    updatecartData = async (id, pNum, totalPrice) => {
        const res = await service.updatecartData({ 
            uname: sessionStorage.getItem('uname'), 
            id,
            pNum,
            totalPrice
        });
        try{
            if( res.data.code === 200 ){
                this.cartLisData();
            }
        }catch(err) {
            console.log(err);
        }
    }
}

export default new State();