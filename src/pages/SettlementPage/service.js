import axios from '@axios';
// 查询
const selAddressUrl = 'users/selAddress';
// 提交订单
const addorderUrl = 'cart/addorder';
// 提交订单成功后删除购物车被结算商品
const delcartUrl = 'cart/delcart';

class Service {
    selAddressData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(selAddressUrl, {
                params: req
            }).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        })
    }
    addorderData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(addorderUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        })
    }
    delcartData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(delcartUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        })
    }
}

export default new Service();