import { observable, action } from 'mobx';
// 接口服务
import service from './service';

class State {

    // 关键字
    @observable kw = '';
    @action setKw = (data = '') => {
        this.kw = data;
    }

    // 当前页
    @observable current = 1;
    @action setCurrent = (data = 1) => {
        this.current = data;
    }

    // 一页多少条数据
    @observable pageSize = 8;
    @action setPageSize = (data = 8) => {
        this.pageSize = data;
    }

    // 数据总数
    @observable total = 8;
    @action setTotal = (data = 8) => {
        this.total = data;
    }

    // 产品列表
    @observable productList = [];
    @action setProductList = (data = []) => {
        this.productList = data;
    }

    // 查询全部商品 - 发起请求
    productsData = async () => {
        const res = await service.productsData({
            kw: this.kw,
            current: this.current,
            pageSize: this.pageSize
        });
        try{
            if( res.data.code === 200 ){
                let { products, current, pageSize, total } = res.data.data;
                products.map((item, index) => {
                    return item['key'] = index + 1;
                })
                this.setProductList( products );
                this.setCurrent( current );
                this.setPageSize( pageSize );
                this.setTotal( total );
            }
        }catch(err) {
            console.log(err);
        }
    }
}

export default new State();