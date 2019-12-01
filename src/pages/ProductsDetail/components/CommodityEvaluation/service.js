import axios from '@axios';
// 查询当前商品评价
const selcommentsUrl = 'comment/selcomments';

class Service {
    selcommentsData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(selcommentsUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        })
    }
}

export default new Service();