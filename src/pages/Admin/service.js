import axios from '@axios';
// 查字典表
const selectDicUrl = 'dic/selectDic';

class Service {
    selectDicData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(selectDicUrl, {
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