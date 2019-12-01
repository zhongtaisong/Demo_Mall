import axios from '@axios';
// 提交评价
const addcommentsUrl = 'comment/addcomments';

class Service {
    addcommentsData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(addcommentsUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        })
    }
}

export default new Service();