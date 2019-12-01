import { observable, action } from "mobx";
// 接口服务
import service from './service';

class State {

    // 收货人信息
    @observable consignees = {};
    @action setConsignees = (data = {}) => {
        this.consignees = data;
    }

    // 商品列表
    @observable dataSource02 = [];
    @action setDataSource02 = (data = []) => {
        this.dataSource02 = data;
    }

    // 付款信息
    @observable paymentInfo = {};
    @action setPaymentInfo = (data = {}) => {
        this.paymentInfo = data;
    }

    // 查询订单详情 - 发起请求
    selOrderLidData = async (orderNum = '', id = '') => {
        const res = await service.selOrderLidData({
            uname: sessionStorage.getItem('uname'),
            orderNum,
            id
        });
        try{
            if( res.data.code === 200 ){
                const { data } = res.data;
                if( data ){
                    const { addressDetails, consignee, phone, region, payTime, orderNum } = data[0] || {};
                    this.setConsignees({ addressDetails, consignee, phone, region });
                    let totalPrice = data.reduce((total, currentValue, currentIndex, arr) => {
                        return total + parseFloat( currentValue.totalPrice );
                    }, 0);
                    this.setPaymentInfo({ payTime, totalPrice, orderNum });
                    this.setDataSource02( data );
                }
            }
        }catch(err) {
            console.log(err);
        }
    }

}

export default new State();