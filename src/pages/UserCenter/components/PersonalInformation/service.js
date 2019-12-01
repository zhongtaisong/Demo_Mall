import axios from '@axios';
// 更新用户信息
const updateUserInfoUrl = 'users/updateUserInfo';

class Service {
    updateUserInfoData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(updateUserInfoUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        })
    }
}

export default new Service();