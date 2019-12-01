import axios from '@axios';
// 购物车列表 - 数据
const cartListUrl = 'cart/selcartuname';
// 购物车列表 - 删除
const delcartUrl = 'cart/delcart';
// 购物车列表 - 加入收藏
const addcolsUrl = 'details/addcols';
// 购物车列表 - 更新商品数量
const updatecartUrl = 'cart/updatecart';

class Service {
    cartLisData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(cartListUrl, {
                params: req
            }).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        })
    }

    delcartData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(delcartUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        })
    }
    
    addcolsData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(addcolsUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        })
    }
    
    updatecartData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(updatecartUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        })
    }
}

export default new Service();