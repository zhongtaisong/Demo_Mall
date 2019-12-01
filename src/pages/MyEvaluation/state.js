import { observable, action, toJS } from "mobx";
import { message } from "antd";
// 接口服务
import service from './service';

class State {

    // 路由
    @observable history = {};
    @action setHistory = (data = {}) => {
        this.history = data;
    }

    // 提交评价 - 发起请求
    addcommentsData = async (values = {}) => {
        const res = await service.addcommentsData({
            uname: sessionStorage.getItem('uname'),
            ...values
        });
        try{
            if( res.data.code === 200 ){
                message.success('评价成功！')
                this.history.replace('/views/products/order');
            }
        }catch(err) {
            console.log(err);
        }
    }
}

export default new State();