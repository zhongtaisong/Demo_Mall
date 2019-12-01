import axios from '@axios';

const logUrl = 'users/log';
const cpwdUrl = 'users/vali/cpwd';

class Service {
    logData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(logUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        })
    }
    cpwdData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(cpwdUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                reject(err);
            });
        })
    }
}

export default new Service();