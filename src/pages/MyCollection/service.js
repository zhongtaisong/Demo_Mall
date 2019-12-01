import axios from '@axios';
// 我的收藏列表 - 数据
const selcolsListUrl = 'details/selcols';
// 我的收藏列表 - 删除
const delcolsUrl = 'details/delcols';
// 我的收藏列表 - 加入购物车
const addcartUrl = 'cart/addcart';

class Service {
    selcolsListData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(selcolsListUrl, {
                params: req
            }).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        })
    }

    delcolsData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(delcolsUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        })
    }
    
    addcartData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(addcartUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        })
    }
}

export default new Service();