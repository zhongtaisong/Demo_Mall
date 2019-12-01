import axios from '@axios';
// 收货地址 - 添加
const addAddressUrl = 'users/addAddress';
// 收货地址 - 查询
const selAddressUrl = 'users/selAddress';
// 收货地址 - 删除
const delAddressUrl = 'users/delAddress';
// 收货地址 - 设为默认
const setDefaultAddressUrl = 'users/setDefaultAddress';
// 收货地址 - 编辑
const updateAddressUrl = 'users/updateAddress';

class Service {
    addAddressData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(addAddressUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        })
    }
    selAddressData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(selAddressUrl, {
                params: req
            }).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        })
    }
    delAddressData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.get(delAddressUrl, {
                params: req
            }).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        })
    }
    setDefaultAddressData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(setDefaultAddressUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        })
    }
    updateAddressData = (req = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(updateAddressUrl, req).then(res => {
                resolve(res);
            }).catch(err => {
                console.log(err);
            });
        })
    }
}

export default new Service();