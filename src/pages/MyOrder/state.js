import { observable, action } from "mobx";
// 接口服务
import service from './service';

class State {

    // 路由对象
    @observable history = {};
    @action setHistory = (data = {}) => {
        this.history = data;
    }

    // 订单列表
    @observable dataSource = [];
    @action setDataSource = (data = []) => {
        this.dataSource = data;
    }

    // 查询订单列表 - 发起请求
    selOrdersData = async () => {
        const res = await service.selOrdersData({
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
}

export default new State();