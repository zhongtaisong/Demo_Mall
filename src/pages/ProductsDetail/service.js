import axios from '@axios';
// 商品规格 - 查询
const specificationUrl = 'details/productdetails';

class Service {
    specificationData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(specificationUrl, {
                params: req
            }).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        })
    }
}

export default new Service();