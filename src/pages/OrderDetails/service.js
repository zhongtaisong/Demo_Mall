import axios from '@axios';
// 查询订单详情
const selOrderLidUrl = 'cart/selOrderLid';

class Service {
    selOrderLidData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(selOrderLidUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        })
    }
}

export default new Service();