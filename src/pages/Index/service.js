import axios from '@axios';
// 账号认证
const oauthUrl = `users/oauth`;

class Service {
    oauthData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(oauthUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        })
    }
}

export default new Service();