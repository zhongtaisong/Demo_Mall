import axios from '@axios';
// 查询头像
const selHeadPicUrl = 'upload/selHeadPic';

class Service {
    selHeadPicData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(selHeadPicUrl, {
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