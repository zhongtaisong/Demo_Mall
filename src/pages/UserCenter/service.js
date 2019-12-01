import axios from '@axios';
// 查询个人信息
const pInfoUrl = 'users/vali/uname';

class Service {
    pInfoData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(pInfoUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        })
    }
}

export default new Service();