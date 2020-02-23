import axios from '@axios';
// 查询所有商品编号
const selectLidUrl = 'products/lid';

class Service {
    selectLidData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(selectLidUrl, {
                params: req
            }).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        });
    }
}

export default new Service();