import axios from '@axios';
// 订单查询
const cselOrdersUrl = 'cart/selOrders';

class Service {
    selOrdersData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(cselOrdersUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        })
    }
}

export default new Service();